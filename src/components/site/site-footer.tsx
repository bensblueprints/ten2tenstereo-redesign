import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { nav, services, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-[var(--muted-line)] bg-secondary">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-amber" />
                <div className="absolute inset-[3px] bg-secondary" />
                <div className="absolute inset-[6px] bg-amber" />
              </div>
              <div className="font-display text-lg font-bold tracking-tight">
                TEN 2 TEN STEREO
              </div>
            </div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {site.mission} Based in Azusa, serving the entire San Gabriel Valley since
              2010 — every install done right the first time.
            </p>
            <div className="mt-8 flex items-start gap-3 font-mono-panel text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="mt-[3px] inline-block h-[10px] w-[10px] animate-amber-pulse rounded-full bg-amber" />
              Open today · Walk-ins welcome
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
              Services
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[14px] text-foreground/85 transition-colors hover:text-amber"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
              Shop
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-foreground/85 transition-colors hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.28em] text-amber">
              Contact
            </div>
            <ul className="mt-5 flex flex-col gap-4 text-[14px]">
              <li>
                <a
                  href={site.phoneLink}
                  className="flex items-start gap-2 text-foreground/85 transition-colors hover:text-amber"
                >
                  <Phone className="mt-1 h-3.5 w-3.5 shrink-0" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2 break-all text-foreground/85 transition-colors hover:text-amber"
                >
                  <Mail className="mt-1 h-3.5 w-3.5 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-foreground/85">
                <MapPin className="mt-1 h-3.5 w-3.5 shrink-0" />
                {site.address}
              </li>
              {site.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-2 text-foreground/85">
                  <Clock className="mt-1 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <span className="block text-[11px] font-mono-panel uppercase tracking-[0.2em] text-muted-foreground">
                      {h.days}
                    </span>
                    <span>{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--muted-line)] pt-8 md:flex-row">
          <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Ten 2 Ten Stereo — All Rights Reserved
          </div>
          <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Azusa · SGV · CA
          </div>
        </div>
      </div>
    </footer>
  );
}
