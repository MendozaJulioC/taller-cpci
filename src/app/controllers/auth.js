// src/app/controllers/auth.js
import bcrypt from "bcryptjs";
import { getUserByUsernameOrEmail } from "@/services/auth/auth_queries";
import { generarToken } from "@/utils/jwt";

export async function login(body) {
  const { username, password } = body;

  if (!username || !password) {
    throw new Error("Usuario y contraseña son requeridos");
  }

  // Buscar usuario por username o email
  const user = await getUserByUsernameOrEmail(username);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Verificar contraseña
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error("Contraseña incorrecta");
  }

  // Verificar estado del usuario (si existe la columna)
  if (user.estado && user.estado !== "ACTIVO" && user.estado !== "PENDIENTE") {
    throw new Error("Usuario no autorizado");
  }

  // 🔥 IMPORTANTE: Asegurarse de que el rol esté presente
  const usuario = {
    id: user.id,
    username: user.username,
    nombres: user.nombres,
    apellidos: user.apellidos,
    correo_electronico: user.correo_electronico,
    telefono: user.telefono || '',
    cargo: user.cargo || '',
    pais: user.pais || '',
    organizacion: user.organizacion || '',
    rol: user.rol || 'participante',
  };

  console.log('🔐 Login - Usuario encontrado:', usuario);
  console.log('🔐 Login - Rol del usuario:', usuario.rol);

  // Generar token con el rol incluido
  const token = generarToken({
    id: user.id,
    username: user.username,
    rol: usuario.rol,
  });

  return {
    token,
    usuario,
  };
}