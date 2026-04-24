import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call (626) 858-2777, email, or visit Ten 2 Ten Stereo in Azusa, CA. Walk-ins welcome.",
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

  return (
    <>
      <section className="relative border-b border-[var(--muted-line)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-6 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
              → Get in touch
            </div>
            <h1 className="mt-5 font-display text-[48px] leading-[1.0] tracking-[-0.02em] sm:text-[72px] lg:text-[88px]">
              Call. Stop in.
              <br />
              Or <span className="text-amber">send a note.</span>
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-foreground/75">
              Talk to a real person. Get a real quote. If you want it fast — call. If
              you&apos;d rather type it out, the form works too.
            </p>

            <div className="mt-12 flex flex-col gap-px border border-[var(--muted-line)] bg-[var(--muted-line)]">
              <ContactInfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={site.phone} href={site.phoneLink} />
              <ContactInfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactInfoRow icon={<MapPin className="h-4 w-4" />} label="Address" value={site.address} />
              <ContactInfoRow
                icon={<Clock className="h-4 w-4" />}
                label="Hours"
                value={site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="border border-[var(--muted-line)] bg-surface p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--muted-line)] pb-5">
                <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
                  → Send Message
                </div>
                <div className="font-mono-panel text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Avg reply: 1 business day
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--muted-line)]">
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-10">
          <div className="font-mono-panel text-[11px] uppercase tracking-[0.3em] text-amber">
            → Find the shop
          </div>
          <div className="mt-4 overflow-hidden border border-[var(--muted-line)]">
            <iframe
              src={mapSrc}
              width="100%"
              height="420"
              style={{ border: 0, filter: "grayscale(0.6) contrast(1.1) brightness(0.85)" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Ten 2 Ten Stereo location"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-5 bg-background px-5 py-5 transition-colors hover:bg-surface">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-amber/40 bg-amber/5 text-amber">
        {icon}
      </div>
      <div>
        <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-[15px] font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="group block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
