import { AdminShell } from "@/components/admin/admin-shell";
import { PagesEditor } from "@/components/admin/pages-editor";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

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

const fallback: PageRow[] = [
  { id: "1", slug: "home", title: "Home", meta_description: null, hero_heading: "Car audio. Done right.", hero_subheading: "San Gabriel Valley's most-recommended install shop.", hero_cta_text: "Call (626) 858-2777", updated_at: new Date().toISOString() },
  { id: "2", slug: "services", title: "Services", meta_description: null, hero_heading: "Everything your ride needs.", hero_subheading: "Full service menu for the SGV.", hero_cta_text: "Get a Quote", updated_at: new Date().toISOString() },
  { id: "3", slug: "about", title: "About", meta_description: null, hero_heading: "One shop. One crew. Fifteen years.", hero_subheading: "Locally owned & operated in Azusa.", hero_cta_text: "Stop By", updated_at: new Date().toISOString() },
  { id: "4", slug: "contact", title: "Contact", meta_description: null, hero_heading: "Call. Stop in. Or send a note.", hero_subheading: "Real quotes. Real people.", hero_cta_text: "Send Message", updated_at: new Date().toISOString() },
];

export default async function AdminPagesPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let pages: PageRow[] = fallback;

  if (supabaseUrl) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("pages")
      .select("id, slug, title, meta_description, hero_heading, hero_subheading, hero_cta_text, updated_at")
      .order("slug");
    if (data && data.length > 0) pages = data as PageRow[];
  }

  return (
    <AdminShell title="Pages">
      <PagesEditor initial={pages} configured={!!supabaseUrl} />
    </AdminShell>
  );
}
