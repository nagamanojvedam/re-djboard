"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function JobCard({ job }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.02, rotateX: 1.5, rotateY: 1.5 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 22, mass: 0.8 }
      }
      className="group bg-white dark:bg-gray-800/60 rounded-lg shadow-sm hover:shadow-md border border-transparent hover:border-cyan-400/60 transition-colors transform-gpu p-5 md:p-6 h-full"
    >
      <header className="mb-3">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-50 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{job.company}</p>
      </header>

      <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>

      <div className="mt-4">
        <Link
          href={`/jobs/${job._id}`}
          className="inline-flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-semibold hover:text-cyan-600 dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-1"
          aria-label={`View details for ${job.title} at ${job.company}`}
          prefetch
        >
          View Details
          <svg
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 01.083.094l.007.01a.997.997 0 01.203.536v.034a.997.997 0 01-.203.536l-.007.01a.997.997 0 01-.083.094l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
