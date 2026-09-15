// src/app/controllers/bienvenida.js
import path from "path";
import { sendEmail } from "@/utils/email";
import { bienvenidaTallerTemplate } from "@/templates/bienvenidaTallerEmail";
import {
  getAllInscripciones,
  getInscripcionById,
  getInscritosPendientes,
  getTotalPendientes,
  getTotalEnviados,
  marcarComoEnviado,
} from "@/services/bienvenida/bienvenida_queries";

/**
 * Obtener la lista de inscritos para previsualización
 */
export async function obtenerListaInscritos() {
  const inscripciones = await getAllInscripciones();
  return inscripciones;
}

/**
 * Obtener el estado actual del proceso de envío
 * Cuántos enviados, cuántos pendientes, cuántos en total
 */
export async function obtenerEstadoEnvios() {
  const totalPendientes = await getTotalPendientes();
  const totalEnviados = await getTotalEnviados();

  return {
    totalPendientes,
    totalEnviados,
    totalGeneral: totalPendientes + totalEnviados,
  };
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

  // Marcar como enviado en la BD
  await marcarComoEnviado(inscripcion.id, true, null);

  return {
    success: true,
    message: `Correo enviado a ${inscripcion.correo_electronico}`,
    destinatario: inscripcion.correo_electronico,
  };
}

/**
 * 👇 NUEVO: Enviar lote diario de correos pendientes
 * 
 * Envía un máximo de `limiteDiario` correos a los inscritos que aún no han recibido
 * el correo de bienvenida. Registra cada envío en la BD para no repetir.
 * 
 * @param {number} limiteDiario - Máximo de correos a enviar en esta ejecución (default: 25)
 */
export async function enviarPendientesDiarios(limiteDiario = 25) {
  // Obtener los inscritos que aún no han recibido el correo
  const pendientes = await getInscritosPendientes(limiteDiario);
  const totalPendientesAntes = await getTotalPendientes();
  const totalEnviadosAntes = await getTotalEnviados();

  // Si no hay pendientes, todo está enviado
  if (pendientes.length === 0) {
    return {
      success: true,
      message: "🎉 ¡Todos los correos ya fueron enviados!",
      totalPendientes: 0,
      totalEnviados: totalEnviadosAntes,
      totalGeneral: totalEnviadosAntes,
      enviadosHoy: 0,
      exitosos: 0,
      fallidos: 0,
      detalles: [],
      completado: true,
    };
  }

  console.log(`📧 Enviando ${pendientes.length} correos (de ${totalPendientesAntes} pendientes)...`);

  const resultados = {
    totalPendientes: totalPendientesAntes,
    totalEnviados: totalEnviadosAntes,
    totalGeneral: totalPendientesAntes + totalEnviadosAntes,
    enviadosHoy: pendientes.length,
    exitosos: 0,
    fallidos: 0,
    detalles: [],
    completado: false,
  };

  for (const inscripcion of pendientes) {
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

      // Marcar como enviado exitosamente
      await marcarComoEnviado(inscripcion.id, true, null);

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      console.log(`✅ Enviado (${resultados.exitosos}/${pendientes.length}): ${inscripcion.correo_electronico}`);

      // Pausa de 2 segundos entre correos para no saturar Gmail
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      // Marcar como fallido (NO como enviado, para que se reintente mañana)
      await marcarComoEnviado(inscripcion.id, false, error.message);

      resultados.fallidos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "fallido",
        razon: error.message,
        codigo: error.code || "UNKNOWN",
      });

      console.error(`❌ Error: ${inscripcion.correo_electronico} - ${error.message}`);
    }
  }

  // Actualizar totales finales
  resultados.totalEnviados = totalEnviadosAntes + resultados.exitosos;
  resultados.totalPendientes = totalPendientesAntes - resultados.exitosos;
  resultados.completado = resultados.totalPendientes === 0;

  console.log(
    `📊 Lote diario completado: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos. Quedan ${resultados.totalPendientes} pendientes.`
  );

  return {
    success: true,
    message: resultados.completado
      ? `🎉 ¡Envío completado! Total: ${resultados.totalEnviados} correos enviados.`
      : `✅ Enviados ${resultados.exitosos} correos hoy. Quedan ${resultados.totalPendientes} pendientes para mañana.`,
    ...resultados,
  };
}

/**
 * Reintentar correos fallidos específicos
 */
export async function reintentarCorreosFallidos(emailsFallidos) {
  if (!Array.isArray(emailsFallidos) || emailsFallidos.length === 0) {
    throw new Error("No se recibieron correos para reintentar");
  }

  console.log(`🔄 Reintentando envío a ${emailsFallidos.length} correos fallidos...`);

  const todasLasInscripciones = await getAllInscripciones();

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

      // Marcar como enviado
      await marcarComoEnviado(inscripcion.id, true, null);

      resultados.exitosos++;
      resultados.detalles.push({
        email: inscripcion.correo_electronico,
        nombre: `${inscripcion.nombres} ${inscripcion.apellidos}`,
        estado: "exitoso",
      });

      console.log(`✅ Reintento exitoso: ${inscripcion.correo_electronico}`);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Reintento fallido para ${inscripcion.correo_electronico}:`, error.message);

      await marcarComoEnviado(inscripcion.id, false, error.message);

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