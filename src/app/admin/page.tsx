import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getSupabaseServer } from "@/lib/supabase-server";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  service: string | null;
  status: string;
  created_at: string;
};

async function fetchDashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return {
      configured: false,
      newThisWeek: 0,
      total: 0,
      activeServices: 0,
      lastUpdate: null as string | null,
      recent: [] as Lead[],
    };
  }

  const supabase = await getSupabaseServer();
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();

  const [weekCount, totalCount, servicesCount, lastPage, recent] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("pages").select("updated_at").order("updated_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("leads").select("id, name, email, service, status, created_at").order("created_at", { ascending: false }).limit(10),
  ]);

  return {
    configured: true,
    newThisWeek: weekCount.count ?? 0,
    total: totalCount.count ?? 0,
    activeServices: servicesCount.count ?? 0,
    lastUpdate: (lastPage.data?.updated_at as string | undefined) ?? null,
    recent: (recent.data ?? []) as Lead[],
  };
}

export default async function AdminDashboard() {
  const d = await fetchDashboard();

  return (
    <AdminShell title="Dashboard">
      {!d.configured && (
        <div className="mb-8 border border-amber/40 bg-amber/5 p-5 text-[14px] text-foreground/80">
          Supabase isn&apos;t configured yet. Add{" "}
          <code className="font-mono-panel text-amber">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="font-mono-panel text-amber">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
          <code className="font-mono-panel text-amber">.env.local</code> and run{" "}
          <code className="font-mono-panel text-amber">supabase/schema.sql</code> to activate.
        </div>
      )}

      <div className="grid grid-cols-1 gap-px bg-[var(--muted-line)] md:grid-cols-4">
        <Stat label="New Leads (7d)" value={d.newThisWeek} />
        <Stat label="Total Leads" value={d.total} />
        <Stat label="Active Services" value={d.activeServices} />
        <Stat
          label="Last Content Update"
          value={d.lastUpdate ? new Date(d.lastUpdate).toLocaleDateString() : "—"}
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <QuickLink href="/admin/services" label="Add Service" icon={<Plus className="h-3.5 w-3.5" />} />
        <QuickLink href="/admin/leads" label="View All Leads" />
        <QuickLink href="/admin/pages" label="Edit Homepage" />
        <QuickLink href="/admin/media" label="Manage Media" />
      </div>

      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="group inline-flex items-center gap-2 font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-amber"
          >
            View all
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="overflow-x-auto border border-[var(--muted-line)]">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-[var(--muted-line)] text-left font-mono-panel text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {d.recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                d.recent.map((l) => (
                  <tr key={l.id} className="border-b border-[var(--muted-line)] last:border-b-0">
                    <td className="px-4 py-3 font-medium">{l.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.service ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={l.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-background px-6 py-6">
      <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 font-display text-3xl font-bold tracking-tight text-amber">
        {value}
      </div>
    </div>
  );
}

function QuickLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border border-[var(--muted-line)] px-4 py-2.5 font-mono-panel text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-amber hover:text-amber"
    >
      {icon}
      {label}
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const palette: Record<string, string> = {
    new: "border-amber/60 bg-amber/10 text-amber",
    contacted: "border-blue-400/50 bg-blue-400/10 text-blue-300",
    converted: "border-green-400/50 bg-green-400/10 text-green-300",
    closed: "border-muted-foreground/40 bg-muted/30 text-muted-foreground",
  };
  return (
    <span
      className={`inline-block border px-2 py-1 font-mono-panel text-[9px] uppercase tracking-[0.22em] ${
        palette[status] ?? palette.new
      }`}
    >
      {status}
    </span>
  );
}
