import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { SITE_CONTENT_ID, getSiteContent } from "@/lib/data/content";
import { siteContentSchema } from "@/lib/validation";

export async function GET() {
  return NextResponse.json({ content: await getSiteContent() });
}

export async function PUT(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Database is not configured." }, { status: 500 });

  const body = await request.json().catch(() => null);
  const parsed = siteContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid content." }, { status: 400 });
  }

  const { error } = await supabase
    .from("site_content")
    .upsert(
      { id: SITE_CONTENT_ID, content: parsed.data, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ content: parsed.data });
}
