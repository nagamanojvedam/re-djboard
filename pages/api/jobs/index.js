import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } else if (req.method === "POST") {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
