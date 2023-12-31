'use server'

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {

    const authToken = await getPaypalBearerToken();
    if (!authToken) {
        return {
            ok: false,
            message: 'No se pudo obtener el token de autenticación'
        }
    }

    const paypalResponse = await verifyPaypalPayment(transactionId, authToken);

    if (!paypalResponse) {
        return {
            ok: false,
            message: 'No se pudo obtener la información de la transacción'
        }
    }

    const { status, purchase_units } = paypalResponse;
    const { invoice_id  } = purchase_units[0];
    if(status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'El pago no ha sido completado'
        }
    }

    try {
        
        await prisma.order.update({
            where: {
                id: invoice_id,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        });

        revalidatePath(`/order/${invoice_id}`)

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo verificar el pago'
        }
    }
}
 
const getPaypalBearerToken = async (): Promise<string|null> => {

    const base64Token = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const reult = await fetch((process.env.PAYPAL_OAUTH_URL || ''), {
            ...requestOptions,
            cache: 'no-store',
        }).then(response => response.json());
        return reult.access_token;
    } catch (error) {
        console.log(error);
        return null;
    }
}
 
const verifyPaypalPayment = async (transactionId: string, authToken: string): Promise<PaypalOrderStatusResponse|null> => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const paypalUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    try {
        const resp = await fetch(paypalUrl, {
            ...requestOptions,
            cache: 'no-store',
        }).then(response => response.json());
        return resp;
    } catch (error) {
        console.log(error);
        return null;
    }
}