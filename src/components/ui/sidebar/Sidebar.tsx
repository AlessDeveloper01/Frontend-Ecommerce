"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline,
} from "react-icons/io5";
import { SideBarAdmin } from "./sidebar-admin/SideBarAdmin";

export const Sidebar = () => {
    const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
    const closeMenu = useUIStore((state) => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    return (
        <div>
            {/* Background Black */}

            {isSideMenuOpen && [
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10"
                    key="bblack"
                />,
            ]}

            {isSideMenuOpen && [
                <div
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    key="bblur"
                />,
            ]}

            {/* BLUR */}
            <nav
                className={clsx(
                    "bg-white fixed p-5 right-0 top-0 h-screen z-20 shadow-2xl transform transition-all duration-300 w-[500px]",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )}>
                <IoCloseOutline
                    className="absolute top-5 right-5 cursor-pointer"
                    size={50}
                    onClick={() => {
                        closeMenu();
                    }}
                />

                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {isAuthenticated && (
                    <>
                        <Link
                            href="/profile"
                            onClick={() => {
                                closeMenu();
                            }}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoPersonOutline size={30} />
                            <span className="ml-3 text-xl">Profile</span>
                        </Link>

                        <Link
                            href="/orders"
                            onClick={() => {
                                closeMenu();
                            }}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Orders</span>
                        </Link>
                        <Link
                            href="/"
                            onClick={() => {
                                logout();
                                closeMenu();
                                window.location.replace("/");
                            }}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                            <IoLogOutOutline size={30} />
                            <span className="ml-3 text-xl">Logout</span>
                        </Link>
                    </>
                )}

                {!isAuthenticated && (
                    <Link
                        href="/auth/login"
                        onClick={() => {
                            closeMenu();
                        }}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoLogInOutline size={30} />
                        <span className="ml-3 text-xl">Login</span>
                    </Link>
                )}

                {session?.user.role === "admin" && (
                    <>
                        <div className="w-full h-px bg-gray-200 my-10" />
                        <SideBarAdmin />
                    </>
                )}
            </nav>
        </div>
    );
};
