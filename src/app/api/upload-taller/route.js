// src/app/api/upload-taller/route.js
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getInscripcionByEmail } from "@/services/inscripciones/inscripciones_queries";
import { guardarArchivoSubido } from "@/app/controllers/calificaciones";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('archivo');
    const taller = formData.get('taller'); // 'taller1', 'taller2', 'taller3'
    const email = formData.get('email'); // Correo del usuario para identificar la inscripción

    if (!file) {
      return NextResponse.json(
        { message: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { message: 'Solo se permiten archivos PDF' },
        { status: 400 }
      );
    }

    // Validar tamaño (20MB)
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'El archivo no debe superar los 20MB' },
        { status: 400 }
      );
    }

    // Obtener el ID de la inscripción por email
    if (!email) {
      return NextResponse.json(
        { message: 'Email no proporcionado' },
        { status: 400 }
      );
    }

    const inscripcion = await getInscripcionByEmail(email);
    if (!inscripcion) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Extraer número del taller (1, 2, 3)
    const tallerNumero = parseInt(taller.replace('taller', ''));
    if (isNaN(tallerNumero) || tallerNumero < 1 || tallerNumero > 3) {
      return NextResponse.json(
        { message: 'Taller inválido' },
        { status: 400 }
      );
    }

    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const nombreArchivo = `${taller}_${inscripcion.id}_${timestamp}_${file.name}`;
    const rutaArchivo = path.join(process.cwd(), 'public/uploads', nombreArchivo);

    // Crear directorio si no existe
    await mkdir(path.dirname(rutaArchivo), { recursive: true });

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(rutaArchivo, buffer);

    // Guardar en la tabla de calificaciones
    const rutaRelativa = `/uploads/${nombreArchivo}`;
    await guardarArchivoSubido(
      inscripcion.id,
      tallerNumero,
      file.name,
      rutaRelativa
    );

    return NextResponse.json({
      message: 'Archivo subido correctamente',
      archivo: nombreArchivo,
      ruta: rutaRelativa
    });

  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json(
      { message: 'Error al subir el archivo: ' + error.message },
      { status: 500 }
    );
  }
}