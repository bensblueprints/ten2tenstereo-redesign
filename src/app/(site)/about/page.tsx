import type { Metadata } from "next";
import Image from "next/image";
import { stats, site } from "@/lib/content";
import { CountUp } from "@/components/site/count-up";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ten 2 Ten Stereo has been Azusa's trusted car audio and install shop for 15+ years. Locally owned, real quotes, honest work.",
};

const timeline = [
  {
    year: "2010",
    title: "Opened doors in Azusa",
    body: "Pete opens the shop on a handshake and a couple of amps. Word gets around fast — the nearest competitor is charging double and half the drivers know it.",
  },
  {
    year: "2013",
    title: "First full-wrap customer",
    body: "A regular brings in his lifted Silverado for a matte black wrap. We spend a weekend on it. He sends five friends the next month.",
  },
  {
    year: "2017",
    title: "Added security & alarms",
    body: "After hearing too many car theft stories from the neighborhood, we become the SGV's go-to for affordable, properly installed security systems.",
  },
  {
    year: "2021",
    title: "Ten years deep",
    body: "A full decade in the same building. 100% Google rating, hundreds of five-star reviews, a full book of returning customers and their kids.",
  },
  {
    year: "Today",
    title: "Still in the same bay",
    body: "Pete, Chris, David, Mike, and Joe — same crew, same chairs in the waiting room, same obsession with getting the little things right.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--muted-line)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              → About the Shop
            </div>
            <h1 className="mt-5 font-display text-[48px] leading-[1.0] tracking-[-0.02em] sm:text-[72px] lg:text-[96px]">
              One shop.
              <br />
              One crew.
              <br />
              <span className="text-amber">Fifteen years.</span>
            </h1>
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-foreground/75">
              {site.about}
            </p>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground/75">
              We do car audio because we actually love car audio — not because it&apos;s a
              business model. You&apos;ll hear the speakers playing music in the shop while
              Joe is taping off a dashboard. That&apos;s not branding. That&apos;s just what
              happens when people enjoy the work.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src="/images/vehicle-wrap.jpg"
                alt="Ten 2 Ten crew at work"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--muted-line)] py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 gap-px bg-[var(--muted-line)] px-4 sm:px-6 lg:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background py-12 px-6 text-center">
              <div className="font-display text-[56px] font-bold leading-none text-amber sm:text-[80px]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-4 font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 sm:px-6 lg:px-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-28">
              <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
                Timeline
              </div>
              <h2 className="mt-4 font-display text-[40px] leading-[1.05] sm:text-[56px]">
                How we got here.
              </h2>
            </div>
          </div>
          <ol className="col-span-12 flex flex-col gap-10 lg:col-span-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative border-l border-amber/40 pl-8">
                <span className="absolute -left-[5px] top-1 h-[10px] w-[10px] rounded-full bg-amber" />
                <div className="font-mono-panel text-[12px] uppercase tracking-[0.25em] text-amber">
                  {t.year}
                </div>
                <div className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {t.title}
                </div>
                <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        heading="Stop by and say hi."
        subheading="The shop is open 6 days a week — walk in, poke around, talk to Pete."
      />
    </>
  );
}
