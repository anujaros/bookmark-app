'use client'

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { BookmarkCard } from "./BookmarkCard"

type Bookmark = {
    id: string,
    title: string,
    url: string,
    created_at: string,
    description?: string | null
    image_url?: string | null
    favicon_url?: string | null

}

export function BookmarkList({initialBookmarks}: { initialBookmarks: Bookmark[]}) {
    const [ bookmarks, setBookmarks ] = useState(initialBookmarks)
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel('bookmark-modifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmark_data'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((current) => [payload.new as Bookmark, ...current])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((current) => current.filter((b) => b.id !== payload.old.id))
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((current) => current.map((b) => (b.id === payload.new.id ? payload.new as Bookmark : b)))
                    }
                }
            )
            .subscribe()

            return () => {
                supabase.removeChannel(channel)
            }
    },[])


    return (
        <div>
            <p className="text-sm text-gray-500 mb-4">
                {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </p>

            {bookmarks.length ===0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">No Bookmarks yet</p>
                    <p className="text-sm text-gray-400 mt-1">Add your first bookmark to get started!</p>
                </div>
            ): (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {bookmarks.map((bookmark) => (
                        <BookmarkCard key={bookmark.id} {...bookmark}/>
                    ))}
                </div>
            )}
        </div>
    )
}