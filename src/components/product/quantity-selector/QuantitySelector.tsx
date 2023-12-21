'use client'

interface Props {
    quantity: number;
}

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export const QuantitySelector = ({ quantity }: Props) => {

    const [quantityState, setQuantityState] = useState(quantity);

    const handleQuantityChange = ( value: number ) => {
        if (quantityState + value < 1) return;
        setQuantityState(quantityState + value);
    }

    return (
        <div className="flex items-center">
            <button
                onClick={() => handleQuantityChange(-1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantityState}</span>
            <button
                onClick={() => handleQuantityChange(+1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    );
};
