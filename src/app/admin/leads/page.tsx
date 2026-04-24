import { AdminShell } from "@/components/admin/admin-shell";
import { LeadsManager } from "@/components/admin/leads-manager";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

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

export default async function LeadsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  let leads: Lead[] = [];
  if (supabaseUrl) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("leads")
      .select("id, name, email, phone, service, message, status, notes, created_at")
      .order("created_at", { ascending: false });
    leads = (data ?? []) as Lead[];
  }

  return (
    <AdminShell title="Leads">
      <LeadsManager initial={leads} configured={!!supabaseUrl} />
    </AdminShell>
  );
}
