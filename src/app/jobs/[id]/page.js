import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export default async function JobDetail({ params }) {
  await dbConnect();
  const job = await Job.findById(params.id).lean();

  if (!job) return <p>Job not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.company} — {job.location}</p>
      <p className="mt-4">{job.description}</p>
    </div>
  );
}
