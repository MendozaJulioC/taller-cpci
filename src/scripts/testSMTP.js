// src/scripts/testSMTP.js
import "dotenv/config";
import nodemailer from "nodemailer";

async function testSMTP() {
  console.log("🔍 Verificando configuración SMTP...");
  console.log("   Host:", process.env.SMTP_HOST);
  console.log("   Port:", process.env.SMTP_PORT);
  console.log("   User:", process.env.SMTP_USER);
  console.log("   Pass:", process.env.SMTP_PASS ? "✅ Configurada" : "❌ NO configurada");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Conexión SMTP exitosa");

    // Enviar correo de prueba
    const info = await transporter.sendMail({
      from: `"Test Taller CPCI" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Prueba SMTP",
      html: "<h1>Prueba exitosa</h1>",
    });
    console.log("✅ Correo enviado:", info.messageId);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("   Código:", error.code);
    console.error("   ResponseCode:", error.responseCode);
  }
}

testSMTP();