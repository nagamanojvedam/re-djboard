"use client";

import Link from "next/link";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const darkMode = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(darkMode ? "light" : "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top bar (nav merged) */}
      <div className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur bg-white/70 dark:bg-gray-900/70">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              aria-label="DJ-Board home"
            >
              <div className="w-10 h-10 bg-cyan-600 rounded-full grid place-items-center text-white font-bold">
                DJ
              </div>
              <span className="text-xl font-bold tracking-tight">DJ-Board</span>
            </Link>

            {/* Primary nav */}
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

            {/* Right actions: theme toggle + mobile menu */}
            <div className="flex items-center gap-2">
              {mounted && (
                <Switch
                  checked={darkMode}
                  onChange={toggleTheme}
                  aria-label="Toggle dark mode"
                  className={`${
                    darkMode ? "bg-cyan-600" : "bg-gray-300"
                  } relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900`}
                >
                  <span
                    className={`${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              )}

              {/* Mobile menu */}
              <div className="sm:hidden">
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
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
