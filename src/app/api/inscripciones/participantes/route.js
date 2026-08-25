// src/app/api/inscripciones/participantes/route.js
import { NextResponse } from "next/server";
import { getAllInscripciones } from "@/services/inscripciones/inscripciones_queries";

export async function GET() {
  try {
    const participantes = await getAllInscripciones();
    
    return NextResponse.json({
      success: true,
      data: participantes
    });
  } catch (error) {
    console.error('Error al obtener participantes:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );
  }
}