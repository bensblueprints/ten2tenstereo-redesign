"use client";

import Image from "next/image";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

type MediaItem = { name: string; url: string };

export function MediaGrid({ images }: { images: MediaItem[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(url: string) {
    const absolute = typeof window !== "undefined" ? new URL(url, window.location.origin).toString() : url;
    await navigator.clipboard.writeText(absolute);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  if (images.length === 0) {
    return (
      <div className="border border-[var(--muted-line)] p-10 text-center text-muted-foreground">
        No images yet. Drop files into{" "}
        <code className="font-mono-panel text-amber">public/images/</code> to see them here.
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-[13px] text-muted-foreground">
        Local files from <code className="font-mono-panel text-amber">public/images/</code>. To
        add more, upload to that folder or wire up Supabase Storage.
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <figure
            key={img.url}
            className="group flex flex-col overflow-hidden border border-[var(--muted-line)] bg-surface"
          >
            <div className="relative aspect-square bg-background">
              <Image
                src={img.url}
                alt={img.name}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-3 py-2.5">
              <span className="truncate font-mono-panel text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {img.name}
              </span>
              <button
                type="button"
                onClick={() => copy(img.url)}
                className="shrink-0 text-muted-foreground transition-colors hover:text-amber"
                aria-label="Copy URL"
              >
                {copied === img.url ? <Check className="h-4 w-4 text-amber" /> : <Copy className="h-4 w-4" />}
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
