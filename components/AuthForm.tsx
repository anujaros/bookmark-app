'use client'
import { signInWithGoogle } from "@/lib/actions/auth";
import React from "react";
const AuthForm = () => {
    return (
        <div className="">
            <form >
                <button
                    className="px-6 py-3 text-black transition duration-100 bg-white border-2 border-black hover:bg-black hover:text-white"
                    formAction={signInWithGoogle}
                >
                    Sign in With Google
                </button>
            </form>
        </div>
    )
}

export default AuthForm;