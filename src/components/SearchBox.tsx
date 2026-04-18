"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface Props {
  onSearch: (keyword: string) => void;
  loading?: boolean;
}

export default function SearchBox({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. vibecheck, zengpt, flashpay..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          maxLength={40}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition flex items-center gap-2"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Find Domains
      </button>
    </form>
  );
}
