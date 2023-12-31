export const revalidate = 60; // 60 seconds

import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";
import { getPaginatedProductsWithImages } from '@/actions';
import { redirect } from "next/navigation";

const seedProductos = initialData.products;

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    // if (id === 'kids') {
    //   notFound();
    // }

    const labels: Record<string, string> = {
        men: "Hombres",
        women: "Mujeres",
        kid: "Niños",
        unisex: "Para Todos",
    };

    return (
        <>
            <Title
                title={`Artculos de: ${labels[gender]}`}
                subtitle={`Encuentra los mejores productos en Teslo | Shop`}
                className="mb-2"
            />

            <ProductGrid products={products} />

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </>
    );
}
