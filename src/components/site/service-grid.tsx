"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";

export function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 gap-px bg-[var(--muted-line)] md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
        >
          <Link
            href={`/services/${service.slug}`}
            className="group relative flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100" />
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
                {service.code}
              </div>
            </div>
            <div className="flex flex-1 flex-col pt-6">
              <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-amber">
                {service.name}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {service.short}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-mono-panel text-[11px] uppercase tracking-[0.2em] text-foreground/80 group-hover:text-amber">
                Learn More
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
