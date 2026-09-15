// src/services/inscripciones/bienvenida_queries.js
import { dblocal } from "@/services/database/db";

// Obtener TODOS los inscritos sin importar su estado
export const getAllInscripciones = async () => {
  const query = `
    SELECT 
      id, 
      nombres, 
      apellidos, 
      username,
      correo_electronico, 
      cargo, 
      pais, 
      organizacion, 
      rol,
      created_at
    FROM taller_cpci.inscripciones
    ORDER BY created_at DESC
  `;

  const result = await dblocal.query(query);
  return result.rows;
};

// Obtener una inscripción por ID
export const getInscripcionById = async (id) => {
  const query = `
    SELECT 
      id, 
      nombres, 
      apellidos, 
      username,
      correo_electronico,
      rol
    FROM taller_cpci.inscripciones
    WHERE id = $1
    LIMIT 1
  `;

  const result = await dblocal.query(query, [id]);
  return result.rows[0];
};

// Contar el total de inscritos (sin filtros)
export const getTotalInscritos = async () => {
  const query = `
    SELECT COUNT(*) as total
    FROM taller_cpci.inscripciones
  `;

  const result = await dblocal.query(query);
  return parseInt(result.rows[0].total);
};

// Obtener inscritos que AÚN NO han recibido el correo
export const getInscritosPendientes = async (limite = 25) => {
  const query = `
    SELECT 
      i.id, 
      i.nombres, 
      i.apellidos, 
      i.username,
      i.correo_electronico
    FROM taller_cpci.inscripciones i
    WHERE NOT EXISTS (
      SELECT 1 
      FROM taller_cpci.envios_bienvenida e
      WHERE e.inscripcion_id = i.id 
        AND e.correo_enviado = TRUE
    )
    ORDER BY i.created_at ASC
    LIMIT $1
  `;

  const result = await dblocal.query(query, [limite]);
  return result.rows;
};

// Contar cuántos faltan por enviar
export const getTotalPendientes = async () => {
  const query = `
    SELECT COUNT(*) as total
    FROM taller_cpci.inscripciones i
    WHERE NOT EXISTS (
      SELECT 1 
      FROM taller_cpci.envios_bienvenida e
      WHERE e.inscripcion_id = i.id 
        AND e.correo_enviado = TRUE
    )
  `;

  const result = await dblocal.query(query);
  return parseInt(result.rows[0].total);
};

// Contar cuántos ya se enviaron
export const getTotalEnviados = async () => {
  const query = `
    SELECT COUNT(*) as total
    FROM taller_cpci.envios_bienvenida
    WHERE correo_enviado = TRUE
  `;

  const result = await dblocal.query(query);
  return parseInt(result.rows[0].total);
};

// Marcar como enviado
export const marcarComoEnviado = async (inscripcionId, exito = true, error = null) => {
  const query = `
    INSERT INTO taller_cpci.envios_bienvenida (
      inscripcion_id,
      correo_enviado,
      fecha_envio,
      intentos,
      ultimo_error
    )
    VALUES ($1, $2, $3, 1, $4)
    ON CONFLICT (inscripcion_id)
    DO UPDATE SET
      correo_enviado = $2,
      fecha_envio = CASE WHEN $2 THEN CURRENT_TIMESTAMP ELSE envios_bienvenida.fecha_envio END,
      intentos = envios_bienvenida.intentos + 1,
      ultimo_error = $4
    RETURNING *;
  `;

  const result = await dblocal.query(query, [
    inscripcionId,
    exito,
    exito ? new Date() : null,
    error,
  ]);
  return result.rows[0];
};