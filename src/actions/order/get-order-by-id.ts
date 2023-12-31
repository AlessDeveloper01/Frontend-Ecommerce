'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"


export const getOrderById = async (id: string) => {

    const session = await auth();

    if (!session?.user) throw new Error("You must be logged in to perform this action");

    try {

        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!order) throw new Error("Order not found");
        
        if (session.user.role === 'user') {
            if (order.userId !== session.user.id) throw new Error("You are not authorized to perform this action");
        }

        return {
            ok: true,
            order
        }
        
    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            error: error?.message
        }
    }

 }