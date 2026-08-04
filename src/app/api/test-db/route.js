import { NextResponse } from "next/server";
import { dblocal } from "@/services/database/db";

export async function GET() {
    try {
        const result = await dblocal.query("SELECT NOW()");
        return NextResponse.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: e.message },
            { status: 500 }
        );
    }
}