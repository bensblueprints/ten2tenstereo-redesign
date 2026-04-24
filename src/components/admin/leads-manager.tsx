"use client";

import { Fragment, useMemo, useState } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

const STATUSES = ["all", "new", "contacted", "converted", "closed"] as const;
type StatusFilter = (typeof STATUSES)[number];

export function LeadsManager({
  initial,
  configured,
}: {
  initial: Lead[];
  configured: boolean;
}) {
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !(l.name?.toLowerCase().includes(q) ||
            l.email?.toLowerCase().includes(q) ||
            l.service?.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [leads, filter, search]);

  function exportCsv() {
    const headers = ["name", "email", "phone", "service", "status", "message", "created_at"];
    const rows = filtered.map((l) =>
      headers.map((h) => JSON.stringify((l[h as keyof Lead] ?? "") as string | number)).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ten2ten-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function updateLead(id: string, patch: Partial<Lead>) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    if (!configured) return;
    const supabase = getSupabaseBrowser();
    await supabase.from("leads").update(patch).eq("id", id);
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (!configured) return;
    const supabase = getSupabaseBrowser();
    await supabase.from("leads").delete().eq("id", id);
  }

  return (
    <div>
      {!configured && (
        <div className="mb-6 border border-amber/40 bg-amber/5 p-4 text-[13px] text-foreground/80">
          Preview mode — connect Supabase to persist changes.
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`border px-3 py-1.5 font-mono-panel text-[10px] uppercase tracking-[0.22em] transition-colors ${
                filter === s
                  ? "border-amber bg-amber text-background"
                  : "border-[var(--muted-line)] text-muted-foreground hover:border-amber hover:text-amber"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, service…"
              className="h-9 w-64 border border-[var(--muted-line)] bg-background pl-8 pr-3 text-[13px] outline-none focus:border-amber"
            />
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 border border-[var(--muted-line)] px-3 py-2 font-mono-panel text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-amber hover:text-amber"
          >
            <Download className="h-3 w-3" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-[var(--muted-line)]">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-[var(--muted-line)] text-left font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                  No leads match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <Fragment key={l.id}>
                  <tr
                    onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                    className="cursor-pointer border-b border-[var(--muted-line)] transition-colors hover:bg-surface"
                  >
                    <td className="px-4 py-3 font-medium">{l.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.service ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateLead(l.id, { status: e.target.value })}
                        className="border border-[var(--muted-line)] bg-background px-2 py-1 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-foreground focus:border-amber focus:outline-none"
                      >
                        {STATUSES.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLead(l.id);
                        }}
                        className="text-muted-foreground transition-colors hover:text-brake"
                        aria-label="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  {expanded === l.id && (
                    <tr className="border-b border-[var(--muted-line)] bg-surface">
                      <td colSpan={7} className="px-4 py-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <div className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
                              Message
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-[14px] text-foreground/85">
                              {l.message ?? "—"}
                            </p>
                          </div>
                          <div>
                            <div className="font-mono-panel text-[10px] uppercase tracking-[0.22em] text-amber">
                              Internal Notes
                            </div>
                            <textarea
                              defaultValue={l.notes ?? ""}
                              rows={4}
                              onBlur={(e) => updateLead(l.id, { notes: e.currentTarget.value })}
                              placeholder="Add note (auto-saves on blur)…"
                              className="mt-2 w-full border border-[var(--muted-line)] bg-background p-3 text-[14px] outline-none focus:border-amber"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
