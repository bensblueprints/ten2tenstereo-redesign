"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

type PageRow = {
  id: string;
  slug: string;
  title: string | null;
  meta_description: string | null;
  hero_heading: string | null;
  hero_subheading: string | null;
  hero_cta_text: string | null;
  updated_at: string;
};

export function PagesEditor({ initial, configured }: { initial: PageRow[]; configured: boolean }) {
  const [pages, setPages] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id ?? null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const active = pages.find((p) => p.id === activeId);

  function patch(field: keyof PageRow, value: string) {
    if (!active) return;
    setPages((prev) =>
      prev.map((p) => (p.id === active.id ? { ...p, [field]: value } : p))
    );
    setStatus("idle");
  }

  async function save() {
    if (!active) return;
    setStatus("saving");
    if (!configured) {
      setTimeout(() => setStatus("saved"), 300);
      return;
    }
    const supabase = getSupabaseBrowser();
    const { error } = await supabase
      .from("pages")
      .update({
        title: active.title,
        meta_description: active.meta_description,
        hero_heading: active.hero_heading,
        hero_subheading: active.hero_subheading,
        hero_cta_text: active.hero_cta_text,
        updated_at: new Date().toISOString(),
      })
      .eq("id", active.id);
    setStatus(error ? "error" : "saved");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="border border-[var(--muted-line)]">
        <div className="border-b border-[var(--muted-line)] px-4 py-3 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
          All Pages
        </div>
        <ul>
          {pages.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActiveId(p.id)}
                className={`flex w-full items-center justify-between border-b border-[var(--muted-line)] px-4 py-3 text-left text-[13px] transition-colors last:border-b-0 hover:bg-surface ${
                  activeId === p.id ? "bg-surface text-amber" : ""
                }`}
              >
                <span className="font-medium">{p.title}</span>
                <span className="font-mono-panel text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  /{p.slug}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="border border-[var(--muted-line)] p-6">
        {!active ? (
          <div className="text-muted-foreground">Select a page to edit.</div>
        ) : (
          <div className="flex flex-col gap-5">
            <Field label="Page title" value={active.title ?? ""} onChange={(v) => patch("title", v)} />
            <Field
              label="Meta description"
              value={active.meta_description ?? ""}
              onChange={(v) => patch("meta_description", v)}
              textarea
            />
            <div className="my-3 h-px bg-[var(--muted-line)]" />
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
              Hero Content
            </div>
            <Field label="Hero heading" value={active.hero_heading ?? ""} onChange={(v) => patch("hero_heading", v)} />
            <Field
              label="Hero subheading"
              value={active.hero_subheading ?? ""}
              onChange={(v) => patch("hero_subheading", v)}
              textarea
            />
            <Field label="Hero CTA text" value={active.hero_cta_text ?? ""} onChange={(v) => patch("hero_cta_text", v)} />

            <div className="mt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={save}
                disabled={status === "saving"}
                className="inline-flex items-center gap-2 bg-amber px-5 py-3 font-mono-panel text-[11px] font-semibold uppercase tracking-[0.2em] text-background disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                {status === "saving" ? "Saving…" : "Save Changes"}
              </button>
              {status === "saved" && (
                <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
                  Saved
                </span>
              )}
              {status === "error" && (
                <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-brake">
                  Error — check console
                </span>
              )}
              {!configured && (
                <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Preview mode · not persisted
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="border border-[var(--muted-line)] bg-background p-3 text-[14px] outline-none focus:border-amber"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 border border-[var(--muted-line)] bg-background px-3 text-[14px] outline-none focus:border-amber"
        />
      )}
    </div>
  );
}
