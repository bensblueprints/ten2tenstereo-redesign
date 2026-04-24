"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Submission failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 border border-amber/40 bg-amber/5 p-8"
      >
        <CheckCircle2 className="h-10 w-10 text-amber" />
        <div>
          <div className="font-display text-2xl font-bold">Message received.</div>
          <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
            Pete or one of the crew will get back to you shortly. If it&apos;s urgent —
            just call the shop.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Your email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Phone number" name="phone" type="tel" />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="service"
            className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
          >
            Service of interest
          </label>
          <select
            id="service"
            name="service"
            className="h-12 border border-[var(--muted-line)] bg-background px-3 text-[15px] text-foreground outline-none transition-colors focus:border-amber"
            defaultValue=""
          >
            <option value="">Pick one…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
      </div>
      <Field label="Subject" name="subject" />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="border border-[var(--muted-line)] bg-background p-3 text-[15px] text-foreground outline-none transition-colors focus:border-amber"
          placeholder="Tell us about your vehicle and what you're looking for…"
        />
      </div>

      {status === "error" && error && (
        <div className="flex items-center gap-3 border border-brake/50 bg-brake/5 p-4 text-[14px] text-foreground/80">
          <AlertCircle className="h-4 w-4 text-brake" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-2 inline-flex items-center justify-center gap-3 bg-amber px-6 py-4 font-mono-panel text-[12px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:shadow-[0_0_0_4px_rgba(245,165,36,0.15)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
      <p className="font-mono-panel text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Or just call the shop — much faster.
      </p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function Field({ label, name, type = "text", required = false }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-amber">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-12 border border-[var(--muted-line)] bg-background px-3 text-[15px] text-foreground outline-none transition-colors focus:border-amber"
      />
    </div>
  );
}
