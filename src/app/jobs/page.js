"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";

const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load");
    return r.json();
  });

export default function JobsPage() {
  const { data, error, isLoading } = useSWR("/api/jobs", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  }); // caching + revalidation [web:85][web:102]

  // Local search state
  const [query, setQuery] = useState("");

  // Debounce the query to avoid filtering on every keystroke
  const [debounced, setDebounced] = useState("");
  useMemo(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 200);
    return () => clearTimeout(id);
  }, [query]); // simple client debounce UX

  // Filter with memoization
  const jobs = data || [];
  const filtered = useMemo(() => {
    if (!debounced) return jobs;
    const q = debounced.toLowerCase();
    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const location = job.location?.toLowerCase() || "";
      return title.includes(q) || company.includes(q) || location.includes(q);
    });
  }, [jobs, debounced]); // stable derived list

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 md:px-6 py-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">All Jobs</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {isLoading
              ? "Loading jobs…"
              : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
          </p>
        </div>
        {/* Optional: future filters/sort */}
      </div>
      <SearchBar
        onSearch={setQuery}
        defaultValue={query}
        placeholder="Search by title, company, or location"
      />
      {/* Loading state */}
      {isLoading && (
        <div
          role="status"
          aria-busy="true"
          aria-live="polite"
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-transparent bg-white dark:bg-gray-900/60 p-6 shadow-sm animate-pulse h-[160px]"
            />
          ))}
        </div>
      )}{" "}
      {/* Accessible loading UI [web:89][web:98] */}
      {/* Error state */}
      {!isLoading && error && (
        <div className="mt-6 rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 p-4">
          Failed to load jobs. Please try again or check your connection.
        </div>
      )}{" "}
      {/* Clear error surface [web:87][web:90] */}
      {/* Empty state */}
      {!isLoading && !error && filtered.length === 0 && (
        <div className="mt-10 text-center text-gray-600 dark:text-gray-400">
          <p className="font-medium">No results found</p>
          <p className="text-sm">
            Try a different keyword or clear the search.
          </p>
        </div>
      )}
      {/* Results */}
      {!isLoading && !error && filtered.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
