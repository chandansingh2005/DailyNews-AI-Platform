import React from "react";

function CategoryBar({ onCategory }) {
  const categories = [
    "general",
    "technology",
    "business",
    "sports",
    "health",
    "science",
    "entertainment"
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategory(category)}
          className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;