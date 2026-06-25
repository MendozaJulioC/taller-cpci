import { randomUUID } from "crypto";
import {
  createInscripcion,
  getInscripcionByEmail,
} from "@/services/inscripciones/inscripciones_queries";
import { sendEmail } from "@/utils/email";
import { inscripcionTemplate } from "@/templates/inscripcionEmail";
import path from "path"; // 👈 Importa path

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

  const inscripcion = await createInscripcion({
    ...body,
    session_id: sessionId,
  });

  try {
    await sendEmail({
      to: inscripcion.correo_electronico,
      subject: "Confirmación de inscripción - Taller CPCI",
      html: inscripcionTemplate(inscripcion),
      // 👇 AÑADE ESTO: los attachments con los logos
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