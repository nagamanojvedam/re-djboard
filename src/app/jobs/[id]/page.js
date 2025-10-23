// app/jobs/[id]/page.jsx
import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { notFound } from "next/navigation";

// Optional: if IDs are dynamic and page must never be cached
// export const dynamic = "force-dynamic";

function isValidObjectId(id) {
  // Cheap ObjectId format check to avoid cast errors
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export default async function JobDetail({ params }) {
  const { id } = params; // If on Next 15 with async params, use: const { id } = await params;

  if (!isValidObjectId(id)) {
    notFound();
  }

  await dbConnect();

  const job = await Job.findById(id).lean().exec();

  if (!job) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 md:px-6 py-8">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {job.company} — {job.location}
        </p>
      </header>

      {job.description ? (
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{job.description}</p>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No description provided.
        </p>
      )}

      {/* Optional metadata fields if present */}
      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {job.type && (
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Type</dt>
            <dd className="font-medium">{job.type}</dd>
          </div>
        )}
        {job.salary && (
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Salary</dt>
            <dd className="font-medium">{job.salary}</dd>
          </div>
        )}
        {job.createdAt && (
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Posted</dt>
            <dd className="font-medium">
              {new Date(job.createdAt).toLocaleDateString()}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-8 flex gap-3">
        <a
          href={`/apply/${job._id}`}
          className="inline-flex items-center rounded-md bg-cyan-600 px-4 py-2 text-white font-semibold hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Apply Now
        </a>
        <a
          href="/jobs"
          className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold hover:bg-gray-100/70 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Back to Jobs
        </a>
      </div>
    </article>
  );
}

// Optional SEO (dynamic metadata)
export async function generateMetadata({ params }) {
  const { id } = params; // If on Next 15 with async params, await params first

  if (!isValidObjectId(id)) {
    return { title: "Job not found" };
  }

  await dbConnect();
  const job = await Job.findById(id)
    .select("title company location")
    .lean()
    .exec();

  if (!job) {
    return { title: "Job not found" };
  }

  const title = `${job.title} at ${job.company} — ${job.location}`;
  return {
    title,
    description: `Apply for ${job.title} at ${job.company} in ${job.location}.`,
    openGraph: {
      title,
      description: `Apply for ${job.title} at ${job.company} in ${job.location}.`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description: `Apply for ${job.title} at ${job.company} in ${job.location}.`,
    },
  };
}
