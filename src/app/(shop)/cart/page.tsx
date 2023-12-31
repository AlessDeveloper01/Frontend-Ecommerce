import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCarSportOutline, IoCartOutline } from "react-icons/io5";
import { ProductsInCart } from "./ui/ProductCart";
import { useEffect, useState } from "react";
import {OderSummary} from './ui/OderSummary';

const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CartPage() {
    

    // redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agrega Mas Items</span>
                        <Link href="/" className="underline mb-5">
                            Continua Comprando
                        </Link>

                        {/* Items */}
                        <ProductsInCart />
                    </div>

                    {/* Total */}
                    <div className="bg-white rounded-xl shadow-xl p-7 right-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de la orden</h2>

                        <OderSummary />

                        <div className="mt-5 mb-2 w-full">
                            <Link
                                href="/checkout/address"
                                className="flex btn-primary text-center justify-between items-center">
                                <span>Checkout</span>
                                <IoCarSportOutline size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
