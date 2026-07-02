import {
    getCantidadInscritos,
} from "@/services/users/users_queries";

export async function contadorInscritos() {

    const total =
        await getCantidadInscritos();

    return {
        total,
    };

}