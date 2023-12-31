"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { IoTrashBinOutline } from "react-icons/io5";
import { login, registerUser } from "@/actions";

type FormInputs = {
    name: string;
    email: string;
    password: string;
};

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    
    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('')
        const { name, email, password } = data;

        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.msg)
            return;
        }

        await login(email.toLowerCase(), password);

        window.location.href = "/";
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {(errorMessage) && (
                <>
                    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center justify-center w-12 bg-red-500">
                            <IoTrashBinOutline size={30} />
                        </div>
                    
                        <div className="px-4 py-2 -mx-3">
                            <div className="mx-3">
                                <span className="font-semibold text-red-500 dark:text-red-400">
                                    Error
                                </span>
                                <p className="text-sm text-gray-600 dark:text-gray-200">
                                    {
                                        errorMessage
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <label htmlFor="email">Nombre</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                    "border-red-500": errors.name,
                })}
                type="text"
                {...register("name", { required: true })}
                autoFocus
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                    "border-red-500": errors.email,
                })}
                type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
            />

            <label htmlFor="email">Contraseña</label>
            <input
                className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                    "border-red-500": errors.password,
                })}
                type="password"
                {...register("password", { required: true, minLength: 6 })}
            />

            <button className="btn-primary">Crear</button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/login" className="btn-secondary text-center">
                Ingresar
            </Link>
        </form>
    );
};
