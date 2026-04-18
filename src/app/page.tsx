"use client";

import { useState, useCallback } from "react";
import SearchBox from "@/components/SearchBox";
import DomainCard from "@/components/DomainCard";
import TrendingCategories from "@/components/TrendingCategories";
import { TREND_CATEGORIES } from "@/lib/trending";
import { Globe, Sparkles, TrendingUp } from "lucide-react";

interface DomainResult {
  name: string;
  tld: string;
  fullDomain: string;
  category?: string;
  categoryEmoji?: string;
  trending?: boolean;
  status: "checking" | "available" | "taken" | "unknown" | "idle";
}

const AVAILABLE_TLDS = [".com", ".io", ".co", ".app", ".dev", ".ai", ".net", ".xyz", ".gg"];

export default function Home() {
  const [results, setResults] = useState<DomainResult[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTlds, setActiveTlds] = useState<string[]>([".com", ".io", ".co", ".app"]);
  const [searchMode, setSearchMode] = useState<"keyword" | "category" | null>(null);

  const checkDomains = useCallback(async (domains: Omit<DomainResult, "status">[]) => {
    setResults(domains.map((d) => ({ ...d, status: "checking" })));
    setLoading(false);

    const concurrency = 4;
    const queue = [...domains];
    let index = 0;

    const checkOne = async (domain: Omit<DomainResult, "status">) => {
      try {
        const res = await fetch(`/api/check?domain=${encodeURIComponent(domain.fullDomain)}`);
        const data = await res.json();
        setResults((prev) =>
          prev.map((r) =>
            r.fullDomain === domain.fullDomain ? { ...r, status: data.status } : r
          )
        );
      } catch {
        setResults((prev) =>
          prev.map((r) =>
            r.fullDomain === domain.fullDomain ? { ...r, status: "unknown" } : r
          )
        );
      }
    };

    const workers = Array.from({ length: Math.min(concurrency, domains.length) }, async () => {
      while (index < queue.length) {
        const item = queue[index++];
        await checkOne(item);
      }
    });

    await Promise.all(workers);
  }, []);

  const handleSearch = useCallback(
    async (keyword: string) => {
      setLoading(true);
      setActiveCategory(null);
      setSearchMode("keyword");
      try {
        const res = await fetch(
          `/api/suggest?keyword=${encodeURIComponent(keyword)}&tlds=${activeTlds.join(",")}`
        );
        const data = await res.json();
        await checkDomains(data.suggestions || []);
      } catch {
        setLoading(false);
      }
    },
    [activeTlds, checkDomains]
  );

  const handleCategory = useCallback(
    async (categoryId: string) => {
      setLoading(true);
      setActiveCategory(categoryId);
      setSearchMode("category");
      try {
        const res = await fetch(
          `/api/suggest?category=${encodeURIComponent(categoryId)}&tlds=${activeTlds.join(",")}`
        );
        const data = await res.json();
        await checkDomains(data.suggestions || []);
      } catch {
        setLoading(false);
      }
    },
    [activeTlds, checkDomains]
  );

  const toggleTld = (tld: string) => {
    setActiveTlds((prev) =>
      prev.includes(tld)
        ? prev.length > 1 ? prev.filter((t) => t !== tld) : prev
        : [...prev, tld]
    );
  };

  const availableCount = results.filter((r) => r.status === "available").length;
  const checkingCount = results.filter((r) => r.status === "checking").length;

  const sortedResults = [...results].sort((a, b) => {
    const order: Record<string, number> = { available: 0, checking: 1, unknown: 2, taken: 3, idle: 4 };
    return order[a.status] - order[b.status];
  });

  const activeCategoryData = TREND_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Globe className="w-6 h-6 text-violet-400" />
          <span className="font-bold text-lg">DomainFinder</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/50 text-violet-300 border border-violet-700/50">
            Free
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-900/40 border border-violet-700/40 text-violet-300 text-sm mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Trending domain names · Real availability · Cheapest registrars
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
            Find Your Perfect Domain
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Discover available domains inspired by trending businesses, social media, and viral niches — with side-by-side registrar pricing.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col items-center gap-4">
          <SearchBox onSearch={handleSearch} loading={loading} />
          <div className="flex flex-wrap gap-2 justify-center">
            {AVAILABLE_TLDS.map((tld) => (
              <button
                key={tld}
                onClick={() => toggleTld(tld)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border transition ${
                  activeTlds.includes(tld)
                    ? "border-violet-500 bg-violet-600/20 text-violet-300"
                    : "border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                {tld}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600">Select TLDs to filter results</p>
        </div>

        {/* Trending Categories */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <span className="font-semibold">Trending Now</span>
          </div>
          <TrendingCategories activeCategory={activeCategory} onSelect={handleCategory} />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-t border-gray-800 pt-6">
              <div>
                <h2 className="font-bold text-lg">
                  {searchMode === "category" && activeCategoryData
                    ? `${activeCategoryData.emoji} ${activeCategoryData.label} Domains`
                    : "Domain Results"}
                </h2>
                <p className="text-sm text-gray-400">
                  {checkingCount > 0
                    ? `Checking ${checkingCount} domain${checkingCount > 1 ? "s" : ""}...`
                    : availableCount > 0
                    ? `${availableCount} available domain${availableCount > 1 ? "s" : ""} found`
                    : "No available domains found — try different keywords or TLDs"}
                </p>
              </div>
              <button
                onClick={() => setResults([])}
                className="text-xs text-gray-500 hover:text-gray-300 transition"
              >
                Clear
              </button>
            </div>
            <div className="grid gap-3">
              {sortedResults.map((r) => (
                <DomainCard
                  key={r.fullDomain}
                  domain={r.name}
                  tld={r.tld}
                  status={r.status}
                  category={r.category}
                  categoryEmoji={r.categoryEmoji}
                  trending={r.trending}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {results.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Search a keyword or pick a trending category above to discover available domains.</p>
          </div>
        )}
      </div>
    </main>
  );
}

