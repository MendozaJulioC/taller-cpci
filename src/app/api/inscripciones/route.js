import { NextResponse } from "next/server";
import { registrarInscripcion } from "@/app/controllers/inscripciones";

export async function POST(req) {
  try {
    const body = await req.json();

    if (
      !body.nombres ||
      !body.apellidos ||
      !body.correo_electronico ||
      !body.pais ||
      !body.password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos obligatorios.",
        },
        { status: 400 }
      );
    }

    if (body.password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      );
    }

    const result = await registrarInscripcion(body);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.message.includes("Ya existe") ? 409 : 500,
      }
    );
  }
}