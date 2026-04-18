"use client";

import { CheckCircle, XCircle, HelpCircle, Loader2, ExternalLink } from "lucide-react";
import { getSortedRegistrars } from "@/lib/registrars";

interface Props {
  domain: string;
  tld: string;
  status: "checking" | "available" | "taken" | "unknown" | "idle";
  categoryEmoji?: string;
  category?: string;
  trending?: boolean;
}

const statusConfig = {
  idle: { icon: null, label: "", bg: "border-gray-700 bg-gray-800/60" },
  checking: { icon: <Loader2 className="w-4 h-4 animate-spin text-gray-400" />, label: "Checking...", bg: "border-gray-600 bg-gray-800/60" },
  available: { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, label: "Available", bg: "border-emerald-500/50 bg-emerald-900/20" },
  taken: { icon: <XCircle className="w-4 h-4 text-red-400" />, label: "Taken", bg: "border-red-500/30 bg-red-900/10" },
  unknown: { icon: <HelpCircle className="w-4 h-4 text-yellow-400" />, label: "Unknown", bg: "border-yellow-500/30 bg-yellow-900/10" },
};

export default function DomainCard({ domain, tld, status, categoryEmoji, category, trending }: Props) {
  const cfg = statusConfig[status];
  const registrars = status === "available" ? getSortedRegistrars(tld) : [];
  const cheapest = registrars[0];

  return (
    <div className={`rounded-xl border p-4 transition-all ${cfg.bg} ${status === "taken" ? "opacity-50" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {trending && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-medium">
                🔥 Trending
              </span>
            )}
            {category && (
              <span className="text-xs text-gray-400">{categoryEmoji} {category}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 flex-wrap">
            <span className="text-lg font-bold text-white">{domain}</span>
            <span className="text-lg font-bold text-violet-400">{tld}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {cfg.icon}
          <span className={`text-sm font-medium ${
            status === "available" ? "text-emerald-400" :
            status === "taken" ? "text-red-400" :
            status === "checking" ? "text-gray-400" :
            "text-yellow-400"
          }`}>{cfg.label}</span>
        </div>
      </div>

      {/* Pricing breakdown for available domains */}
      {status === "available" && registrars.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Registrar Pricing (renew/yr)</p>
          {registrars.slice(0, 4).map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition group ${
                r.name === cheapest?.name
                  ? "bg-emerald-900/40 border border-emerald-500/30"
                  : "bg-gray-700/40 hover:bg-gray-700/70"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{r.logo}</span>
                <span className="text-sm text-gray-200">{r.name}</span>
                {r.highlight && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-700/50 text-emerald-300">{r.highlight}</span>
                )}
                {r.name === cheapest?.name && !r.highlight && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-700/50 text-emerald-300">Cheapest</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-sm font-semibold text-white">${r.renew}/yr</span>
                  {r.register !== r.renew && (
                    <span className="text-xs text-gray-400 ml-1">(1st yr ${r.register})</span>
                  )}
                </div>
                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition" />
              </div>
            </a>
          ))}
          {registrars.length > 4 && (
            <p className="text-xs text-gray-500 text-center pt-0.5">+{registrars.length - 4} more registrars</p>
          )}
        </div>
      )}
    </div>
  );
}
