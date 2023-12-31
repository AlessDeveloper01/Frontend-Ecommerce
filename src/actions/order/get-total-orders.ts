'use server'

import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';

export const getTotalOrders = async () => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        redirect('/orders');
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            },
        }
    });

    return {
        ok: true,
        orders
    };

};