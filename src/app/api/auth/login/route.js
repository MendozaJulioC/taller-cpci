// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { login } from "@/app/controllers/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await login(body);

    console.log('🔐 Login response:', result);

    return NextResponse.json(
      {
        success: true,
        token: result.token,
        usuario: result.usuario,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('❌ Error en login:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}