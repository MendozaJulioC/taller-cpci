// src/app/api/calificaciones/route.js
import { NextResponse } from "next/server";
import { 
  obtenerTodasCalificaciones,
  obtenerParticipantesConCalificaciones,
  obtenerCalificacionesParticipante,
  obtenerArchivosParticipanteTaller,
  guardarCalificacion,
  eliminarCalificacion
} from "@/app/controllers/calificaciones";

// GET: Obtener calificaciones
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const inscripcionId = searchParams.get('inscripcionId');
    const tallerId = searchParams.get('tallerId');
    const todos = searchParams.get('todos') === 'true';
    const participantes = searchParams.get('participantes') === 'true';

    console.log('📥 GET /api/calificaciones - Parámetros:', { 
      inscripcionId, 
      tallerId, 
      todos, 
      participantes,
      participantesEsTrue: participantes === true
    });

    // Si se pide participantes agrupados (para formadores)
    if (participantes === true) {
        console.log('📥 Obteniendo participantes con calificaciones...');
      const data = await obtenerParticipantesConCalificaciones();
      console.log('📥 Datos de participantes:', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true, data });
    }

    // Si se piden todas las calificaciones (para formadores)
    if (todos) {
      const data = await obtenerTodasCalificaciones();
      return NextResponse.json({ success: true, data });
    }

    // Si se pide un inscripcionId específico (para participantes)
    if (inscripcionId && !tallerId) {
      const data = await obtenerCalificacionesParticipante(parseInt(inscripcionId));
      return NextResponse.json({ success: true, data });
    }

    // Si se pide un inscripcionId y tallerId específico (todas las versiones)
    if (inscripcionId && tallerId) {
      const data = await obtenerArchivosParticipanteTaller(parseInt(inscripcionId), parseInt(tallerId));
      return NextResponse.json({ success: true, data });
    }

    // Si no se pasa ningún parámetro válido
    return NextResponse.json(
      { success: false, message: "Se requiere inscripcionId, todos o participantes" },
      { status: 400 }
    );
  } catch (error) {
    console.error('❌ Error en GET /api/calificaciones:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST: Crear o actualizar calificación
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.inscripcion_id || !body.taller_id) {
      return NextResponse.json(
        { success: false, message: "Faltan campos obligatorios: inscripcion_id y taller_id" },
        { status: 400 }
      );
    }

    const result = await guardarCalificacion(body);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Calificación guardada correctamente"
    });
  } catch (error) {
    console.error('❌ Error en POST /api/calificaciones:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar calificación
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const inscripcionId = searchParams.get('inscripcionId');
    const tallerId = searchParams.get('tallerId');
    const version = searchParams.get('version'); // 👈 NUEVO: versión específica

    if (!inscripcionId || !tallerId) {
      return NextResponse.json(
        { success: false, message: "Faltan parámetros: inscripcionId y tallerId" },
        { status: 400 }
      );
    }

    // Si se especifica versión, eliminar solo esa versión
    if (version) {
      await eliminarCalificacion(parseInt(inscripcionId), parseInt(tallerId), parseInt(version));
      return NextResponse.json({
        success: true,
        message: `Versión ${version} eliminada correctamente`
      });
    }

    // Si no se especifica versión, eliminar todas las versiones del taller
    await eliminarCalificacion(parseInt(inscripcionId), parseInt(tallerId));

    return NextResponse.json({
      success: true,
      message: "Taller eliminado correctamente"
    });
  } catch (error) {
    console.error('❌ Error en DELETE /api/calificaciones:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}