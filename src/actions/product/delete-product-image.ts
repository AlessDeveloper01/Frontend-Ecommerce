'use server'

import prisma from '@/lib/prisma';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' )

export const deleteProductImage = async (imageUrl: string, imageId: number) => {

    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'No se pueden eliminar imagenes que no esten en el servidor'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''
    
    try {

        await cloudinary.uploader.destroy(`teslo/${imageName}`)

        const deleatedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        //* revalidar paths
        revalidatePath('/admin/products')
        revalidatePath(`/admin/products/${deleatedImage.product.slug}`)
        revalidatePath(`/products/${deleatedImage.product.slug}`)
        revalidatePath(`/products`)


        return {
            ok: true,
            message: 'Imagen eliminada correctamente'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }

 }