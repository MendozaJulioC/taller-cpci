import { randomUUID } from "crypto";
import {
  createInscripcion,
  getInscripcionByEmail,
} from "@/services/inscripciones/inscripciones_queries";

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

  return await createInscripcion({
    ...body,
    session_id: sessionId,
  });
}