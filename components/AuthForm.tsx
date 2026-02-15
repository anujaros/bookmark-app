'use client'
import { signInWithGoogle } from "@/lib/actions/auth";
import React from "react";
const AuthForm = () => {
    return (
            <form >
                <button
                    className="px-6 py-3  text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl font-semibold text-lg"
                    formAction={signInWithGoogle}
                >
                    Sign in With Google
                </button>
            </form>
    )
}

export default AuthForm;