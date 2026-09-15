// src/app/controllers/bienvenida.js
import path from "path";
import { sendEmail } from "@/utils/email";
import { bienvenidaTallerTemplate } from "@/templates/bienvenidaTallerEmail";
import {
  getAllInscripciones,
  getInscripcionById,
} from "@/services/bienvenida/bienvenida_queries";

/**
 * Obtener la lista de inscritos para previsualización
 */
export async function obtenerListaInscritos() {
  const inscripciones = await getAllInscripciones();
  return inscripciones;
}

/**
 * Enviar correo de bienvenida a UN solo usuario
 */
export async function enviarBienvenidaIndividual(inscripcionId) {
  const inscripcion = await getInscripcionById(inscripcionId);
  if (!inscripcion) {
    throw new Error("Usuario no encontrado");
  }

  const html = bienvenidaTallerTemplate({
    nombres: inscripcion.nombres,
    apellidos: inscripcion.apellidos,
    username: inscripcion.username,
  });

  await sendEmail({
    to: inscripcion.correo_electronico,
    subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
    html,
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
    message: `Correo enviado a ${inscripcion.correo_electronico}`,
    destinatario: inscripcion.correo_electronico,
  };
}

/**
 * Enviar correos por lote (envío inicial)
 */
export async function enviarBienvenidaPorLote(inicio, limite, totalGeneral) {
  const todasLasInscripciones = await getAllInscripciones();
  const lote = todasLasInscripciones.slice(inicio, inicio + limite);

  console.log(`📦 Procesando lote: inicio=${inicio}, límite=${limite}, correos en este lote=${lote.length}`);

  const resultados = {
    loteActual: Math.floor(inicio / limite) + 1,
    totalLotes: Math.ceil(totalGeneral / limite),
    procesadosEnEsteLote: lote.length,
    exitosos: 0,
    fallidos: 0,
    detalles: [],
    siguienteInicio: inicio + limite,
    hayMas: inicio + limite < totalGeneral,
  };

  for (const inscripcion of lote) {
    try {
      const html = bienvenidaTallerTemplate({
        nombres: inscripcion.nombres,
        apellidos: inscripcion.apellidos,
        username: inscripcion.username,
      });

      await sendEmail({
        to: inscripcion.correo_electronico,
        subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
        html,
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

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      console.log(`✅ Enviado: ${inscripcion.correo_electronico}`);

      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`❌ Error enviando a ${inscripcion.correo_electronico}:`, error.message);
      resultados.fallidos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "fallido",
        razon: error.message,
        codigo: error.code || "UNKNOWN",
      });
    }
  }

  console.log(`📊 Lote completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`);

  return {
    success: true,
    ...resultados,
  };
}

/**
 * 👇 NUEVA: Reintentar correos fallidos
 * Recibe un array de emails y les reenvía el correo
 */
export async function reintentarCorreosFallidos(emailsFallidos) {
  if (!Array.isArray(emailsFallidos) || emailsFallidos.length === 0) {
    throw new Error("No se recibieron correos para reintentar");
  }

  console.log(`🔄 Reintentando envío a ${emailsFallidos.length} correos fallidos...`);

  const todasLasInscripciones = await getAllInscripciones();
  
  // Filtrar solo los que están en la lista de fallidos
  const inscripcionesAReintentar = todasLasInscripciones.filter((inscripcion) =>
    emailsFallidos.includes(inscripcion.correo_electronico)
  );

  console.log(`📋 Encontrados ${inscripcionesAReintentar.length} de ${emailsFallidos.length} correos en la base de datos`);

  const resultados = {
    total: inscripcionesAReintentar.length,
    exitosos: 0,
    fallidos: 0,
    detalles: [],
  };

  for (const inscripcion of inscripcionesAReintentar) {
    try {
      const html = bienvenidaTallerTemplate({
        nombres: inscripcion.nombres,
        apellidos: inscripcion.apellidos,
        username: inscripcion.username,
      });

      await sendEmail({
        to: inscripcion.correo_electronico,
        subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
        html,
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

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      console.log(`✅ Reintento exitoso: ${inscripcion.correo_electronico}`);

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Reintento fallido para ${inscripcion.correo_electronico}:`, error.message);
      resultados.fallidos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "fallido",
        razon: error.message,
        codigo: error.code || "UNKNOWN",
      });
    }
  }

  console.log(`📊 Reintento completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`);

  return {
    success: true,
    message: `Reintento completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`,
    ...resultados,
  };
}

/**
 * Enviar correo de bienvenida a TODOS los inscritos (sin lotes)
 */
export async function enviarBienvenidaMasiva() {
  const inscripciones = await getAllInscripciones();

  if (inscripciones.length === 0) {
    throw new Error("No hay usuarios inscritos para enviar el correo");
  }

  const resultados = {
    total: inscripciones.length,
    exitosos: 0,
    fallidos: 0,
    detalles: [],
  };

  for (const inscripcion of inscripciones) {
    try {
      const html = bienvenidaTallerTemplate({
        nombres: inscripcion.nombres,
        apellidos: inscripcion.apellidos,
        username: inscripcion.username,
      });

      await sendEmail({
        to: inscripcion.correo_electronico,
        subject: "¡Bienvenido al Taller CPCI - Visualización de Datos Catastrales!",
        html,
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

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error enviando a ${inscripcion.correo_electronico}:`, error.message);
      resultados.fallidos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "fallido",
        razon: error.message,
      });
    }
  }

  return {
    success: true,
    message: `Envío completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`,
    ...resultados,
  };
}