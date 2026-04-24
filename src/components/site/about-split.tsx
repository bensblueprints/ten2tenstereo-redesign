"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/site/count-up";
import { stats } from "@/lib/content";

export function AboutSplit() {
  return (
    <section className="relative border-t border-[var(--muted-line)] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="col-span-12 lg:col-span-6"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src="/images/stereo-radio.jpg"
              alt="Ten 2 Ten Stereo shop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-amber/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border border-amber/40 bg-background/70 p-4 backdrop-blur-sm">
              <div>
                <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
                  Est. 2010 · Azusa, CA
                </div>
                <div className="mt-1 font-display text-xl">Locally owned & operated</div>
              </div>
              <div className="h-10 w-10 shrink-0 animate-amber-pulse rounded-full border border-amber/50 bg-amber/20" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-12 flex flex-col justify-center lg:col-span-6 lg:pl-10"
        >
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
            02 · The Shop
          </div>
          <h2 className="mt-5 font-display text-[40px] leading-[1.02] tracking-tight sm:text-[56px] lg:text-[64px]">
            We treat every ride <span className="text-amber">like our own.</span>
          </h2>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/75">
            Fifteen years on one block. Pete runs the front, Chris and David handle the
            quotes, Joe and Mike do the clean work under the dash. Your car is in there
            with people who actually listen to what you want — and talk you out of things
            you don&apos;t need.
          </p>

          <div className="mt-12 grid grid-cols-3 border-t border-[var(--muted-line)]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-[var(--muted-line)] py-6 pr-4 last:border-r-0"
              >
                <div className="font-display text-[40px] font-bold leading-none text-amber sm:text-[56px]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-12 inline-flex items-center gap-3 self-start border border-[var(--muted-line)] px-5 py-3 font-mono-panel text-[11px] uppercase tracking-[0.22em] transition-all hover:border-amber hover:text-amber"
          >
            Our Full Story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
