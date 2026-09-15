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