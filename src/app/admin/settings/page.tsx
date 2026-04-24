import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type SettingRow = { key: string; value: string | null };

const DEFAULTS: Record<string, string> = {
  business_name: "Ten 2 Ten Stereo",
  phone: "(626) 858-2777",
  email: "petermichelboshra@icloud.com",
  address: "Azusa, CA 91702",
  tagline: "Car audio. Done right. Since day one.",
  hours_weekdays: "Monday - Saturday: 9AM - 7PM",
  hours_sunday: "Sunday: 10AM - 6PM",
  google_analytics_id: "",
  facebook_pixel_id: "",
};

export default async function AdminSettingsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let values = { ...DEFAULTS };

  if (supabaseUrl) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.from("settings").select("key, value");
    (data as SettingRow[] | null)?.forEach((row) => {
      values[row.key] = row.value ?? "";
    });
  }

  return (
    <AdminShell title="Site Settings">
      <SettingsForm initial={values} configured={!!supabaseUrl} />
    </AdminShell>
  );
}
