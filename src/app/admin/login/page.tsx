"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Lock } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginShell>Loading…</LoginShell>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") ?? "/admin";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const supabase = getSupabaseBrowser();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <LoginShell>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
        <Field label="Email" name="email" type="email" />
        <Field label="Password" name="password" type="password" />

        {error && (
          <div className="border border-brake/50 bg-brake/5 px-4 py-3 text-[13px] text-foreground/80">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group mt-3 inline-flex items-center justify-center gap-3 bg-amber px-6 py-4 font-mono-panel text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:shadow-[0_0_0_4px_rgba(245,165,36,0.15)] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </form>
    </LoginShell>
  );
}

function LoginShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md border border-[var(--muted-line)] bg-surface p-8">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 bg-amber" />
            <div className="absolute inset-[3px] bg-surface" />
            <div className="absolute inset-[5px] bg-amber" />
          </div>
          <div>
            <div className="font-display text-sm font-bold">TEN 2 TEN</div>
            <div className="font-mono-panel text-[9px] uppercase tracking-[0.28em] text-amber">
              Admin Access
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <Lock className="h-4 w-4 text-amber" />
          <h1 className="font-display text-2xl font-bold">Sign in</h1>
        </div>
        <p className="mt-3 text-[14px] text-muted-foreground">
          Restricted area. Credentials are provisioned by the site owner.
        </p>

        {children}
      </div>
    </div>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono-panel text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="h-12 border border-[var(--muted-line)] bg-background px-3 text-[15px] text-foreground outline-none transition-colors focus:border-amber"
      />
    </div>
  );
}
