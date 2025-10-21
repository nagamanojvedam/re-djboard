"use client";

import { useState } from "react";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Job posted!");
    setForm({ title: "", company: "", location: "", description: "" });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} className="border p-2 rounded" rows="5" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Post Job</button>
      </form>
    </div>
  );
}
