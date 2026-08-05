// src/app/controllers/inscripciones.js
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import {
  createInscripcion,
  getInscripcionByEmail,
  getUsername,
} from "@/services/inscripciones/inscripciones_queries";
import { sendEmail } from "@/utils/email";
import { inscripcionTemplate } from "@/templates/inscripcionEmail";
import path from "path";
import { generarToken } from "@/utils/jwt";

function generarUsername(nombres, apellidos) {
  const limpiar = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .toLowerCase();

  const primerNombre = limpiar(nombres).split(" ")[0];
  const primerApellido = limpiar(apellidos).split(" ")[0];

  return `${primerNombre}.${primerApellido}`;
}

async function obtenerUsernameDisponible(usernameBase) {
  let username = usernameBase;
  let contador = 1;

  while (await getUsername(username)) {
    username = `${usernameBase}${contador}`;
    contador++;
  }

  return username;
}

// Mapeo de nivel de experiencia a texto
function getNivelTexto(nivel) {
  const niveles = {
    basico: 'Básico',
    medio: 'Medio',
    avanzado: 'Avanzado'
  };
  return niveles[nivel] || nivel;
}

// Mapeo de rol a texto
function getRolTexto(rol) {
  const roles = {
    participante: 'Participante',
    formador: 'Formador / Calificador'
  };
  return roles[rol] || rol;
}

export async function registrarInscripcion(body) {
  const existe = await getInscripcionByEmail(
    body.correo_electronico
  );

  if (existe) {
    throw new Error(
      "Ya existe una inscripción con este correo"
    );
  }

  const sessionId = randomUUID();
  const usernameBase = generarUsername(
      body.nombres,
      body.apellidos
  );

  const username = await obtenerUsernameDisponible(usernameBase);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(body.password)) {
    throw new Error(
      "La contraseña debe tener mínimo 8 caracteres, una letra y un número."
    );
  }

  const passwordHash = await bcrypt.hash(
    body.password,
    10
  );

  // Obtener el rol (si viene del formulario, usar ese, sino 'participante' por defecto)
  const rol = body.rol || 'participante';

  const inscripcion = await createInscripcion({
    ...body,
    username,
    password_hash: passwordHash,
    session_id: sessionId,
    rol: rol,
    experiencia_bi: body.experiencia_bi === true,
    nivel_geografico: body.nivel_geografico || 'basico'
  });

  // Generamos el JWT que viajará en el correo
  const tokenAutoLogin = generarToken({
      id: inscripcion.id,
  });
  try {
      // Obtener texto del nivel y rol para el correo
      const nivelTexto = getNivelTexto(inscripcion.nivel_geografico);
      const rolTexto = getRolTexto(inscripcion.rol);
      
      const info = await sendEmail({
          to: inscripcion.correo_electronico,
          subject: "Confirmación de inscripción - Taller CPCI",
          html: inscripcionTemplate({
              ...inscripcion,
              tokenAutoLogin,
              nivelTexto,
              rolTexto
          }),
          attachments: [
              {
                  filename: "logo_2022.png",
                  path: path.join(process.cwd(), "public/Img/logo_2022.png"),
                  cid: "logo_principal",
              },
              {
                  filename: "logocpci.png",
                  path: path.join(process.cwd(), "public/Img/logocpci.png"),
                  cid: "logo_secundario",
              },
          ],
      });

  } catch (error) {
      console.error("ERROR SMTP");
      console.error(error);
  }

  return inscripcion;
}