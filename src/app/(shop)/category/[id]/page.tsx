import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProductos = initialData.products;

interface Props {
    params: {
        id: Category;
    };
}

export default function CategoryPage({ params }: Props) {
    const { id } = params;

    // if (id === 'kids') {
    //   notFound();
    // }

    const products = seedProductos.filter((product) => product.gender === id);

    const labels: Record<Category, string> = {
        men: "Hombres",
        women: "Mujeres",
        kid: "Niños",
        unisex: "Para Todos",
    };

    return (
        <>
            <Title
                title={`Artculos de: ${labels[id]}`}
                subtitle={`Encuentra los mejores productos en Teslo | Shop`}
                className="mb-2"
            />

            <ProductGrid products={products} />
        </>
    );
}
