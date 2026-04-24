"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";

export function TestimonialsWall() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t, i) => (
        <motion.figure
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="group relative flex flex-col border border-[var(--muted-line)] bg-surface p-6 transition-colors hover:border-amber/40"
        >
          <Quote className="absolute right-5 top-5 h-10 w-10 text-amber/15" />
          <div className="flex gap-1">
            {Array.from({ length: t.rating }).map((_, idx) => (
              <Star key={idx} className="h-3.5 w-3.5 fill-amber text-amber" />
            ))}
          </div>
          <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-foreground/85">
            {t.quote}
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-between border-t border-[var(--muted-line)] pt-4 font-mono-panel text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-foreground/80">{t.name}</span>
            <span className="text-amber">Google</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
