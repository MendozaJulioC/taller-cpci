import { NextResponse } from "next/server";
import { verificarToken } from "@/utils/jwt";
import { getUserById } from "@/services/auth/auth_queries";

export async function GET(req) {

    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { message: "Token requerido" },
                { status: 401 }
            );
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = verificarToken(token);

        const usuario = await getUserById(decoded.id);

        if (!usuario) {

            return NextResponse.json(
                { message: "Usuario no encontrado" },
                { status: 404 }
            );

        }

        return NextResponse.json({usuario});

    } catch {

        return NextResponse.json(
            { message: "Token inválido" },
            { status: 401 }
        );

    }

}