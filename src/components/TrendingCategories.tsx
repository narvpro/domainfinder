"use client";

import { TREND_CATEGORIES } from "@/lib/trending";

interface Props {
  activeCategory: string | null;
  onSelect: (categoryId: string) => void;
}

export default function TrendingCategories({ activeCategory, onSelect }: Props) {
  return (
    <div className="w-full">
      <p className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wide">
        Browse by Trending Category
      </p>
      <div className="flex flex-wrap gap-2">
        {TREND_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "border-violet-500 bg-violet-600/30 text-white"
                : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
