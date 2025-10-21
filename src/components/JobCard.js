import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm">{job.location}</p>
      <Link href={`/jobs/${job._id}`} className="text-blue-500 mt-2 block">
        View Details
      </Link>
    </div>
  );
}
