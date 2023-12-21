import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCarSportOutline, IoCardOutline, IoCartOutline } from "react-icons/io5";

const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    params: {
        id: string;
    };
}

export default function OrderPage({ params }: Props) {
    const { id } = params;

    // TODO: Verificar
    // Redirect

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <div
                            className={clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    "bg-green-700": true,
                                    "bg-red-500": false,
                                }
                            )}>
                            <IoCardOutline size={30} />
                            <span className="mx-2">Pagado</span>
                        </div>

                        {/* Items */}
                        {productInCart.map((product) => (
                            <div key={product.slug} className="flex mb-5">
                                <Image
                                    src={`/products/${product.images[0]}`}
                                    alt={product.title}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}
                                    className="mr-5 rounded"
                                />

                                <div>
                                    <p>{product.title}</p>
                                    <p>{product.price} x 3</p>
                                    <p className="font-bold">
                                        Subtotal: $ {product.price * 3}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Aless Developer</p>
                            <p>Calle 123</p>
                            <p>Colonia 123</p>
                            <p>Estado De MX</p>
                            <p>CP 12345</p>
                            <p>123123123</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen de la orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">3 Articulos</span>

                            <span>Subtotal</span>
                            <span className="text-right">100</span>

                            <span>Impuestos (10%)</span>
                            <span className="text-right">10</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">$ 110</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            <div
                                className={clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        "bg-green-700": true,
                                        "bg-red-500": false,
                                    }
                                )}>
                                <IoCardOutline size={30} />
                                <span className="mx-2">Pagado</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
