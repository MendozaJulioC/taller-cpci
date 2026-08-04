import { NextResponse } from "next/server";
import { verificarToken } from "@/utils/jwt";
import { getUserById } from "@/services/auth/auth_queries";

export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);

        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(
                new URL("/?error=token_missing", req.url)
            );
        }

        const decoded = verificarToken(token);

        if (!decoded?.id) {
            return NextResponse.redirect(
                new URL("/?error=token_invalid", req.url)
            );
        }

        const usuario = await getUserById(decoded.id);

        if (!usuario) {
            return NextResponse.redirect(
                new URL("/?error=user_not_found", req.url)
            );
        }

        if (
            usuario.estado !== "ACTIVO" &&
            usuario.estado !== "PENDIENTE"
        ) {
            return NextResponse.redirect(
                new URL("/?error=unauthorized", req.url)
            );
        }

        return NextResponse.redirect(
            new URL(
                `/auth/autologin-success?token=${token}`,
                req.url
            )
        );

    } catch (error) {

        console.error(error);

        return NextResponse.redirect(
            new URL("/?error=server_error", req.url)
        );

    }

}