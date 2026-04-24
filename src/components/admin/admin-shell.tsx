import Link from "next/link";
import type { ReactNode } from "react";
import { LayoutDashboard, Inbox, FileText, Wrench, ImageIcon, Settings, LogOut } from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--muted-line)] bg-secondary p-6 lg:flex">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 bg-amber" />
            <div className="absolute inset-[3px] bg-secondary" />
            <div className="absolute inset-[5px] bg-amber" />
          </div>
          <div>
            <div className="font-display text-sm font-bold">TEN 2 TEN</div>
            <div className="font-mono-panel text-[9px] uppercase tracking-[0.28em] text-amber">
              Admin
            </div>
          </div>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 border border-transparent px-3 py-2.5 font-mono-panel text-[11px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-[var(--muted-line)] hover:bg-surface hover:text-amber"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 border border-[var(--muted-line)] px-3 py-2.5 font-mono-panel text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-amber hover:text-amber"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </form>
          <Link
            href="/"
            className="mt-3 block text-center font-mono-panel text-[9px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-amber"
          >
            ← View Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto">
        <header className="flex items-center justify-between border-b border-[var(--muted-line)] px-6 py-6 lg:px-10">
          <div>
            <div className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-amber">
              → Admin
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
          </div>
        </header>
        <div className="px-6 py-8 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
