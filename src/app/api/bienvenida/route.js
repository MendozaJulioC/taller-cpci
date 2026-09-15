// src/app/api/bienvenida/route.js
export const maxDuration = 300;
import { NextResponse } from "next/server";
import {
  enviarBienvenidaMasiva,
  enviarBienvenidaIndividual,
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
    const { inscripcionId, masivo } = body;

    if (masivo === true) {
      const resultado = await enviarBienvenidaMasiva();
      return NextResponse.json(resultado);
    }

    if (inscripcionId) {
      const resultado = await enviarBienvenidaIndividual(parseInt(inscripcionId));
      return NextResponse.json(resultado);
    }

    return NextResponse.json(
      { success: false, message: "Debes especificar inscripcionId o masivo=true" },
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