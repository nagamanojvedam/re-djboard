import dbConnect from "@/lib/db";
import Job from "@/models/Job";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const jobs = await Job.find({}).limit(6);
    res.status(200).json(jobs);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
