import { NextResponse } from "next/server";
import { registrarInscripcion } from "@/app/controllers/inscripciones";

export async function POST(req) {
  try {
    const body = await req.json();

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
            status:
                error.message.includes("Ya existe")
                ? 409
                : 500,
            }
        );
    }
}