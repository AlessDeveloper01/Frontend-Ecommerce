
'use server'

import bcryptjs from 'bcryptjs';
import prisma from "@/lib/prisma";

export const registerUser = async (name: string, email: string, password: string) => {


    try {
        
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password, 10)
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        return {
            ok: true,
            user,
            msg: 'Usuario creado correctamente'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'No se pudo registrar el usuario'
        }
    }

}