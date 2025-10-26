import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });

  try {
    await dbConnect();

    const job = await Job.findById(id);
    if (!job)
      return NextResponse.json({ message: "No job found" }, { status: 404 });

    return NextResponse.json(job, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: "Invalid Job ID" }, { status: 400 });

  try {
    await dbConnect();

    const delJob = await Job.findByIdAndDelete(id);
    if (!delJob)
      return NextResponse.json(
        { message: "Cannot delete Job" },
        { status: 404 }
      );

    return NextResponse.json({ message: "Job deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
