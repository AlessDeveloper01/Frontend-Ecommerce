import React from "react";
import Link from "next/link";
import {
    IoPeopleOutline,
    IoShirtOutline,
    IoTicketOutline,
} from "react-icons/io5";
import {useUIStore} from '@/store';

export const SideBarAdmin = () => {
    
    const closeMenu = useUIStore((state) => state.closeSideMenu);
    return (
        <>
            <Link
                href="/admin/products"
                onClick={() => {
                    closeMenu();
                }}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
                href="/admin/orders"
                onClick={() => {
                    closeMenu();
                }}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
                href="/admin/users"
                onClick={() => {
                    closeMenu();
                }}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Users</span>
            </Link>
        </>
    );
};
