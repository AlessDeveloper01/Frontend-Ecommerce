'use server'

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const PlaceOrderAc = async (productsCart: ProductOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) throw new Error('No se ha encontrado el usuario');

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsCart.map(p => p.productId)
            }
        }
    });

    const itemsInOrder = productsCart.reduce((count, p) => count + p.quantity, 0)

    const { subTotal, tax, total } = productsCart.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if (!product) throw new Error('No se ha encontrado el producto - 500');
        
        totals.subTotal += product.price * productQuantity;
        totals.tax += ((product.price * productQuantity) * 0.15);
        totals.total += ((product.price * productQuantity) * 1.15);

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 })


try {
     const prismaTransaction = await prisma.$transaction(async (tx) => {
        
        // * Actualizar el stock de los productos
        const updatedProducts = products.map(async (product) => {

            const productQuantity = productsCart.filter(p => p.productId === product.id).reduce((count, p) => count + p.quantity, 0);

            if (productQuantity === 0) {
                throw new Error(`${product.id} MNo tiene cantidad definida`);
            }

            return tx.product.update({
                where: {
                    id: product.id
                },
                data: {
                    inStock: {
                        decrement: productQuantity
                    }
                }
            })
        })

        const updatedProductsResult = await Promise.all(updatedProducts);

        // ? Verifica valores negativos
        updatedProductsResult.forEach((product) => {
            if (product.inStock < 0) {
                throw new Error(`No hay suficiente stock para ${product.title}`);
            }
        });

        // * Crear la orden (encabezado)
        const order = await tx.order.create({
            data: {
                userId,
                itemsInOrder,
                subTotal,
                tax,
                total,

                OrderItem: {
                    createMany: {
                        data: productsCart.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            size: item.size,
                            price: products.find(p => p.id === item.productId)?.price ?? 0
                        }))
                    }
                },
            }
        })

        // * Crear la dirección de envío
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                countryId: country,
                orderId: order.id,
            }
        })

        return {
            updatedProducts: updatedProductsResult,
            order: order,
            orderAddress: orderAddress,
        };
     })
    
    return {
        ok: true,
        order: prismaTransaction.order.id,
        prismaTransaction
    }
} catch (error:any) {
    return {
        ok: false,
        message: error?.message
    }
}

}