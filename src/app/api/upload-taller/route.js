// src/app/api/upload-taller/route.js
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getInscripcionByEmail } from "@/services/inscripciones/inscripciones_queries";
import { guardarArchivoSubido } from "@/app/controllers/calificaciones";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('archivo');
    const taller = formData.get('taller');
    const email = formData.get('email');

    console.log('📥 Subiendo archivo:');
    console.log('   - Taller:', taller);
    console.log('   - Email:', email);
    console.log('   - Archivo:', file?.name);
    console.log('   - Tamaño:', file?.size, 'bytes');

    // Validaciones
    if (!file) {
      return NextResponse.json(
        { message: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { message: 'Solo se permiten archivos PDF' },
        { status: 400 }
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'El archivo no debe superar los 20MB' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: 'Email no proporcionado' },
        { status: 400 }
      );
    }

    // Obtener el ID de la inscripción
    const inscripcion = await getInscripcionByEmail(email);
    if (!inscripcion) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Extraer número del taller
    const tallerNumero = parseInt(taller.replace('taller', ''));
    if (isNaN(tallerNumero) || tallerNumero < 1 || tallerNumero > 3) {
      return NextResponse.json(
        { message: 'Taller inválido' },
        { status: 400 }
      );
    }

    // 👇 SUBIR EL ARCHIVO A VERCEL BLOB
    const timestamp = Date.now();
    const nombreArchivo = `${taller}_${inscripcion.id}_${timestamp}_${file.name}`;

    const blob = await put(nombreArchivo, file, {
      access: 'public',
      contentType: 'application/pdf',
    });

    console.log(`✅ Archivo subido a Blob: ${blob.url}`);

    // 👇 GUARDAR LA URL DEL BLOB EN LA BASE DE DATOS
    await guardarArchivoSubido(
      inscripcion.id,
      tallerNumero,
      file.name,
      blob.url
    );

    return NextResponse.json({
      message: 'Archivo subido correctamente',
      archivo: nombreArchivo,
      ruta: blob.url,
    });

  } catch (error) {
    console.error('❌ Error al subir archivo:', error);
    return NextResponse.json(
      { message: 'Error al subir el archivo: ' + error.message },
      { status: 500 }
    );
  }
}