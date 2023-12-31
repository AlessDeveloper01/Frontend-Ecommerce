// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, SelectImage, Title } from "@/components";
import { CurrencyFormat } from "@/utils";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    searchParams: {
        page?: string;
    };
}

export default async function OrdersPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, currentPage, totalPages } =
        await getPaginatedProductsWithImages({ page });

    return (
        <>
            <Title title="Mantenimiento de Productos" />

            <div className="flex justify-end mb-5">
                <Link href="/admin/products/new" className="bg-green-500 hover:bg-green-600 text-white font-light py-2 px-4 rounded inline-flex items-center">
                        <span>Nuevo Producto</span>
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Titulo
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Genero
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Inventario
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link href={`/product/${product.slug}`}>
                                        <SelectImage
                                            src={product.ProductImage[0]?.url}
                                            alt={product.title}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <Link href={`/admin/products/${product.slug}`}>
                                        <span className="hover:underline">
                                            {product.title}
                                        </span>
                                    </Link>
                                </td>
                                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {CurrencyFormat(product.price)}
                                </td>
                                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {product.gender}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    {product.inStock}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    {product.sizes.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </>
    );
}
