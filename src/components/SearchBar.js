"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jobs..."
        className="border p-2 flex-1 rounded-l"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
        Search
      </button>
    </form>
  );
}
