// src/app/api/bienvenida/route.js
export const maxDuration = 60;

import { NextResponse } from "next/server";
import {
  enviarPendientesDiarios,
  enviarBienvenidaIndividual,
  reintentarCorreosFallidos,
  obtenerListaInscritos,
  obtenerEstadoEnvios,
} from "@/app/controllers/bienvenida";

/**
 * GET: Obtener estado actual de envíos o lista de inscritos
 * 
 * - Sin parámetros: devuelve el estado (enviados, pendientes, total)
 * - ?lista=true: devuelve la lista completa de inscritos
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lista = searchParams.get("lista") === "true";

    // Si se pide la lista completa
    if (lista) {
      const data = await obtenerListaInscritos();
      return NextResponse.json({
        success: true,
        total: data.length,
        data,
      });
    }

    // Por defecto: estado de envíos
    const estado = await obtenerEstadoEnvios();
    return NextResponse.json({
      success: true,
      ...estado,
    });
  } catch (error) {
    console.error("❌ Error al obtener información:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST: Enviar correos de bienvenida
 * 
 * Modos disponibles:
 * 
 * 1. Envío diario por lotes (RECOMENDADO):
 *    Body: { limiteDiario: 25 }  // Opcional, default 25
 *    → Envía los siguientes 25 pendientes
 * 
 * 2. Reintentar correos fallidos:
 *    Body: { reintentar: true, emailsFallidos: ["email1", "email2"] }
 *    → Reintenta solo esos correos específicos
 * 
 * 3. Envío individual:
 *    Body: { inscripcionId: 157 }
 *    → Envía solo a ese usuario
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      inscripcionId,
      limiteDiario = 25,
      reintentar,
      emailsFallidos,
    } = body;

    // 👇 Modo 1: Reintentar correos fallidos específicos
    if (reintentar === true && emailsFallidos && Array.isArray(emailsFallidos)) {
      console.log(`🔄 Modo reintento: ${emailsFallidos.length} correos`);
      const resultado = await reintentarCorreosFallidos(emailsFallidos);
      return NextResponse.json(resultado);
    }

    // 👇 Modo 2: Envío individual
    if (inscripcionId) {
      console.log(`📧 Modo individual: ID ${inscripcionId}`);
      const resultado = await enviarBienvenidaIndividual(parseInt(inscripcionId));
      return NextResponse.json(resultado);
    }

    // 👇 Modo 3: Envío diario por lotes (por defecto)
    console.log(`📧 Modo lote diario: ${limiteDiario} correos máx.`);
    const resultado = await enviarPendientesDiarios(limiteDiario);
    return NextResponse.json(resultado);

  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}