import AuthForm from "@/components/AuthForm";
import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
    return (
        <div className="min-h-screen  bg-blue-950bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>


                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Bookmark className="text-white" size={24} />
                    </div>
                    <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Bookmarxx
                    </span>
                </Link>


                <div className="bg-blue-950 text-center rounded-2xl shadow-2xl border-2 border-purple-700 p-8">
                    <AuthForm />
                </div>




                <p className="text-center text-xs text-gray-500 mt-4">
                    By continuing, you agree to our{" "}
                    <a href="#" className="underline hover:text-gray-700 font-medium">
                        Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-gray-700 font-medium">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Page