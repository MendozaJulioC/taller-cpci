import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET no está definido en las variables de entorno."
  );
}

/**
 * Genera un JWT
 */
export function generarToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verifica un JWT.
 * Lanza una excepción si el token no es válido.
 */
export function verificarToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Decodifica un JWT SIN verificar la firma.
 * Solo sirve para leer el contenido.
 */
export function decodificarToken(token) {
  return jwt.decode(token);
}