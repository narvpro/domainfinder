export interface RegistrarPrice {
  name: string;
  url: string;
  logo: string;
  register: number;
  renew: number;
  highlight?: string;
}

export interface TldPricing {
  tld: string;
  registrars: RegistrarPrice[];
}

// Prices in USD/year (approximate, as of 2026)
export const REGISTRAR_PRICING: Record<string, RegistrarPrice[]> = {
  ".com": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 9.73, renew: 10.98, highlight: "Cheapest" },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 9.77, renew: 9.77, highlight: "At-cost" },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 6.98, renew: 16.98 },
    { name: "Google Domains", url: "https://domains.squarespace.com", logo: "🔵", register: 12.00, renew: 12.00 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 2.99, renew: 21.99 },
    { name: "Name.com", url: "https://name.com", logo: "📛", register: 10.99, renew: 14.99 },
  ],
  ".io": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 32.96, renew: 32.96, highlight: "Cheapest" },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 39.98, renew: 39.98 },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 36.98, renew: 36.98 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 6.99, renew: 59.99 },
    { name: "Name.com", url: "https://name.com", logo: "📛", register: 44.99, renew: 44.99 },
  ],
  ".co": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 8.48, renew: 24.98 },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 9.98, renew: 25.98, highlight: "Popular" },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 25.00, renew: 25.00 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 4.99, renew: 29.99 },
    { name: "Google Domains", url: "https://domains.squarespace.com", logo: "🔵", register: 25.00, renew: 25.00 },
  ],
  ".app": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 12.98, renew: 14.98, highlight: "Cheapest" },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 14.98, renew: 14.98 },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 13.98, renew: 13.98 },
    { name: "Google Domains", url: "https://domains.squarespace.com", logo: "🔵", register: 20.00, renew: 20.00 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 6.99, renew: 24.99 },
  ],
  ".dev": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 10.98, renew: 12.98, highlight: "Cheapest" },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 10.98, renew: 10.98 },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 11.98, renew: 11.98 },
    { name: "Google Domains", url: "https://domains.squarespace.com", logo: "🔵", register: 12.00, renew: 12.00 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 1.99, renew: 19.99 },
  ],
  ".ai": [
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 69.98, renew: 79.98, highlight: "Popular" },
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 67.98, renew: 67.98, highlight: "Cheapest" },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 9.99, renew: 89.99 },
    { name: "Name.com", url: "https://name.com", logo: "📛", register: 79.99, renew: 79.99 },
  ],
  ".net": [
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 10.48, renew: 12.98 },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 10.98, renew: 10.98, highlight: "At-cost" },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 9.98, renew: 13.98 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 2.99, renew: 20.99 },
    { name: "Google Domains", url: "https://domains.squarespace.com", logo: "🔵", register: 12.00, renew: 12.00 },
  ],
  ".org": [
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 9.93, renew: 9.93, highlight: "At-cost" },
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 9.73, renew: 11.48 },
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 8.98, renew: 13.98 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 6.99, renew: 20.99 },
  ],
  ".xyz": [
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 1.98, renew: 12.98, highlight: "Cheapest 1st yr" },
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 2.48, renew: 2.48 },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 0.99, renew: 8.99 },
    { name: "Cloudflare", url: "https://cloudflare.com/products/registrar", logo: "🌐", register: 8.57, renew: 8.57 },
  ],
  ".gg": [
    { name: "Namecheap", url: "https://namecheap.com", logo: "🏷️", register: 29.98, renew: 29.98, highlight: "Gaming" },
    { name: "Porkbun", url: "https://porkbun.com", logo: "🐷", register: 24.98, renew: 24.98, highlight: "Cheapest" },
    { name: "GoDaddy", url: "https://godaddy.com", logo: "🤠", register: 12.99, renew: 34.99 },
  ],
};

export function getCheapestRegistrar(tld: string): RegistrarPrice | null {
  const registrars = REGISTRAR_PRICING[tld];
  if (!registrars || registrars.length === 0) return null;
  return registrars.reduce((cheapest, r) => r.renew < cheapest.renew ? r : cheapest);
}

export function getSortedRegistrars(tld: string): RegistrarPrice[] {
  const registrars = REGISTRAR_PRICING[tld];
  if (!registrars) return [];
  return [...registrars].sort((a, b) => a.renew - b.renew);
}
