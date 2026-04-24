"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Star } from "lucide-react";
import { site } from "@/lib/content";

export function Hero() {
  const words = ["Car", "audio.", "Done", "right."];

  return (
    <section className="relative grain overflow-hidden border-b border-[var(--muted-line)]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/stereo-install.jpg"
          alt="Ten 2 Ten Stereo install bay"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,165,36,0.6), transparent)" }}
        />
      </div>

      <div className="mx-auto grid min-h-[88vh] max-w-[1280px] grid-cols-12 gap-6 px-4 pt-16 pb-16 sm:px-6 lg:px-10 lg:pt-24 lg:pb-28">
        <div className="col-span-12 flex flex-col justify-between lg:col-span-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-3 border border-amber/30 bg-amber/5 px-3 py-1.5 font-mono-panel text-[10px] uppercase tracking-[0.3em] text-amber"
            >
              <span className="h-[6px] w-[6px] animate-amber-pulse rounded-full bg-amber" />
              {site.region}
            </motion.div>

            <h1 className="font-display text-[56px] leading-[0.95] tracking-[-0.03em] sm:text-[88px] lg:text-[132px]">
              <span className="block">
                {words.slice(0, 2).map((w, i) => (
                  <motion.span
                    key={`a-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block pr-[0.25em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block text-amber">
                {words.slice(2).map((w, i) => (
                  <motion.span
                    key={`b-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block pr-[0.25em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-10 max-w-xl text-[17px] leading-relaxed text-foreground/75"
            >
              San Gabriel Valley's most-recommended install shop. Stereos, subs, tint,
              wraps, alarms — built by people who treat every vehicle like their own.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={site.phoneLink}
              className="group relative inline-flex items-center justify-center gap-3 bg-amber px-7 py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:shadow-[0_0_0_4px_rgba(245,165,36,0.15)]"
            >
              <Phone className="h-4 w-4" />
              Call {site.phone}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-3 border border-[var(--muted-line)] px-7 py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-amber hover:text-amber"
            >
              See Services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="col-span-12 flex flex-col justify-end lg:col-span-4 lg:pl-6"
        >
          <div className="border border-[var(--muted-line)] bg-surface/60 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber text-amber" />
              ))}
              <span className="ml-2 font-mono-panel text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                5.0 · Google
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              &quot;Awesome service, clean install, fair pricing. Highly recommend —
              just make an appointment, the place gets busy.&quot;
            </p>
            <div className="mt-4 font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              — Carlos Hernandez
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 border border-[var(--muted-line)]">
            <StatBlock value="15+" label="Years" />
            <StatBlock value="100%" label="Rated" />
            <StatBlock value="1K+" label="Installs" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-[var(--muted-line)] px-4 py-4 last:border-r-0">
      <div className="font-display text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 font-mono-panel text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
