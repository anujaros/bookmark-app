import { createClientForServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = await createClientForServer();
  const { data: {user}} = await supabase.auth.getUser();

  if (user) redirect('/dashboard')
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to Bookmark App</h1>
      <p className="mb-6 text-lg max-w-xl text-center">
        Save and organize your bookmarks easily. Sign in to get started!
      </p>
      <a
        href="/auth"
        className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Sign In
      </a>
    </main>
  )
}
