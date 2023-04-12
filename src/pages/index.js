import auth from "@component/firebase.inig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const [isProfile, setIsProfile] = useState(false);
  return (
    <main>
      <div className="flex justify-end py-6 px-6 gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsProfile(!isProfile)}
              type="button"
              className="uppercase px-6 py-1 rounded hover:bg-blue-700/30 duration-200 font-bold border-2 border-black dark:border-white"
            >
              {user?.displayName}
            </button>
            {isProfile && (
              <>
                <div
                  onClick={() => setIsProfile(false)}
                  className="fixed w-full h-screen left-0 top-0"
                />
                <div className="absolute dark:bg-black w-48 top-10 rounded-xl -left-8 border h-max flex flex-col items-center border-black dark:border-white">
                  <div className="w-16 h-16 border-2 rounded-full mt-4 flex items-center justify-center border-black dark:border-white">
                    <img
                      src={
                        user?.photoURL ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt=""
                      className="h-14 object-cover object-center w-14 rounded-full"
                    />
                  </div>
                  <h1 className="uppercase font-bold mt-2">
                    {user?.displayName}
                  </h1>
                  <p className="italic text-sm opacity-80">{user?.email}</p>
                  <button
                    type="button"
                    onClick={() => signOut(auth)}
                    className="w-full border-t py-2 mt-4 hover:bg-red-700/40 rounded-b-xl border-black dark:border-white"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="uppercase border px-6 py-1 rounded hover:bg-blue-700/30 duration-200 border-black dark:border-white"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="uppercase border px-6 py-1 rounded hover:bg-sky-900/60 duration-200 border-black dark:border-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
      <div className="flex min-h-[90vh] flex-col items-center justify-center gap-4">
        {user ? (
          <>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
              <h1 className="lg:text-5xl text-4xl font-bold uppercase">Hello World</h1>
            </div>
            <div>
              <button
                type="button"
                onClick={() => signOut(auth)}
                className="mt-20 border-black dark:border-white border rounded px-8 py-2 hover:bg-red-700/40"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
              <h1 className="lg:text-5xl text-4xl font-bold uppercase">
                A Simple React App
              </h1>
            </div>
            <p className="text-sm font-light">
              Create with Next.JS and Tailwind CSS
            </p>
            <p className="">
              To see the content please{" "}
              <Link
                href="/login"
                className="underline text-blue-400 font-medium"
              >
                Login
              </Link>{" "}
              first.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
