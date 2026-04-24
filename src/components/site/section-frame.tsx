"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow?: string;
  heading: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionFrame({ index, eyebrow, heading, children, className }: Props) {
  return (
    <section className={cn("relative py-24 sm:py-28 lg:py-32", className)}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 flex items-start gap-6 md:col-span-3 md:flex-col"
        >
          <div className="font-display text-[72px] leading-none tracking-tight text-amber sm:text-[96px] md:text-[128px]">
            {index}
          </div>
          <div className="hidden h-24 w-px section-rule md:block" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-9"
        >
          {eyebrow && (
            <div className="mb-4 font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-[40px] leading-[1.05] tracking-tight sm:text-[56px] lg:text-[68px]">
            {heading}
          </h2>
          <div className="mt-10">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
