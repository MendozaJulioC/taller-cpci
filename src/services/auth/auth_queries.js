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

export const getUserByEmail = async (correo) => {
  const query = `
    SELECT
      id,
      username,
      nombres,
      apellidos,
      correo_electronico
    FROM taller_cpci.inscripciones
    WHERE correo_electronico = $1
    LIMIT 1;
  `;

  const result = await dblocal.query(query, [correo]);

  return result.rows[0];
};

export const guardarResetToken = async (
  userId,
  token,
  expiracion
) => {
  const query = `
    UPDATE taller_cpci.inscripciones
    SET
      reset_token = $2,
      reset_token_expira = $3
    WHERE id = $1;
  `;

  await dblocal.query(query, [
    userId,
    token,
    expiracion,
  ]);
};

export const getUserByResetToken = async (
  token
) => {
  const query = `
    SELECT
      id,
      username,
      reset_token_expira
    FROM taller_cpci.inscripciones
    WHERE reset_token = $1
    LIMIT 1;
  `;

  const result = await dblocal.query(query, [token]);

  return result.rows[0];
};

export const updatePassword = async (
  userId,
  passwordHash
) => {
  const query = `
    UPDATE taller_cpci.inscripciones
    SET
      password_hash = $2,
      reset_token = NULL,
      reset_token_expira = NULL
    WHERE id = $1;
  `;

  await dblocal.query(query, [
    userId,
    passwordHash,
  ]);
};

