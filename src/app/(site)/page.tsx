import { Hero } from "@/components/site/hero";
import { MarqueeBar } from "@/components/site/marquee-bar";
import { SectionFrame } from "@/components/site/section-frame";
import { ValueProps } from "@/components/site/value-props";
import { ServiceGrid } from "@/components/site/service-grid";
import { AboutSplit } from "@/components/site/about-split";
import { TestimonialsWall } from "@/components/site/testimonials-wall";
import { CtaBand } from "@/components/site/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />

      <SectionFrame
        index="01"
        eyebrow="Why Ten 2 Ten"
        heading={
          <>
            No upsell games.
            <br />
            Just <span className="text-amber">clean installs.</span>
          </>
        }
      >
        <ValueProps />
      </SectionFrame>

      <AboutSplit />

      <SectionFrame
        index="03"
        eyebrow="Services"
        heading={
          <>
            Everything your ride <span className="text-amber">needs</span>, in one bay.
          </>
        }
      >
        <ServiceGrid />
      </SectionFrame>

      <SectionFrame
        index="04"
        eyebrow="Customer Reviews"
        heading={
          <>
            Real people. <span className="text-amber">Real installs.</span>
          </>
        }
      >
        <TestimonialsWall />
      </SectionFrame>

      <CtaBand />
    </>
  );
}
