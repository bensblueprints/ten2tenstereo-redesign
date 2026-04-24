"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--muted-line)] bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-sm bg-amber" />
            <div className="absolute inset-[3px] rounded-[1px] bg-background" />
            <div className="absolute inset-[6px] rounded-[1px] bg-amber" />
          </div>
          <div className="leading-none">
            <div className="font-display text-[15px] font-bold tracking-[0.02em] text-foreground">
              TEN 2 TEN
            </div>
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Stereo · Azusa
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 font-mono-panel text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-amber transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneLink}
            className="hidden items-center gap-2 border border-amber/40 bg-amber/5 px-4 py-2 font-mono-panel text-[11px] uppercase tracking-[0.18em] text-amber transition-all hover:border-amber hover:bg-amber hover:text-background lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {site.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden flex h-10 w-10 items-center justify-center border border-[var(--muted-line)] text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.65, 0, 0.35, 1], duration: 0.35 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm border-l border-[var(--muted-line)] bg-surface p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Menu
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center border border-[var(--muted-line)]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-[var(--muted-line)] py-4 font-display text-2xl font-bold tracking-tight transition-colors hover:text-amber"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-amber">
                        0{nav.indexOf(item) + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={site.phoneLink}
                className="mt-10 flex items-center justify-center gap-2 bg-amber px-4 py-4 font-mono-panel text-[12px] uppercase tracking-[0.2em] text-background"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
              <div className="mt-4 text-center font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {site.address}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
