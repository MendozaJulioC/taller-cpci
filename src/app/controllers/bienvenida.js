// src/app/controllers/bienvenida.js
import path from "path";
import { sendEmail } from "@/utils/email";
import { bienvenidaTallerTemplate } from "@/templates/bienvenidaTallerEmail";
import {
  getAllInscripciones,
  getInscripcionById,
} from "@/services/bienvenida/bienvenida_queries";

/**
 * Obtener la lista de inscritos para previsualización
 */
export async function obtenerListaInscritos() {
  const inscripciones = await getAllInscripciones();
  return inscripciones;
}

/**
 * Enviar correo de bienvenida a UN solo usuario
 */
export async function enviarBienvenidaIndividual(inscripcionId) {
  const inscripcion = await getInscripcionById(inscripcionId);
  if (!inscripcion) {
    throw new Error("Usuario no encontrado");
  }

  const html = bienvenidaTallerTemplate({
    nombres: inscripcion.nombres,
    apellidos: inscripcion.apellidos,
    username: inscripcion.username,
  });

  await sendEmail({
    to: inscripcion.correo_electronico,
    subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
    html,
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

  return {
    success: true,
    message: `Correo enviado a ${inscripcion.correo_electronico}`,
    destinatario: inscripcion.correo_electronico,
  };
}

/**
 * Enviar correo de bienvenida a TODOS los inscritos
 */
export async function enviarBienvenidaMasiva() {
  const inscripciones = await getAllInscripciones();

  if (inscripciones.length === 0) {
    throw new Error("No hay usuarios inscritos para enviar el correo");
  }

  const resultados = {
    total: inscripciones.length,
    exitosos: 0,
    fallidos: 0,
    detalles: [],
  };

  console.log(`📧 Iniciando envío masivo a ${inscripciones.length} inscritos...`);

  for (const inscripcion of inscripciones) {
    try {
      // Personalizar la plantilla con los datos del usuario
      const html = bienvenidaTallerTemplate({
        nombres: inscripcion.nombres,
        apellidos: inscripcion.apellidos,
        username: inscripcion.username,
      });

      // Enviar el correo con los logos adjuntos
      await sendEmail({
        to: inscripcion.correo_electronico,
        subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
        html,
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

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      console.log(`✅ Enviado a ${inscripcion.correo_electronico} (${resultados.exitosos}/${resultados.total})`);

      // Pausa de 1 segundo entre envíos para no saturar el SMTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error enviando a ${inscripcion.correo_electronico}:`, error.message);
      resultados.fallidos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "fallido",
        razon: error.message,
      });
    }
  }

  console.log(`📊 Envío finalizado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`);

  return {
    success: true,
    message: `Envío completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`,
    ...resultados,
  };
}