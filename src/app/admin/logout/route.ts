import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    const supabase = await getSupabaseServer();
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
