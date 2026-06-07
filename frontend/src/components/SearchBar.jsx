import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search News..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border rounded-lg p-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-5 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;