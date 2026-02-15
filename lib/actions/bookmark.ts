'use server'

import { createClientForServer } from "../supabase/server"
import { revalidatePath } from "next/cache"
import { fetchUrlMetadata } from "../utils/fetch_metadata"

export async function addBookmark(formData: FormData) {
    const supabase = await createClientForServer()

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    const { data: {user} } = await supabase.auth.getUser()

    if(!user) {
        return { error: 'Not authenticated'}
    }

    const metadata = await fetchUrlMetadata(url)

    const { error } = await supabase
        .from('bookmark_data')
        .insert({
            title,
             url,
             user_id: user.id,
            description: metadata.description,
            image_url: metadata.image,
            favicon_url: metadata.favicon,
            })
            .select()

    if (error) {
        return {error: error.message}
    }

    revalidatePath('/dashboard')
    return { success: true}
}

export async function deleteBookmark(id: string ) {
    const supabase = await createClientForServer()

    const { data: { user } } = await supabase.auth.getUser()
     if (!user) {
        return { error: 'Not authenticated' }
    }

    const { error } = await supabase
        .from('bookmark_data')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}


export async function updateBookmark(id: string, formData: FormData) {
    const supabase = await createClientForServer()

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    const { data: { user } } = await supabase.auth.getUser()
     if (!user) {
        return { error: 'Not authenticated' }
    }

    const metadata = await fetchUrlMetadata(url)

    const { error } = await supabase
        .from('bookmark_data')
        .update({
            title,
            url,
            description: metadata.description,
            image_url: metadata.image,
            favicon_url: metadata.favicon,
        })
        .eq('id', id)
        .eq('user_id', user.id)

        if (error) {
            return { error: error.message}
        }

        revalidatePath('/dashboard')
        return { success: true}
}