'use client'
import { addBookmark } from "@/lib/actions/bookmark"
import { Plus } from "lucide-react"
import { useRef, useState } from "react"


export function InsertBookmark() {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault() // ✅ Prevent default form submission

        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)

        console.log('Submitting:', {
        title: formData.get('title'),
        url: formData.get('url')
        })

        const result = await addBookmark(formData)

        console.log('Result:', result)

        if (result.error) {
        setError(result.error)
        } else {
        formRef.current?.reset()
        }

        setLoading(false)
    }



    return(
        <div className="bg-black rounded-2xl shadow-xl border-2 border-purple-300 p-8">

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block mb-2 font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Bookmark Name"
                    required
                    className="w-full text-white bg-black px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                />
            </div>
            <div>
                <label htmlFor="url" className="block mb-2 font-semibold  bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                    URL
                </label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    required
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 border-2 bg-black text-white border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                //     style={{
                //     WebkitTextFillColor: 'white',
                //     WebkitBoxShadow: '0 0 0px 1000px black inset'
                // }}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"            >
                <Plus size={20} />
                    {loading ? 'Adding...' : 'Add Bookmark'}
            </button>
        </form>
        {loading && (
                <p className="text-sm text-center text-purple-600 mt-4 font-medium animate-pulse">
                     Fetching preview...
                </p>
            )}
        </div>
    )
}