import { NextResponse } from "next/server";

import { resetPassword } from "@/app/controllers/auth/resetPasswordController";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await resetPassword(body);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "No fue posible restablecer la contraseña.",
      },
      {
        status: 400,
      }
    );
  }
}