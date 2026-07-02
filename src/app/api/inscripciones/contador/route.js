import { NextResponse } from "next/server";

import {
    contadorInscritos,
} from "@/app/controllers/users";

export async function GET() {

    const data =
        await contadorInscritos();

    return NextResponse.json(data);

}