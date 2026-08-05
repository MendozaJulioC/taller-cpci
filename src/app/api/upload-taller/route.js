// src/app/api/upload-taller/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('archivo');
    const taller = formData.get('taller');

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

    // Crear nombre único para el archivo
    const timestamp = Date.now();
    const nombreArchivo = `${taller}_${timestamp}_${file.name}`;
    const rutaArchivo = path.join(process.cwd(), 'public/uploads', nombreArchivo);

    // Crear directorio si no existe
    await mkdir(path.dirname(rutaArchivo), { recursive: true });

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(rutaArchivo, buffer);

    return NextResponse.json({
      message: 'Archivo subido correctamente',
      archivo: nombreArchivo,
      ruta: `/uploads/${nombreArchivo}`
    });

  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json(
      { message: 'Error al subir el archivo' },
      { status: 500 }
    );
  }
}