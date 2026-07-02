import { dblocal } from "@/services/database/db";

export async function getCantidadInscritos() {

    const result = await dblocal.query(`
        SELECT COUNT(*)::int AS total
        FROM taller_cpci.inscripciones
        WHERE estado IN ('PENDIENTE','ACTIVO');
    `);

    return result.rows[0].total;

}