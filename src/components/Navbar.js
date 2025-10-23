"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav
      className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur bg-white/70 dark:bg-gray-900/70 text-gray-900 dark:text-gray-100"
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
          >
            <div className="w-9 h-9 bg-cyan-600 rounded-full grid place-items-center text-white font-bold">
              DJ
            </div>
            <span className="text-lg font-bold tracking-tight">DevJobs</span>
          </Link>

          {/* Nav links */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-3">
            <Link
              href="/jobs"
              className="px-3 py-2 rounded hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              prefetch
            >
              Jobs
            </Link>
            <Link
              href="/jobs/create"
              className="px-3 py-2 rounded hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
              prefetch
            >
              Post Job
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              prefetch
            >
              Dashboard
            </Link>
          </div>

          {/* Auth actions */}
          <div className="flex items-center gap-2">
            {loading ? (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Loading…
              </span>
            ) : session ? (
              <div className="flex items-center gap-3">
                {/* Optional avatar button stub; replace with your menu */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-white grid place-items-center text-xs font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden md:inline text-sm">
                    {session.user?.name || "Account"}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-3 py-2 text-sm font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Login
              </button>
            )}

            {/* Mobile menu placeholder (optional expand later) */}
            <div className="sm:hidden">
              {/* Replace with a real disclosure/drawer if needed */}
              <details className="group">
                <summary className="list-none inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-gray-100/60 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </summary>
                <div className="absolute right-4 mt-2 min-w-[200px] rounded-md border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900 shadow-md p-2">
                  <Link
                    href="/jobs"
                    className="block px-3 py-2 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                  >
                    Jobs
                  </Link>
                  <Link
                    href="/jobs/create"
                    className="block px-3 py-2 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                  >
                    Post Job
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                  >
                    Dashboard
                  </Link>
                  {session ? (
                    <button
                      onClick={() => signOut()}
                      className="mt-1 w-full text-left px-3 py-2 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="mt-1 w-full text-left px-3 py-2 rounded hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    >
                      Login
                    </button>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
