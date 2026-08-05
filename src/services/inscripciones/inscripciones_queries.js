// src/services/inscripciones/inscripciones_queries.js
import { dblocal } from "@/services/database/db";

export const getInscripcionByEmail = async (correo) => {
  const query = `
    SELECT id
    FROM taller_cpci.inscripciones
    WHERE correo_electronico = $1
    LIMIT 1
  `;

  const result = await dblocal.query(query, [correo]);

  return result.rows[0];
};

export const getUsername = async (username) => {
  const query = `
    SELECT id
    FROM taller_cpci.inscripciones
    WHERE username = $1
    LIMIT 1
  `;

  const result = await dblocal.query(query, [username]);

  return result.rows[0];
};

export const createInscripcion = async (data) => {
  const query = `
    INSERT INTO taller_cpci.inscripciones (
        username,
        password_hash,
        nombres,
        apellidos,
        correo_electronico,
        telefono,
        cargo,
        pais,
        organizacion,
        tiene_power_bi,
        usa_otro_bi,
        otro_bi,
        tiene_arcgis_online,
        session_id,
        rol,
        experiencia_bi,
        nivel_geografico
    )
    VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
    )
    RETURNING *;
  `;

  const values = [
    data.username,
    data.password_hash,
    data.nombres,
    data.apellidos,
    data.correo_electronico,
    data.telefono,
    data.cargo,
    data.pais,
    data.organizacion,
    data.tiene_power_bi,
    data.usa_otro_bi,
    data.otro_bi_nombre,
    data.tiene_arcgis_online,
    data.session_id,
    data.rol || 'participante',
    data.experiencia_bi || false,
    data.nivel_geografico || 'basico'
  ];

  const result = await dblocal.query(query, values);

  return result.rows[0];
};

// NUEVA: Obtener inscripciones por rol
export const getInscripcionesByRol = async (rol) => {
  const query = `
    SELECT id, nombres, apellidos, correo_electronico, cargo, pais, organizacion
    FROM taller_cpci.inscripciones
    WHERE rol = $1
  `;

  const result = await dblocal.query(query, [rol]);
  return result.rows;
};

// NUEVA: Obtener todas las inscripciones
export const getAllInscripciones = async () => {
  const query = `
    SELECT id, nombres, apellidos, correo_electronico, cargo, pais, organizacion, rol
    FROM taller_cpci.inscripciones
    ORDER BY id DESC
  `;

  const result = await dblocal.query(query);
  return result.rows;
};