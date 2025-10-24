import { motion } from "framer-motion";
import JobCard from "@/components/JobCard";
import useSWR from "swr";

export default function FeaturedJobs() {
  const { data, isLoading, error } = useSWR("/api/jobs/featured");

  const featuredJobs = data || [];
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {/* ⏳ Loading State */}
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-transparent bg-white dark:bg-gray-900/60 p-6 shadow-sm animate-pulse h-40"
          >
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}

      {/* ❌ Error State */}
      {!isLoading && error && (
        <div className="col-span-full text-center p-6 rounded-md border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
          There was a problem loading featured jobs. Please try again later.
        </div>
      )}

      {/* 📭 Empty State */}
      {!isLoading && !error && featuredJobs?.length === 0 && (
        <div className="col-span-full text-center text-gray-600 dark:text-gray-400 p-8">
          <p className="font-medium">No featured jobs available right now.</p>
          <p className="text-sm">Check back soon for new openings!</p>
        </div>
      )}

      {/* ✅ Success State */}
      {!isLoading &&
        !error &&
        featuredJobs?.length > 0 &&
        featuredJobs.map((job, i) => (
          <motion.div
            key={job._id || i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
    </div>
  );
}
