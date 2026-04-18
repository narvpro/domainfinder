import { NextRequest, NextResponse } from "next/server";
import { getTrendingSuggestions, generateSuggestions } from "@/lib/trending";

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const keyword = searchParams.get("keyword");
  const tldsParam = searchParams.get("tlds");

  const tlds = tldsParam ? tldsParam.split(",") : [".com", ".io", ".co", ".app", ".dev"];

  if (keyword) {
    const sanitized = keyword.toLowerCase().trim().replace(/[^a-z0-9-\s]/g, "").slice(0, 30);
    const suggestions = generateSuggestions(sanitized, tlds);
    return NextResponse.json({ suggestions });
  }

  if (category) {
    const suggestions = getTrendingSuggestions(category, tlds);
    return NextResponse.json({ suggestions });
  }

  return NextResponse.json({ error: "Provide ?category=... or ?keyword=..." }, { status: 400 });
}
