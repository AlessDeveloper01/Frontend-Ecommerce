import { getOrderById } from "@/actions";
import { OrderStatus, PaypalBtn, QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCarSportOutline, IoCardOutline, IoCartOutline } from "react-icons/io5";
import { CurrencyFormat } from "@/utils";

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

export default async function OrderPage({ params }: Props) {
    const { id } = params;

    // TODO: Verificar
    // Redirect

    const { order, ok } = await getOrderById(id);

    if (!ok) {
        redirect("/");
        return;
    }

    const addressOr = order?.OrderAddress;

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id.split("-").at(-1)}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <OrderStatus isPaid={order?.isPaid ?? false} />

                        {/* Items */}
                        {order?.OrderItem.map((item) => (
                            <div
                                key={item.product.slug + "-" + item.size}
                                className="flex mb-5">
                                <Image
                                    src={`/products/${item.product.ProductImage[0].url}`}
                                    alt={item.product.title}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                    }}
                                    className="mr-5 rounded"
                                />

                                <div>
                                    <p>{item.product.title}</p>
                                    <p>{item.price} x 3</p>
                                    <p className="font-bold">
                                        Subtotal: $ {item.price * item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">
                                {addressOr?.firstName} {addressOr?.lastName}
                            </p>
                            <p>{addressOr?.address}</p>
                            <p>{addressOr?.address2}</p>
                            <p>{addressOr?.postalCode}</p>
                            <p>
                                {addressOr?.city}, {addressOr?.countryId}
                            </p>
                            <p>{addressOr?.phone}</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen de la orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">
                                {order?.itemsInOrder === 1
                                    ? "1 artículo"
                                    : `${order?.itemsInOrder} artículos`}
                            </span>

                            <span>Subtotal</span>
                            <span className="text-right">
                                {CurrencyFormat(order!.subTotal)}
                            </span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">
                                {CurrencyFormat(order!.tax)}
                            </span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">
                                {CurrencyFormat(order!.total)}
                            </span>
                        </div>

                        <div className="mt-5 mb-2 w-full">

                            {
                                order?.isPaid ? (
                                    <OrderStatus isPaid={order?.isPaid ?? false} />
                                ): (
                                    <PaypalBtn orderId={order!.id} amount={order!.total} />
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
