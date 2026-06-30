import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUserByUsername } from "@/services/auth/auth_queries";

export async function login(body) {

  const { username, password } = body;

  // Validaciones básicas
  if (!username || !password) {
    throw new Error(
      "Usuario y contraseña son obligatorios."
    );
  }

  // Buscar usuario
  const usuario = await getUserByUsername(username);

  if (!usuario) {
    throw new Error(
      "Usuario o contraseña incorrectos o no existe la cuenta del usuario."
    );
  }

  // Validar estado del usuario
  if (usuario.estado !== "PENDIENTE" && usuario.estado !== "ACTIVO") {
    throw new Error(
      "Su cuenta no tiene autorización para ingresar."
    );
  }

  // Comparar contraseña
  const passwordValida = await bcrypt.compare(
    password,
    usuario.password_hash
  );

  if (!passwordValida) {
    throw new Error(
      "Usuario o contraseña incorrectos."
    );
  }

  // Crear JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      username: usuario.username,
      nombres: usuario.nombres,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Respuesta
  return {
    token,
    usuario: {
      id: usuario.id,
      username: usuario.username,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo_electronico: usuario.correo_electronico,
      estado: usuario.estado,
    },
  };
}