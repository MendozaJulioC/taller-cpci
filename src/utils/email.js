// src/utils/email.js
import nodemailer from "nodemailer";

// 👇 Verificar que las variables de entorno estén definidas
if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("⚠️ Faltan variables de entorno SMTP. Verifica tu archivo .env.local");
}

// 👇 Crear transporter con configuración optimizada para envíos masivos
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true para 465, false para 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // 👈 Verifica que coincida con tu .env.local
  },
  // 👇 Configuración de pool para reutilizar conexiones
  pool: true,
  maxConnections: 1, // 👈 Importante para Gmail: solo 1 conexión a la vez
  maxMessages: 50, // Reciclar conexión después de 50 correos
  // 👇 Timeouts
  connectionTimeout: 15000, // 15 segundos para conectar
  greetingTimeout: 10000, // 10 segundos para saludo SMTP
  socketTimeout: 30000, // 30 segundos de inactividad máxima
  // 👇 Logger para debug
  logger: false, // Cambia a true si necesitas debug detallado
  debug: false,
});

// 👇 Verificar conexión al iniciar (solo en desarrollo)
if (process.env.NODE_ENV === "development") {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Error al conectar con SMTP:", error.message);
    } else {
      console.log("✅ Servidor SMTP listo para enviar correos");
    }
  });
}

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"Taller CPCI" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments,
    });

    // 👇 Log de éxito (útil para debug)
    console.log(`📧 Correo enviado a ${to} - ID: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    // 👇 Log detallado del error
    console.error(`❌ Error SMTP enviando a ${to}:`);
    console.error(`   Código: ${error.code || "N/A"}`);
    console.error(`   Comando: ${error.command || "N/A"}`);
    console.error(`   ResponseCode: ${error.responseCode || "N/A"}`);
    console.error(`   Respuesta: ${error.response || "N/A"}`);
    console.error(`   Mensaje: ${error.message}`);

    // 👇 Relanzar el error con información detallada
    const enhancedError = new Error(error.message);
    enhancedError.code = error.code;
    enhancedError.responseCode = error.responseCode;
    enhancedError.command = error.command;
    enhancedError.response = error.response;
    throw enhancedError;
  }
};