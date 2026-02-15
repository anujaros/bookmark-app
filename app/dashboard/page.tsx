import { BookmarkList } from "@/components/BookmarkList";
import { InsertBookmark } from "@/components/InsertBookmark";
import { signOut } from "@/lib/actions/auth";
import { createClientForServer } from "@/lib/supabase/server";
import { Bookmark } from "lucide-react";


export default async function Home() {
  const supabase = await createClientForServer();
  const session = await supabase.auth.getUser();

  if (!session.data.user)
    return null

    const { data: { user: {user_metadata,},} } = session
    const { name,email} =  user_metadata
    // const userName = user_name ? `@${user_name}` : 'User Name Not Set'

    //fetch initial bookmks
    const { data: bookmarks } = await supabase
      .from('bookmark_data')
      .select('*')
      .order('created_at', { ascending: false });

  console.log(session);
  return (
    <div className="min-h-screen bg-radient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8 bg-black p-6 rounded-2xl shadow-xl border-purple-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Bookmark className="text-white" size={24}/>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{name}</h1>
              <p className="text-gray-600 font-medium">{email}</p>
            </div>
          </div>
          <form>
            <button
              formAction={signOut}
              className= "flex items-center gap-2 px-6 py-3 text-white bg-linear-to-r from-blue-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              Sign Out
            </button>
          </form>
        </div>


        <div className="mb-8 max-w-2xl mx-auto">
          <InsertBookmark />
        </div>


        <div>
          <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Bookmarks</h2>
          <BookmarkList initialBookmarks={bookmarks || []} />
        </div>
      </div>
    </div>
  );
}
