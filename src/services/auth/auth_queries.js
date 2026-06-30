import { dblocal } from "@/services/database/db";

export const getUserByUsername = async (username) => {
  const query = `
    SELECT
      id,
      username,
      password_hash,
      nombres,
      apellidos,
      correo_electronico,
      estado
    FROM taller_cpci.inscripciones
    WHERE username = $1
    LIMIT 1;
  `;

  const result = await dblocal.query(query, [username]);

  return result.rows[0];
};