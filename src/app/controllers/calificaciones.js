// src/app/controllers/calificaciones.js
import {
  getCalificacionByInscripcionAndTaller,
  getArchivosByInscripcionAndTaller,
  getUltimaVersionArchivo,
  crearVersionArchivo,
  getCalificacionByInscripcionTallerVersion,
  updateCalificacionByVersion,
  getCalificacionesByInscripcion,
  getAllCalificacionesWithParticipantes,
  getParticipantesWithCalificaciones,
  deleteCalificacion
} from "@/services/calificaciones/calificaciones_queries";

// Obtener calificación de un participante para un taller específico
export const obtenerCalificacion = async (inscripcionId, tallerId) => {
  return await getCalificacionByInscripcionAndTaller(inscripcionId, tallerId);
};

// Obtener todas las versiones de archivos de un participante para un taller
export const obtenerArchivosParticipanteTaller = async (inscripcionId, tallerId) => {
  return await getArchivosByInscripcionAndTaller(inscripcionId, tallerId);
};

// Obtener la última versión de un archivo
export const obtenerUltimaVersion = async (inscripcionId, tallerId) => {
  return await getUltimaVersionArchivo(inscripcionId, tallerId);
};

// Obtener todas las calificaciones de un participante
export const obtenerCalificacionesParticipante = async (inscripcionId) => {
  return await getCalificacionesByInscripcion(inscripcionId);
};

// Obtener todas las calificaciones con datos de participantes (para formadores)
export const obtenerTodasCalificaciones = async () => {
  return await getAllCalificacionesWithParticipantes();
};

// Obtener participantes agrupados con sus calificaciones
export const obtenerParticipantesConCalificaciones = async () => {
  return await getParticipantesWithCalificaciones();
};

// Guardar archivo subido (crear nueva versión)
export const guardarArchivoSubido = async (inscripcionId, tallerId, archivoNombre, archivoRuta) => {
  const ultimaVersion = await getUltimaVersionArchivo(inscripcionId, tallerId);
  const nuevaVersion = ultimaVersion + 1;
  
  const data = {
    inscripcion_id: inscripcionId,
    taller_id: tallerId,
    version: nuevaVersion,
    archivo_nombre: archivoNombre,
    archivo_ruta: archivoRuta
  };
  return await crearVersionArchivo(data);
};

// Guardar calificación (actualizar la última versión)
export const guardarCalificacion = async (data) => {
  // Validar que la calificación esté entre 0 y 10
  if (data.calificacion !== null && data.calificacion !== undefined) {
    if (data.calificacion < 0 || data.calificacion > 10) {
      throw new Error("La calificación debe estar entre 0 y 10");
    }
  }

  // Si no se especifica versión, usar la última
  let version = data.version;
  if (!version) {
    version = await getUltimaVersionArchivo(data.inscripcion_id, data.taller_id);
  }

  // Si se está calificando, marcar como calificado
  if (data.calificacion !== null || data.aprobado !== undefined) {
    data.calificado = true;
    data.fecha_calificacion = new Date();
  }

  data.version = version;

  return await updateCalificacionByVersion(data);
};

// Eliminar calificación
// Eliminar calificación (una versión específica o todas)
export const eliminarCalificacion = async (inscripcionId, tallerId, version = null) => {
  return await deleteCalificacion(inscripcionId, tallerId, version);
};