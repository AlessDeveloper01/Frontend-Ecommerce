export const revalidate = 60 * 60 * 24 * 7; // 1 week

import { getProductBySlug } from "@/actions";
import {
    QuantitySelector,
    SizeSelector,
    ProductSlideshow,
    ProductSlideshowMB,
    StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = params.slug

    const product = await getProductBySlug(slug)

    return {
        title: product?.title ?? "Producto no encontrado",
        description: product?.description ?? "",
        openGraph: {
            title: product?.title ?? "Producto no encontrado",
            description: product?.description ?? "",
            images: [`/products/${product?.images[1]}`],
        }
    };
}


export default async function ProductPage({ params }: Props) {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Slide Show */}
            <div className="col-span-1 md:col-span-2">
                <ProductSlideshowMB images={product.images} title={product.title} className="block md:hidden" />
                <ProductSlideshow images={product.images} title={product.title} className="hidden md:block" />
            </div>

            {/* Details */}
            <div className="col-span-1 px-5">
                
                <StockLabel slug={product.slug} />

                <h1
                    className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">$ {product.price}</p>

               <AddToCart product={product} />

                {/* Descripticon */}
                <h3 className="font-bold text-sm">Descripcion:</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}
