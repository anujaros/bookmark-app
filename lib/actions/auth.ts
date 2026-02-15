'use server'

import { redirect } from "next/navigation"
import { createClientForServer } from "../supabase/server"
import { Provider } from "@supabase/supabase-js"

const signInWith = (provider: Provider) => async() => {
    const supabase = await createClientForServer()

    const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: auth_callback_url,
        },
    })

     if (error) {
        console.error(error);
        throw new Error("OAuth sign-in failed")
    }

    if (!data?.url) {
        throw new Error("No redirect URL returned from Supabase")
    }
    redirect(data.url)
}

const signInWithGoogle = signInWith('google')

const signOut = async() => {
    const supabase = await createClientForServer()
    await supabase.auth.signOut()
    redirect("/")
}

export { signInWithGoogle, signOut}