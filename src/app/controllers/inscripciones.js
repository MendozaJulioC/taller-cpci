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

  const inscripcion = await createInscripcion({
    ...body,
    username,
    password_hash: passwordHash,
    session_id: sessionId,
  });

  try {
    await sendEmail({
      to: inscripcion.correo_electronico,
      subject: "Confirmación de inscripción - Taller CPCI",
      html: inscripcionTemplate(inscripcion),
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
    console.error(
      "Error enviando correo:",
      error
    );
  }

  return inscripcion;
}