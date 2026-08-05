// src/services/calificaciones/calificaciones_queries.js
import { dblocal } from "@/services/database/db";

// Obtener calificación por inscripción y taller
export const getCalificacionByInscripcionAndTaller = async (inscripcionId, tallerId) => {
  const query = `
    SELECT * FROM taller_cpci.calificaciones
    WHERE inscripcion_id = $1 AND taller_id = $2
    ORDER BY version DESC
    LIMIT 1
  `;
  const result = await dblocal.query(query, [inscripcionId, tallerId]);
  return result.rows[0];
};

// Obtener todas las versiones de archivos de un participante para un taller
export const getArchivosByInscripcionAndTaller = async (inscripcionId, tallerId) => {
  const query = `
    SELECT * FROM taller_cpci.calificaciones
    WHERE inscripcion_id = $1 AND taller_id = $2
    ORDER BY version DESC
  `;
  const result = await dblocal.query(query, [inscripcionId, tallerId]);
  return result.rows;
};

// Obtener la última versión de un archivo
export const getUltimaVersionArchivo = async (inscripcionId, tallerId) => {
  const query = `
    SELECT COALESCE(MAX(version), 0) as max_version
    FROM taller_cpci.calificaciones
    WHERE inscripcion_id = $1 AND taller_id = $2
  `;
  const result = await dblocal.query(query, [inscripcionId, tallerId]);
  return result.rows[0]?.max_version || 0;
};

// Crear nueva versión de archivo
export const crearVersionArchivo = async (data) => {
  const query = `
    INSERT INTO taller_cpci.calificaciones (
        inscripcion_id,
        taller_id,
        version,
        archivo_nombre,
        archivo_ruta,
        archivo_subido,
        fecha_subida
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    data.inscripcion_id,
    data.taller_id,
    data.version || 1,
    data.archivo_nombre,
    data.archivo_ruta,
    true,
    new Date()
  ];

  const result = await dblocal.query(query, values);
  return result.rows[0];
};

// Obtener calificación por inscripción, taller y versión
export const getCalificacionByInscripcionTallerVersion = async (inscripcionId, tallerId, version) => {
  const query = `
    SELECT * FROM taller_cpci.calificaciones
    WHERE inscripcion_id = $1 AND taller_id = $2 AND version = $3
  `;
  const result = await dblocal.query(query, [inscripcionId, tallerId, version]);
  return result.rows[0];
};

// Actualizar calificación de una versión específica
export const updateCalificacionByVersion = async (data) => {
  const query = `
    UPDATE taller_cpci.calificaciones
    SET 
        calificacion = $1,
        aprobado = $2,
        comentarios = $3,
        calificado = $4,
        fecha_calificacion = $5,
        updated_at = CURRENT_TIMESTAMP
    WHERE inscripcion_id = $6 AND taller_id = $7 AND version = $8
    RETURNING *;
  `;

  const values = [
    data.calificacion || null,
    data.aprobado || false,
    data.comentarios || null,
    data.calificado || false,
    data.fecha_calificacion || new Date(),
    data.inscripcion_id,
    data.taller_id,
    data.version || 1
  ];

  const result = await dblocal.query(query, values);
  return result.rows[0];
};

// Obtener todas las calificaciones de un participante
export const getCalificacionesByInscripcion = async (inscripcionId) => {
  const query = `
    SELECT * FROM taller_cpci.calificaciones
    WHERE inscripcion_id = $1
    ORDER BY taller_id ASC, version DESC
  `;
  const result = await dblocal.query(query, [inscripcionId]);
  return result.rows;
};

// Obtener todas las calificaciones con datos de participantes (para formadores)
export const getAllCalificacionesWithParticipantes = async () => {
  const query = `
    SELECT 
      c.*,
      i.nombres,
      i.apellidos,
      i.correo_electronico,
      i.cargo,
      i.pais,
      i.organizacion,
      i.username
    FROM taller_cpci.calificaciones c
    JOIN taller_cpci.inscripciones i ON c.inscripcion_id = i.id
    WHERE i.rol = 'participante'
    ORDER BY i.nombres ASC, c.taller_id ASC, c.version DESC
  `;
  const result = await dblocal.query(query);
  return result.rows;
};

// Obtener participantes agrupados con sus calificaciones
export const getParticipantesWithCalificaciones = async () => {
  const query = `
    SELECT 
      i.id,
      i.nombres,
      i.apellidos,
      i.correo_electronico,
      i.cargo,
      i.pais,
      i.organizacion,
      i.username,
      (
        SELECT json_agg(
          json_build_object(
            'taller_id', c.taller_id,
            'version', c.version,
            'archivo_nombre', c.archivo_nombre,
            'archivo_ruta', c.archivo_ruta,
            'archivo_subido', c.archivo_subido,
            'fecha_subida', c.fecha_subida,
            'calificacion', c.calificacion,
            'aprobado', c.aprobado,
            'comentarios', c.comentarios,
            'calificado', c.calificado,
            'fecha_calificacion', c.fecha_calificacion
          )
          ORDER BY c.taller_id ASC, c.version DESC
        ) 
        FROM taller_cpci.calificaciones c
        WHERE c.inscripcion_id = i.id
      ) as calificaciones
    FROM taller_cpci.inscripciones i
    WHERE i.rol = 'participante'
    ORDER BY i.nombres ASC
  `;
  const result = await dblocal.query(query);
  return result.rows;
};

// ELIMINAR calificación (eliminar una versión específica o todas las versiones de un taller)
export const deleteCalificacion = async (inscripcionId, tallerId, version = null) => {
  let query;
  let values;

  if (version !== null) {
    // Eliminar una versión específica
    query = `
      DELETE FROM taller_cpci.calificaciones
      WHERE inscripcion_id = $1 AND taller_id = $2 AND version = $3
    `;
    values = [inscripcionId, tallerId, version];
  } else {
    // Eliminar todas las versiones de un taller
    query = `
      DELETE FROM taller_cpci.calificaciones
      WHERE inscripcion_id = $1 AND taller_id = $2
    `;
    values = [inscripcionId, tallerId];
  }

  const result = await dblocal.query(query, values);
  return result.rowCount;
};