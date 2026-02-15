import { createClientForServer } from "@/lib/supabase/server"
import { ArrowRight, Bookmark, Globe, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const supabase = await createClientForServer();
  const { data: {user}} = await supabase.auth.getUser();

  if (user) redirect('/dashboard')
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-700 via-black to-purple-400">

      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bookmark className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">Bookmarxx</span>
        </Link>
        {/* <Link
          href="/auth"
          className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
        >
          Sign In
        </Link> */}
      </nav>


      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
            <Zap size={16} />
            Save, Organize, Access Anywhere
          </div>


          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Your Bookmarks,
            <br />
            Beautifully Organized
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop losing track of important links. Save, organize, and access your favorite websites with beautiful previews and instant search.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth"
              className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Get Started For Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>


          <p className="text-sm text-gray-500 mt-8">
            🔒 Your data stays private
          </p>
        </div>

      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-gray-600 text-lg">Powerful features to manage your bookmarks</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-linear-to-br from-blue-500 via-black to-indigo-500 rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Beautiful Previews</h3>
            <p className="text-gray-600">
              Automatically fetch images, titles, and descriptions from any URL. Your bookmarks look amazing.
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-500 via-black to-indigo-500 rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Sync</h3>
            <p className="text-gray-600">
              Your bookmarks update instantly across all your devices. Always in sync, always available.
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-500 via-black to-indigo-500 rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is encrypted and secure. Only you can access your bookmarks. Privacy first.
            </p>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 py-20">
        <div className="bg-linear-to-r from-blue-400 via-black to-indigo-400 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to get organized?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who save time with beautiful bookmarks.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-lg"
          >
            Start Bookmarking Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 border-t border-gray-200">
        <p>&copy; 2026 Bookmarxx. Built with Next.js & Supabase.</p>
      </footer>
    </main>
  )
}
