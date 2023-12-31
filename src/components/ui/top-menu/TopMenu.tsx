"use client";

import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useCartStore, useUIStore } from "@/store";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const TopMenu = () => {
    const openMenu = useUIStore((state) => state.openSideMenu);
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
    }, [])

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            <div>
                <Link href="/">
                    <span
                        className={` ${titleFont.className} antialiased font-bold `}>
                        Teslo
                    </span>
                    <span> | shop </span>
                </Link>
            </div>

            <div className="hidden sm:block">
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/men">
                    Hombres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/women">
                    Mujeres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/kid">
                    Niños
                </Link>
            </div>

            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>

                <Link
                    href={totalItemsInCart === 0 ? "/empty" : "/cart"}
                    className="mx-2">
                    <div className="relative">
                        {loading && totalItemsInCart > 0 && (
                            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                {totalItemsInCart}
                            </span>
                        )}
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    onClick={() => {
                        openMenu();
                    }}>
                    Menu
                </button>
            </div>
        </nav>
    );
};

export { TopMenu };
