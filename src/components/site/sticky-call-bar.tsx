"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/content";

export function StickyCallBar() {
  return (
    <a
      href={site.phoneLink}
      className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-2 bg-amber py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-background shadow-[0_6px_24px_rgba(245,165,36,0.35)] md:hidden"
      aria-label="Call Ten 2 Ten Stereo"
    >
      <Phone className="h-4 w-4" />
      Call {site.phone}
    </a>
  );
}
