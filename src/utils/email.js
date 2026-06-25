import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  return transporter.sendMail({
    from: `"Taller CPCI" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments, // 👈 Incluye los attachments
  });
};