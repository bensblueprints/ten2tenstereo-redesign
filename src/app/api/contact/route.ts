import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServer } from "@/lib/supabase-server";

const Schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email required"),
  phone: z.string().max(32).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  subject: z.string().max(240).optional().or(z.literal("")),
  message: z.string().min(5, "Message is too short").max(4000),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const hasSupabase =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (hasSupabase) {
      const supabase = await getSupabaseServer();
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        service: parsed.data.service || null,
        message: parsed.data.message,
        source_page: "/contact",
        status: "new",
      });
      if (error) {
        console.error("[contact] supabase insert error", error);
        return NextResponse.json({ error: "Could not save — try calling." }, { status: 500 });
      }
    } else {
      console.log("[contact] form submission (no supabase configured):", parsed.data);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
