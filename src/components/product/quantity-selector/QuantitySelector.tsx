'use client'

interface Props {
    quantity: number;

    onQuantityChange?: (quantity: number) => void;
}

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

    // const [quantityState, setQuantityState] = useState(quantity);

    if (quantity < 1) onQuantityChange?.(1);

    return (
        <div className="flex items-center">
            <button
                onClick={() => onQuantityChange?.(quantity - 1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity}</span>
            <button
                onClick={() => onQuantityChange?.(quantity + 1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    );
};
