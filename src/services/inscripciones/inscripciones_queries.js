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

export const createInscripcion = async (data) => {
  const query = `
    INSERT INTO taller_cpci.inscripciones (
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
        session_id
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
    )
    RETURNING *;
  `;

  const values = [
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
    ];

  const result = await dblocal.query(query, values);

  return result.rows[0];
};