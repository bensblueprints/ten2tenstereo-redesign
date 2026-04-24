"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/lib/content";

type Props = {
  heading?: string;
  subheading?: string;
};

export function CtaBand({
  heading = "Ready to build something that sounds this good in your ride?",
  subheading = "Walk in, call, or drop us a line. Real quotes. Real people. Real fast.",
}: Props) {
  return (
    <section className="relative overflow-hidden border-y border-amber/30 bg-amber text-background">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay grain pointer-events-none" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="col-span-12 md:col-span-8"
        >
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-background/70">
            → Step Inside The Shop
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-[40px] leading-[0.98] tracking-tight sm:text-[56px] lg:text-[72px]">
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-background/80">
            {subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="col-span-12 flex flex-col items-stretch justify-end gap-3 md:col-span-4"
        >
          <a
            href={site.phoneLink}
            className="group flex items-center justify-between gap-4 border-2 border-background bg-background/0 px-6 py-5 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:bg-background hover:text-amber"
          >
            <span className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              {site.phone}
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <Link
            href="/contact"
            className="group flex items-center justify-between gap-4 border-2 border-background bg-background px-6 py-5 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-amber transition-all hover:bg-background/90"
          >
            Get a Written Quote
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <div className="mt-2 font-mono-panel text-[10px] uppercase tracking-[0.25em] text-background/65">
            {site.address} · Walk-ins welcome
          </div>
        </motion.div>
      </div>
    </section>
  );
}
