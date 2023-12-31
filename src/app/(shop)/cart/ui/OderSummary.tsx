"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { CurrencyFormat } from "@/utils";


export const OderSummary = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const { subTotal, itemsInCart, total, tax } = useCartStore(state => state.getSummaryInformation())

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) return <p>Espere</p>;

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 Articulo' : `${itemsInCart} Articulos`} </span>

            <span>Subtotal</span>
            <span className="text-right">{CurrencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{CurrencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{CurrencyFormat(total)}</span>
        </div>
    );
};
