import { NextResponse } from "next/server";
import { login } from "@/app/controllers/auth";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await login(body);

    return NextResponse.json(
      {
        success: true,
        ...result,
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
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}