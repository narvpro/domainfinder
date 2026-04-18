import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

// RDAP registry bootstrap endpoints per TLD
const RDAP_ENDPOINTS: Record<string, string> = {
  ".com": "https://rdap.verisign.com/com/v1/domain/",
  ".net": "https://rdap.verisign.com/net/v1/domain/",
  ".org": "https://rdap.donuts.co/domain/",
  ".io": "https://rdap.nic.io/domain/",
  ".co": "https://rdap.nic.co/domain/",
  ".app": "https://rdap.nic.google/domain/",
  ".dev": "https://rdap.nic.google/domain/",
  ".ai": "https://rdap.nic.ai/domain/",
  ".xyz": "https://rdap.nic.xyz/domain/",
  ".gg": "https://rdap.nic.gg/domain/",
};

async function checkDomainRDAP(domain: string): Promise<"available" | "taken" | "unknown"> {
  const tld = "." + domain.split(".").pop();
  const endpoint = RDAP_ENDPOINTS[tld];

  if (!endpoint) return "unknown";

  try {
    const res = await fetch(`${endpoint}${domain}`, {
      method: "GET",
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(5000),
    });

    if (res.status === 404) return "available";
    if (res.status === 200) return "taken";
    return "unknown";
  } catch {
    // Connection refused / timeout often means the domain is unregistered
    return "unknown";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain || !domain.includes(".")) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  // Sanitize: allow only alphanumeric, hyphens, and dots
  const sanitized = domain.toLowerCase().trim();
  if (!/^[a-z0-9-]+\.[a-z]{2,}$/.test(sanitized)) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  const status = await checkDomainRDAP(sanitized);

  return NextResponse.json({ domain: sanitized, status });
}
