import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } else if (req.method === "DELETE") {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
