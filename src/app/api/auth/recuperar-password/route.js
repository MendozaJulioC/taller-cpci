import { NextResponse } from "next/server";

import { recuperarPassword } from "@/app/controllers/auth/recuperacionController";

export async function POST(req) {

  try {

    const body = await req.json();

    const result =
      await recuperarPassword(body);

    return NextResponse.json(result);

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );

  }

}