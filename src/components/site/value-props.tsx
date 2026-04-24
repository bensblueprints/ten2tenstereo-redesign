"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Timer, BadgeDollarSign } from "lucide-react";
import type { ReactNode } from "react";
import { valueProps } from "@/lib/content";

const icons: ReactNode[] = [
  <ShieldCheck key="1" className="h-5 w-5" />,
  <BadgeDollarSign key="2" className="h-5 w-5" />,
  <Timer key="3" className="h-5 w-5" />,
];

export function ValueProps() {
  return (
    <div className="grid grid-cols-1 gap-px border border-[var(--muted-line)] bg-[var(--muted-line)] md:grid-cols-3">
      {valueProps.map((vp, i) => (
        <motion.div
          key={vp.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-surface"
        >
          <span className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100" />
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center border border-amber/40 bg-amber/5 text-amber">
              {icons[i]}
            </div>
            <div className="font-mono-panel text-[11px] uppercase tracking-[0.25em] text-amber">
              0{i + 1} / {valueProps.length.toString().padStart(2, "0")}
            </div>
          </div>
          <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
            {vp.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {vp.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
