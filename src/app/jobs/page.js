'use client';

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (query) => {
    setFiltered(jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(job => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  );
}
