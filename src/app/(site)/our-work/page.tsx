import type { Metadata } from "next";
import Image from "next/image";
import { services } from "@/lib/content";
import { CtaBand } from "@/components/site/cta-band";
import { TestimonialsWall } from "@/components/site/testimonials-wall";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Install photography and real customer builds from Ten 2 Ten Stereo in Azusa, CA.",
};

type Tile = {
  src: string;
  title: string;
  tag: string;
  span: "wide" | "tall" | "square";
};

const tiles: Tile[] = [
  { src: "/images/stereo-install.jpg", title: "Head unit & DSP build", tag: "Car Stereo", span: "wide" },
  { src: "/images/car-security.jpg", title: "Smart alarm & remote start", tag: "Security", span: "tall" },
  { src: "/images/window-tint.jpg", title: "Ceramic tint install", tag: "Window Tint", span: "square" },
  { src: "/images/vehicle-wrap.jpg", title: "Satin black color change", tag: "Wraps", span: "wide" },
  { src: "/images/tire-install.jpg", title: "Wheel & tire package", tag: "Tires", span: "square" },
  { src: "/images/stereo-radio.jpg", title: "Factory-look CarPlay retrofit", tag: "Car Stereo", span: "tall" },
  { src: "/images/power-button.jpg", title: "LED headlight upgrade", tag: "LED", span: "square" },
];

function spanClass(span: Tile["span"]) {
  switch (span) {
    case "wide":
      return "md:col-span-2 md:row-span-1 aspect-[3/2] md:aspect-[2/1]";
    case "tall":
      return "md:col-span-1 md:row-span-2 aspect-[3/2] md:aspect-[3/4]";
    default:
      return "md:col-span-1 md:row-span-1 aspect-square";
  }
}

export default function OurWorkPage() {
  return (
    <>
      <section className="relative border-b border-[var(--muted-line)] py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
            → Portfolio
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[48px] leading-[1.0] tracking-[-0.02em] sm:text-[72px] lg:text-[96px]">
            Some of our <span className="text-amber">recent work.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-foreground/75">
            Every photo below is a real customer install — not stock photography, not
            rendered mock-ups. This is what walks out of our bay.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px]">
            {tiles.map((t) => (
              <figure
                key={t.title + t.src}
                className={`group relative overflow-hidden bg-surface ${spanClass(t.span)}`}
              >
                <Image
                  src={t.src}
                  alt={t.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                  <div>
                    <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
                      {t.tag}
                    </div>
                    <div className="mt-1.5 font-display text-lg font-bold leading-tight text-foreground">
                      {t.title}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--muted-line)] bg-secondary/40 py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
            → We cover it all
          </div>
          <h2 className="mt-4 max-w-3xl font-display text-[40px] leading-[1.05] sm:text-[56px]">
            From subs to security — all under one roof.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-px bg-[var(--muted-line)] md:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => (
              <div
                key={s.slug}
                className="flex flex-col justify-between bg-background p-5 min-h-[160px]"
              >
                <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
                  {s.code}
                </div>
                <div className="mt-6 font-display text-[15px] font-bold leading-tight">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              → The Receipts
            </div>
            <h2 className="mt-4 max-w-3xl font-display text-[40px] leading-[1.05] sm:text-[56px]">
              What the drivers say.
            </h2>
          </div>
          <TestimonialsWall />
        </div>
      </section>

      <CtaBand
        heading="Yours could be next in the bay."
        subheading="Book an appointment or walk in — either way, we'll take care of it."
      />
    </>
  );
}
