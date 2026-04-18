export interface TrendCategory {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  keywords: string[];
  prefixes: string[];
  suffixes: string[];
}

export const TREND_CATEGORIES: TrendCategory[] = [
  {
    id: "ai",
    label: "AI & Tech",
    emoji: "🤖",
    description: "Artificial intelligence, automation, and next-gen tech",
    color: "from-violet-500 to-purple-600",
    keywords: ["nova", "neura", "synth", "forge", "pulse", "flux", "nexus", "apex", "axon", "vibe"],
    prefixes: ["get", "try", "use", "go", "my", "hey"],
    suffixes: ["ai", "labs", "hq", "io", "hub", "tech", "works"],
  },
  {
    id: "creator",
    label: "Creators & Influencers",
    emoji: "🎥",
    description: "Viral content, streaming, and social media brands",
    color: "from-pink-500 to-rose-600",
    keywords: ["vibe", "viral", "reel", "spark", "boom", "hype", "glow", "buzz", "clout", "wave"],
    prefixes: ["the", "my", "go", "get", "hey"],
    suffixes: ["studio", "media", "hub", "tv", "live", "clips", "show"],
  },
  {
    id: "startup",
    label: "Startups",
    emoji: "🚀",
    description: "SaaS, fintech, and modern startup names",
    color: "from-blue-500 to-cyan-600",
    keywords: ["zest", "nimble", "swift", "bolt", "dash", "rise", "leap", "snap", "plex", "flow"],
    prefixes: ["get", "use", "try", "go", "my"],
    suffixes: ["app", "hq", "ly", "ify", "base", "io", "hub"],
  },
  {
    id: "health",
    label: "Health & Wellness",
    emoji: "💚",
    description: "Wellness, fitness, and mindfulness brands",
    color: "from-green-500 to-emerald-600",
    keywords: ["vita", "zen", "bloom", "nouri", "lumi", "sera", "aura", "flora", "terra", "pulse"],
    prefixes: ["my", "be", "live", "feel", "get"],
    suffixes: ["wellness", "health", "fit", "care", "life", "mind", "body"],
  },
  {
    id: "finance",
    label: "Fintech & Finance",
    emoji: "💸",
    description: "Payments, crypto, and financial services",
    color: "from-yellow-500 to-orange-500",
    keywords: ["coin", "stack", "vault", "yield", "fund", "cash", "mint", "ledge", "equity", "capital"],
    prefixes: ["my", "get", "go", "smart", "quick"],
    suffixes: ["pay", "fi", "fund", "money", "wallet", "bank", "payments"],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    emoji: "🌱",
    description: "Eco-friendly, green tech, and sustainability",
    color: "from-teal-500 to-green-600",
    keywords: ["eco", "green", "terra", "sprout", "leaf", "solar", "clean", "pure", "nature", "bloom"],
    prefixes: ["be", "go", "live", "think", "plant"],
    suffixes: ["eco", "green", "earth", "planet", "care", "future", "collective"],
  },
  {
    id: "gaming",
    label: "Gaming & Esports",
    emoji: "🎮",
    description: "Gaming brands, esports, and game studios",
    color: "from-indigo-500 to-blue-600",
    keywords: ["nexus", "rage", "blaze", "storm", "forge", "pixel", "quest", "raid", "arena", "cyber"],
    prefixes: ["play", "game", "gg", "pro", "ultra"],
    suffixes: ["gg", "games", "play", "arena", "zone", "squad", "labs"],
  },
  {
    id: "ecommerce",
    label: "E-commerce & D2C",
    emoji: "🛍️",
    description: "Direct-to-consumer and online retail brands",
    color: "from-orange-500 to-red-500",
    keywords: ["shop", "cart", "haul", "drop", "market", "store", "bazaar", "picks", "finds", "gear"],
    prefixes: ["the", "my", "get", "shop", "buy"],
    suffixes: ["shop", "store", "market", "co", "goods", "collective", "supply"],
  },
];

export interface DomainSuggestion {
  name: string;
  tld: string;
  fullDomain: string;
  category: string;
  categoryEmoji: string;
  trending: boolean;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateSuggestions(
  keyword: string,
  tlds: string[] = [".com", ".io", ".co", ".app", ".dev"]
): DomainSuggestion[] {
  const suggestions: DomainSuggestion[] = [];
  const kw = keyword.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9-]/g, "");
  if (!kw) return [];

  for (const tld of tlds) {
    suggestions.push({
      name: kw,
      tld,
      fullDomain: `${kw}${tld}`,
      category: "Custom",
      categoryEmoji: "🔍",
      trending: false,
    });
  }

  // Variations
  const variations = [
    `get${kw}`,
    `try${kw}`,
    `${kw}hq`,
    `${kw}app`,
    `${kw}hub`,
    `my${kw}`,
    `the${kw}`,
    `${kw}ly`,
  ];

  for (const variation of variations) {
    suggestions.push({
      name: variation,
      tld: ".com",
      fullDomain: `${variation}.com`,
      category: "Custom",
      categoryEmoji: "🔍",
      trending: false,
    });
  }

  return suggestions;
}

export function getTrendingSuggestions(
  categoryId: string,
  tlds: string[] = [".com", ".io", ".co", ".app"]
): DomainSuggestion[] {
  const category = TREND_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return [];

  const suggestions: DomainSuggestion[] = [];

  // keyword only
  for (const kw of category.keywords.slice(0, 4)) {
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    suggestions.push({
      name: kw,
      tld,
      fullDomain: `${kw}${tld}`,
      category: category.label,
      categoryEmoji: category.emoji,
      trending: true,
    });
  }

  // prefix + keyword
  for (const kw of category.keywords.slice(0, 3)) {
    const prefix = category.prefixes[Math.floor(Math.random() * category.prefixes.length)];
    const name = `${prefix}${kw}`;
    suggestions.push({
      name,
      tld: ".com",
      fullDomain: `${name}.com`,
      category: category.label,
      categoryEmoji: category.emoji,
      trending: true,
    });
  }

  // keyword + suffix
  for (const kw of category.keywords.slice(0, 3)) {
    const suffix = category.suffixes[Math.floor(Math.random() * category.suffixes.length)];
    const name = `${kw}${suffix}`;
    suggestions.push({
      name,
      tld: ".com",
      fullDomain: `${name}.com`,
      category: category.label,
      categoryEmoji: category.emoji,
      trending: true,
    });
  }

  // Shuffle and deduplicate
  const seen = new Set<string>();
  return suggestions
    .filter((s) => {
      if (seen.has(s.fullDomain)) return false;
      seen.add(s.fullDomain);
      return true;
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);
}
