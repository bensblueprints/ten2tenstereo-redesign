import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { services, site } from "@/lib/content";
import { CtaBand } from "@/components/site/cta-band";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not Found" };
  return {
    title: service.name,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--muted-line)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 pt-16 pb-16 sm:px-6 lg:px-10 lg:pt-24 lg:pb-24">
          <div className="col-span-12 lg:col-span-7">
            <Link
              href="/services"
              className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-amber"
            >
              ← Back to Services
            </Link>
            <div className="mt-6 font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              {service.code}
            </div>
            <h1 className="mt-5 font-display text-[48px] leading-[1.0] tracking-[-0.02em] sm:text-[72px] lg:text-[96px]">
              {service.name}
            </h1>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/75">
              {service.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phoneLink}
                className="group inline-flex items-center justify-center gap-3 bg-amber px-6 py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:shadow-[0_0_0_4px_rgba(245,165,36,0.15)]"
              >
                <Phone className="h-4 w-4" />
                Get a Quote
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 border border-[var(--muted-line)] px-6 py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] transition-all hover:border-amber hover:text-amber"
              >
                Ask a Question
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute right-4 top-4 border border-amber/40 bg-background/80 px-3 py-1.5 font-mono-panel text-[10px] uppercase tracking-[0.25em] text-amber backdrop-blur-sm">
                {service.code}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 sm:px-6 lg:px-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              Deliverables
            </div>
            <h2 className="mt-4 font-display text-[36px] leading-[1.05] tracking-tight sm:text-[48px]">
              What you walk out with.
            </h2>
          </div>
          <ul className="col-span-12 flex flex-col gap-px bg-[var(--muted-line)] lg:col-span-8">
            {service.benefits.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-4 bg-background p-6 transition-colors hover:bg-surface"
              >
                <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center border border-amber/50 bg-amber/10 font-mono-panel text-[10px] text-amber">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="flex flex-1 items-center gap-3 text-[16px] leading-relaxed">
                  <Check className="h-4 w-4 shrink-0 text-amber" />
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--muted-line)] py-24 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
                Also in the shop
              </div>
              <h2 className="mt-4 font-display text-[32px] leading-tight sm:text-[40px]">
                Related services
              </h2>
            </div>
            <Link
              href="/services"
              className="group hidden items-center gap-2 font-mono-panel text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-amber sm:inline-flex"
            >
              All Services
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[var(--muted-line)] md:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-5 bg-background p-6 transition-colors hover:bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-amber">
                    {s.code}
                  </div>
                  <div className="mt-2 font-display text-xl font-bold transition-colors group-hover:text-amber">
                    {s.name}
                  </div>
                  <div className="mt-1 text-[14px] text-muted-foreground">{s.short}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
