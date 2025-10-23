"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Sample featured jobs (replace with DB data later)
const featuredJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Remote",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "TechSoft",
    location: "New York, USA",
  },
  {
    id: "3",
    title: "Fullstack Developer",
    company: "StartupX",
    location: "London, UK",
  },
  {
    id: "4",
    title: "React Developer",
    company: "CodeLabs",
    location: "Berlin, Germany",
  },
  {
    id: "5",
    title: "Node.js Engineer",
    company: "WebWorks",
    location: "Remote",
  },
];

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const darkMode = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(darkMode ? "light" : "dark");

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.6 },
      },
    }),
    [prefersReducedMotion]
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header (Hero) */}

      <main id="main">
        {/* Hero area (static content) */}
        <motion.section
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="relative text-center py-24 sm:py-28 md:py-32 bg-linear-to-r from-cyan-600 to-violet-600 text-white"
          aria-label="Hero"
        >
          <div className="mx-auto max-w-4xl px-4">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-sm ring-1 ring-white/30">
              Hiring fast
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Find Your Dream Developer Job
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl/8 opacity-90">
              Browse thousands of tech roles or post your next opening.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-md bg-white/95 text-gray-900 px-6 py-3 font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80"
                prefetch
              >
                Browse Jobs
              </Link>
              <Link
                href="/jobs/create"
                className="inline-flex items-center justify-center rounded-md border border-white/80 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80"
                prefetch
              >
                Post a Job
              </Link>
            </div>
          </div>

          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-2xl rounded-full bg-white/15 blur-3xl"></div>
          </div>
        </motion.section>

        {/* Featured Jobs */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl px-4 md:px-6 py-14 md:py-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Featured Jobs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </motion.section>

        {/* Highlights / Stats */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gray-100 dark:bg-gray-800/80 py-14 md:py-16"
        >
          <div className="mx-auto max-w-5xl px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Why DevJobs?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {[
                { number: "500+", label: "Jobs Posted" },
                { number: "120+", label: "Companies Hiring" },
                { number: "2k+", label: "Developers Registered" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="border border-transparent hover:border-violet-400/60 rounded-lg p-6 shadow-sm hover:shadow-md transition-colors bg-white dark:bg-gray-900/60 min-h-[140px] flex flex-col items-center justify-center"
                  variants={{
                    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-gray-800 dark:text-gray-100">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-14 md:py-16 mx-auto max-w-5xl px-4 md:px-6 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md bg-white dark:bg-gray-900/60">
              <h3 className="font-semibold mb-2">1. Sign In</h3>
              <p>Create an account or login using Google/GitHub.</p>
            </div>
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md bg-white dark:bg-gray-900/60">
              <h3 className="font-semibold mb-2">2. Browse Jobs</h3>
              <p>
                Search by title, location, or company and find your ideal job.
              </p>
            </div>
            <div className="border rounded-lg p-6 shadow-sm hover:shadow-md bg-white dark:bg-gray-900/60">
              <h3 className="font-semibold mb-2">3. Apply or Post</h3>
              <p>Apply to jobs instantly or post your own openings.</p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
