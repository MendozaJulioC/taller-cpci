import bcrypt from "bcryptjs";

import {
  getUserByResetToken,
  updatePassword,
} from "@/services/auth/auth_queries";

export async function resetPassword(body) {
  const { token, password } = body;

  if (!token) {
    throw new Error("Token inválido.");
  }

  if (!password) {
    throw new Error("Debe ingresar una contraseña.");
  }

  // Validación de contraseña
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "La contraseña debe tener mínimo 8 caracteres, una letra y un número."
    );
  }

  // Buscar usuario mediante el token
  const usuario = await getUserByResetToken(token);

  if (!usuario) {
    throw new Error(
      "El enlace de recuperación no es válido."
    );
  }

  // Verificar expiración
  if (
    !usuario.reset_token_expira ||
    new Date(usuario.reset_token_expira) < new Date()
  ) {
    throw new Error(
      "El enlace de recuperación ha expirado."
    );
  }

  // Encriptar nueva contraseña
  const passwordHash = await bcrypt.hash(
    password,
    10
  );

  // Actualizar contraseña y limpiar token
  await updatePassword(
    usuario.id,
    passwordHash
  );

  return {
    success: true,
    message:
      "La contraseña fue actualizada correctamente.",
  };
}