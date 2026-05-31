import { getSiteContent } from "@/lib/data/content";
import { getSupabaseAdmin } from "@/lib/supabase";
import { ContentForm } from "@/components/admin/ContentForm";

export default async function AdminContentPage() {
  const content = await getSiteContent();
  const configured = getSupabaseAdmin() !== null;

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Page content</h1>
      <p className="mt-1 text-sm text-muted">Edit the text shown across the site. Changes go live immediately.</p>

      {!configured ? (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Supabase is not configured yet, so changes here cannot be saved. Add your Supabase keys to{" "}
          <code className="font-mono">.env.local</code> and restart to enable editing.
        </div>
      ) : null}

      <div className="mt-6">
        <ContentForm initialContent={content} />
      </div>
    </div>
  );
}
