import crypto from "crypto";
import path from "path";
import { getUserByEmail, guardarResetToken } from "@/services/auth/auth_queries";
import { sendEmail } from "@/utils/email";
// 👇 Importa el template mejorado
import { recuperacionPasswordTemplate } from "@/templates/recuperacionPasswordEmail";

export async function recuperarPassword(body) {
  const { correo_electronico } = body;

  if (!correo_electronico) {
    throw new Error("Debe ingresar un correo electrónico.");
  }

  // Buscar usuario
  const usuario = await getUserByEmail(correo_electronico);

  if (!usuario) {
    throw new Error("No existe un usuario registrado con este correo.");
  }

  // Generar token
  const token = crypto.randomBytes(32).toString("hex");
  const expiracion = new Date(Date.now() + 60 * 60 * 1000);

  // Guardar token
  await guardarResetToken(usuario.id, token, expiracion);

  // 👇 Enviar correo con el nuevo template
  await sendEmail({
    to: usuario.correo_electronico,
    subject: "🔑 Recuperación de contraseña - Taller CPCI",
    html: recuperacionPasswordTemplate({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos || '',
      token: token,
    }),
    attachments: [
      {
        filename: "logo_2022.png",
        path: path.join(process.cwd(), "public/Img/logo_2022.png"),
        cid: "logo_principal",
      },
      {
        filename: "logocpci.png",
        path: path.join(process.cwd(), "public/Img/logocpci.png"),
        cid: "logo_secundario",
      },
    ],
  });

  return {
    success: true,
  };
}