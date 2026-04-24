import type { Metadata } from "next";
import { ServiceGrid } from "@/components/site/service-grid";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Car stereo installation, window tinting, vehicle wraps, alarm systems, LED headlights, and tire installation in Azusa, CA.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative border-b border-[var(--muted-line)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
            → Full Service Menu
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[48px] leading-[1.02] tracking-[-0.02em] sm:text-[72px] lg:text-[96px]">
            Everything your ride <span className="text-amber">needs.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-foreground/75">
            Sound, security, protection, style. We do the work ourselves — no subbing
            out, no &ldquo;mobile installer&rdquo; upcharge. Walk in, get a real quote, drive out with
            something you&apos;re actually proud of.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <ServiceGrid />
        </div>
      </section>

      <CtaBand
        heading="Don't see your service listed?"
        subheading="Call the shop — chances are we do it. Or we know the right person who does."
      />
    </>
  );
}
