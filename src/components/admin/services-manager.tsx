"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Save, Trash2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  display_order: number;
  active: boolean;
};

export function ServicesManager({
  initial,
  configured,
}: {
  initial: ServiceRow[];
  configured: boolean;
}) {
  const [rows, setRows] = useState<ServiceRow[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function persist(next: ServiceRow[]) {
    setRows(next);
    if (!configured) return;
    const supabase = getSupabaseBrowser();
    await Promise.all(
      next.map((r) =>
        supabase
          .from("services")
          .upsert({
            id: r.id,
            slug: r.slug,
            name: r.name,
            short_description: r.short_description,
            display_order: r.display_order,
            active: r.active,
          })
      )
    );
  }

  function move(id: string, direction: -1 | 1) {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) return;
    const swap = idx + direction;
    if (swap < 0 || swap >= rows.length) return;
    const next = [...rows];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    next.forEach((r, i) => (r.display_order = i + 1));
    persist(next);
  }

  function patch(id: string, change: Partial<ServiceRow>) {
    const next = rows.map((r) => (r.id === id ? { ...r, ...change } : r));
    persist(next);
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const next = rows.filter((r) => r.id !== id);
    persist(next);
    if (configured) {
      const supabase = getSupabaseBrowser();
      await supabase.from("services").delete().eq("id", id);
    }
  }

  function addService() {
    const slug = `new-service-${Date.now()}`;
    const newRow: ServiceRow = {
      id: slug,
      slug,
      name: "New Service",
      short_description: "Describe this service.",
      display_order: rows.length + 1,
      active: true,
    };
    persist([...rows, newRow]);
    setEditingId(newRow.id);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">
          Reorder, edit, or add services. Changes reflect on the public site after redeploy.
        </p>
        <button
          type="button"
          onClick={addService}
          className="inline-flex items-center gap-2 border border-amber/50 bg-amber/10 px-3 py-2 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber transition-colors hover:bg-amber hover:text-background"
        >
          <Plus className="h-3 w-3" />
          Add Service
        </button>
      </div>

      <ul className="flex flex-col gap-px bg-[var(--muted-line)]">
        {rows.map((r, i) => {
          const isEditing = editingId === r.id;
          return (
            <li key={r.id} className="bg-background p-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => move(r.id, -1)}
                    disabled={i === 0}
                    className="p-1 text-muted-foreground transition-colors hover:text-amber disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(r.id, 1)}
                    disabled={i === rows.length - 1}
                    className="p-1 text-muted-foreground transition-colors hover:text-amber disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex flex-col gap-3">
                      <input
                        value={r.name}
                        onChange={(e) => patch(r.id, { name: e.target.value })}
                        className="h-10 border border-[var(--muted-line)] bg-surface px-3 text-[14px] font-semibold outline-none focus:border-amber"
                      />
                      <textarea
                        value={r.short_description ?? ""}
                        onChange={(e) => patch(r.id, { short_description: e.target.value })}
                        rows={2}
                        className="border border-[var(--muted-line)] bg-surface p-2 text-[13px] outline-none focus:border-amber"
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 font-mono-panel text-[10px] uppercase tracking-[0.22em]">
                          <input
                            type="checkbox"
                            checked={r.active}
                            onChange={(e) => patch(r.id, { active: e.target.checked })}
                            className="accent-amber"
                          />
                          Active
                        </label>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="inline-flex items-center gap-2 border border-amber/50 bg-amber/10 px-3 py-1.5 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber"
                        >
                          <Save className="h-3 w-3" />
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-base font-bold">{r.name}</span>
                        {!r.active && (
                          <span className="border border-muted-foreground/40 bg-muted/20 px-2 py-0.5 font-mono-panel text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[13px] text-muted-foreground">
                        {r.short_description}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setEditingId(r.id)}
                      className="border border-[var(--muted-line)] px-3 py-1.5 font-mono-panel text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-amber hover:text-amber"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="p-2 text-muted-foreground transition-colors hover:text-brake"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
