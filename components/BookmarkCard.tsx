'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2, ExternalLink, Edit2, X, Check } from 'lucide-react'
import { deleteBookmark, updateBookmark  } from '@/lib/actions/bookmark'

type BookmarkCardProps = {
  id: string
  title: string
  url: string
  description?: string | null
  image_url?: string | null
  favicon_url?: string | null
  created_at: string
}

// Helper function to format date consistently
function formatDate(dateString: string) {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

export function BookmarkCard({
  id,
  title,
  url,
  description,
  image_url,
  favicon_url,
  created_at,
}: BookmarkCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editUrl, setEditUrl] = useState(url)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return

    setLoading(true)
    const result = await deleteBookmark(id)
    if (result.error) {
      alert(result.error)
    }
    setLoading(false)
  }

  const handleUpdate = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('title', editTitle)
    formData.append('url', editUrl)

    const result = await updateBookmark(id, formData)

    if (result.error) {
      alert(result.error)
    } else {
      setIsEditing(false)
    }
    setLoading(false)
  }

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="group relative bg-black border-2 border-purple-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-purple-400 transition-all duration-200">

      {image_url && (
        <div className="relative w-full h-32 bg-linear-to-br from-purple-100 to-blue-100">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}


      <div className="p-3">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1.5 border-2 border-purple-200 rounded text-sm"
              placeholder="Title"
            />
            <input
              type="url"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              className="w-full px-2 py-1.5 border-2 border-purple-200 rounded text-sm"
              placeholder="URL"
            />
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                <Check size={16} />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {title}
            </h3>


            {description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {description}
              </p>
            )}


            <div className="flex items-center gap-2 mb-4">
              {favicon_url && (
                <Image
                  src={favicon_url}
                  alt=""
                  width={14}
                  height={14}
                  className="rounded"
                  unoptimized
                />
              )}
              <span className="text-xs text-gray-500 truncate">
                {getDomain(url)}
              </span>
            </div>


            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center  gap-1.5 px-3 py-1.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-xs font-semibold shadow-md hover:shadow-lg"
                >
                <ExternalLink size={16} />
                Visit
              </a>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 border border-purple-300 text-purple-600 rounded hover:bg-blue-50 transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>


      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-md backdrop-blur-sm font-medium">
        {/* {new Date(created_at).toLocaleDateString()} */}
        {formatDate(created_at)}
      </div>
    </div>
  )
}