import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to DevJobs</h1>
      <p className="mb-6">Find the best developer jobs or post your opportunities.</p>
      <Link href="/jobs" className="bg-blue-500 text-white px-6 py-3 rounded">
        Browse Jobs
      </Link>
    </div>
  );
}
