import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesManager } from "@/components/admin/services-manager";
import { getSupabaseServer } from "@/lib/supabase-server";
import { services as seedServices } from "@/lib/content";

export const dynamic = "force-dynamic";

type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  display_order: number;
  active: boolean;
};

export default async function AdminServicesPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let rows: ServiceRow[] = seedServices.map((s, i) => ({
    id: s.slug,
    slug: s.slug,
    name: s.name,
    short_description: s.short,
    display_order: i + 1,
    active: true,
  }));

  if (supabaseUrl) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("services")
      .select("id, slug, name, short_description, display_order, active")
      .order("display_order");
    if (data && data.length > 0) rows = data as ServiceRow[];
  }

  return (
    <AdminShell title="Services">
      <ServicesManager initial={rows} configured={!!supabaseUrl} />
    </AdminShell>
  );
}
