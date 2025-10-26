import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const jobs = await Job.find({});
  return NextResponse.json(jobs, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const job = new Job(body);
  await job.save();

  return NextResponse.json(job, { status: 200 });
}

export function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
