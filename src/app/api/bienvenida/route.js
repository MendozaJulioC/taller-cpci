// src/app/api/bienvenida/route.js
export const maxDuration = 60;

import { NextResponse } from "next/server";
import {
  enviarBienvenidaMasiva,
  enviarBienvenidaIndividual,
  enviarBienvenidaPorLote,
  reintentarCorreosFallidos,
  obtenerListaInscritos,
} from "@/app/controllers/bienvenida";

// GET: Obtener lista de inscritos
export async function GET() {
  try {
    const data = await obtenerListaInscritos();

    return NextResponse.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error("❌ Error al obtener inscritos:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST: Enviar correo de bienvenida
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      inscripcionId, 
      masivo, 
      inicio, 
      limite, 
      totalGeneral,
      reintentar,
      emailsFallidos, // 👈 NUEVO
    } = body;

    // 👇 Reintentar correos fallidos
    if (reintentar === true && emailsFallidos && Array.isArray(emailsFallidos)) {
      const resultado = await reintentarCorreosFallidos(emailsFallidos);
      return NextResponse.json(resultado);
    }

    // Envío por lote
    if (inicio !== undefined && limite !== undefined && totalGeneral !== undefined) {
      const resultado = await enviarBienvenidaPorLote(inicio, limite, totalGeneral);
      return NextResponse.json(resultado);
    }

    // Envío masivo completo
    if (masivo === true) {
      const resultado = await enviarBienvenidaMasiva();
      return NextResponse.json(resultado);
    }

    // Envío individual
    if (inscripcionId) {
      const resultado = await enviarBienvenidaIndividual(parseInt(inscripcionId));
      return NextResponse.json(resultado);
    }

    return NextResponse.json(
      { success: false, message: "Parámetros inválidos" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}