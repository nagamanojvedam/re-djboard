"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function JobCard({ job }) {
  const prefersReducedMotion = useReducedMotion();

  // format date
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.02, y: -3, rotateX: 1, rotateY: 1 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 250, damping: 18, mass: 0.8 }
      }
      className="group bg-white dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 overflow-hidden flex flex-col justify-between p-6"
    >
      <div>
        {/* Company Logo or Placeholder */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-sm">
            {job.company?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              {job.company}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {postedDate}
            </p>
          </div>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {job.title}
        </h2>

        {/* Job Description Preview */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {job.description.length > 110
            ? job.description.slice(0, 110) + "..."
            : job.description}
        </p>

        {/* Location */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-cyan-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 2.05a7 7 0 019.9 9.9l-4.243 4.243a1 1 0 01-1.414 0L5.05 11.95a7 7 0 010-9.9zm4.95 3.536a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
              clipRule="evenodd"
            />
          </svg>
          {job.location}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
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
