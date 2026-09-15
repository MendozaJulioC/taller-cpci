// src/scripts/enviarPruebaBienvenida.js
import "dotenv/config"; // 👈 agrega esto si usas variables de entorno desde .env
import { sendEmail } from "../utils/email.js";
import { bienvenidaTallerTemplate } from "../templates/bienvenidaTallerEmail.js";

// 👇 Lista fija de prueba — solo estos 3 destinatarios
const destinatariosPrueba = [
  {
    email: "jg.geograf@gmail.com",
    nombres: "Jordi",
    apellidos: "",
    username: "jg.geograf",
  },
  {
    email: "juliomendoza.medellin@gmail.com",
    nombres: "Julio",
    apellidos: "Mendoza",
    username: "julio.mendoza",
  },
  {
    email: "jucampuca@gmail.com",
    nombres: "Juan",
    apellidos: "",
    username: "jucampuca",
  },
];

async function enviarCorreosPrueba() {
  for (const persona of destinatariosPrueba) {
    try {
      const html = bienvenidaTallerTemplate({
        nombres: persona.nombres,
        apellidos: persona.apellidos,
        username: persona.username,
        // puedes sobreescribir fechaInicio, fechaFin, modalidad, etc. si quieres
      });

      await sendEmail({
        to: persona.email,
        subject: "¡Bienvenido al Taller CPCI!",
        html,
        // attachments: [...] si tu template usa cid:logo_principal / logo_secundario,
        // aquí debes incluir los attachments con cid correspondiente
      });

      console.log(`✅ Enviado a ${persona.email}`);
    } catch (error) {
      console.error(`❌ Error enviando a ${persona.email}:`, error.message);
    }
  }
}

enviarCorreosPrueba();