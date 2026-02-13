import { signOut } from "@/lib/actions/auth";
import { createClientForServer } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClientForServer();
  const session = await supabase.auth.getUser();

  if (!session.data.user)
    return null

    const {
      data: {
        user: {user_metadata, app_metadata},
      },
    } = session
    const { name,email, user_name, avatar_url} =  user_metadata
    const userName = user_name ? `@${user_name}` : 'User Name Not Set'

  console.log(session);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 ">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-xl">User Name: {userName}</p>
      <p>Email: {email}</p>
      <form >
        <button formAction={signOut} className="px-6 py-3 text-black transition duration-100 bg-white border-2 border-black hover:bg-black hover:text-white">
          Sign Out
        </button>
      </form>
    </div>
  );
}
