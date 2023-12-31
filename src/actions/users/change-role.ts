'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const changeRole = async (id: string, role: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        redirect('/');
    }

    try {
        
        const newRole = role === 'admin' ? 'admin' : 'user';

        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                role: newRole
            }
        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            user
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: 'Error al cambiar el rol del usuario'
        }
    }

 }