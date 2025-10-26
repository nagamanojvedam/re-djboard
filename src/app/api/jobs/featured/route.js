import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const jobs = await Job.find({}).limit(6);
  return NextResponse.json(jobs, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
