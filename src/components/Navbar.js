"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="font-bold text-lg">DevJobs</Link>
      <div className="space-x-4">
        <Link href="/jobs">Jobs</Link>
        <Link href="/jobs/create">Post Job</Link>
        <Link href="/dashboard">Dashboard</Link>
        {session ? (
          <button onClick={() => signOut()} className="ml-2">Logout</button>
        ) : (
          <button onClick={() => signIn()} className="ml-2">Login</button>
        )}
      </div>
    </nav>
  );
}
