'use client';

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    currentPage: number;
    totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPageNumber = Number(searchParams.get('page')) || 1;
    
    const allPages = generatePagination(currentPage, totalPages);

    const createPageUrl = (pageNumber: string | number) => {
        const params = new URLSearchParams(searchParams);
        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }

        if (+pageNumber <= 0) {
            return `${pathname}`;
        }

        if (+pathname > totalPages) {
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className="flex text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link
                            href={createPageUrl(currentPageNumber - 1)}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>
                    {
                        allPages.map((page, index) => {
                            return (
                                <li className="page-item" key={page + "-" + index}>
                                    <Link
                                        className={clsx(
                                            "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                "bg-blue-500 shadow-sm text-white hover:bg-blue-700 hover:text-white": currentPageNumber === page
                                            }
                                        )}
                                        href={createPageUrl(page)}>
                                        {page}
                                    </Link>
                                </li>
                            );
                        })
                    }
                    <li className="page-item">
                        <Link
                            href={createPageUrl(currentPageNumber + 1)}
                            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
