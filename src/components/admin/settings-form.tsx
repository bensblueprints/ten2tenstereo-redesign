"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

type Fields = Record<string, string>;

const GROUPS: { title: string; fields: { key: string; label: string; hint?: string; textarea?: boolean }[] }[] = [
  {
    title: "Business",
    fields: [
      { key: "business_name", label: "Business name" },
      { key: "tagline", label: "Tagline" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
    ],
  },
  {
    title: "Hours",
    fields: [
      { key: "hours_weekdays", label: "Weekdays", hint: "e.g. Monday - Saturday: 9AM - 7PM" },
      { key: "hours_sunday", label: "Sunday" },
    ],
  },
  {
    title: "Analytics",
    fields: [
      { key: "google_analytics_id", label: "Google Analytics ID", hint: "e.g. G-XXXXXXXXXX" },
      { key: "facebook_pixel_id", label: "Facebook Pixel ID" },
    ],
  },
];

export function SettingsForm({ initial, configured }: { initial: Fields; configured: boolean }) {
  const [values, setValues] = useState<Fields>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    if (!configured) {
      setTimeout(() => setStatus("saved"), 300);
      return;
    }
    const supabase = getSupabaseBrowser();
    const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("settings").upsert(rows);
    setStatus(error ? "error" : "saved");
  }

  return (
    <div className="flex flex-col gap-10">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <div className="mb-4 font-mono-panel text-[11px] uppercase tracking-[0.28em] text-amber">
            {group.title}
          </div>
          <div className="grid grid-cols-1 gap-5 border border-[var(--muted-line)] bg-surface p-6 md:grid-cols-2">
            {group.fields.map((f) => (
              <div key={f.key} className="flex flex-col gap-2">
                <label className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {f.label}
                </label>
                {f.textarea ? (
                  <textarea
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    rows={3}
                    className="border border-[var(--muted-line)] bg-background p-3 text-[14px] outline-none focus:border-amber"
                  />
                ) : (
                  <input
                    type="text"
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="h-11 border border-[var(--muted-line)] bg-background px-3 text-[14px] outline-none focus:border-amber"
                  />
                )}
                {f.hint && (
                  <div className="font-mono-panel text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {f.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="inline-flex items-center gap-2 bg-amber px-5 py-3 font-mono-panel text-[11px] font-semibold uppercase tracking-[0.2em] text-background disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" />
          {status === "saving" ? "Saving…" : "Save All Settings"}
        </button>
        {status === "saved" && (
          <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
            Saved
          </span>
        )}
        {status === "error" && (
          <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-brake">
            Error saving — check console
          </span>
        )}
        {!configured && (
          <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Preview mode · not persisted
          </span>
        )}
      </div>
    </div>
  );
}
