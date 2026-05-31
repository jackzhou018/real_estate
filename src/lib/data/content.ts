import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  clientHighlights,
  contactContent,
  heroContent,
  newsletterContent,
  profileContent,
  siteConfig
} from "@/lib/site";

/**
 * The full editable content document. Defaults come from `src/lib/site.ts`, which
 * stays the single source of truth for fallback values. The admin content editor
 * saves a document of this shape into the `site_content` table.
 */
export const defaultSiteContent = {
  siteConfig,
  heroContent,
  profileContent,
  clientHighlights,
  newsletterContent,
  contactContent
};

export type SiteContent = typeof defaultSiteContent;

const SITE_CONTENT_ID = "default";

/** Shallow-merge each top-level section so a partial DB document still works. */
function mergeContent(stored: Partial<SiteContent> | null | undefined): SiteContent {
  if (!stored) return defaultSiteContent;
  return {
    siteConfig: { ...defaultSiteContent.siteConfig, ...stored.siteConfig },
    heroContent: { ...defaultSiteContent.heroContent, ...stored.heroContent },
    profileContent: { ...defaultSiteContent.profileContent, ...stored.profileContent },
    clientHighlights: stored.clientHighlights ?? defaultSiteContent.clientHighlights,
    newsletterContent: { ...defaultSiteContent.newsletterContent, ...stored.newsletterContent },
    contactContent: { ...defaultSiteContent.contactContent, ...stored.contactContent }
  };
}

/**
 * Editable site content, merged over defaults. Cached per request. Falls back to
 * defaults when Supabase is unconfigured or the row/query fails, so the site never
 * renders empty.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultSiteContent;

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ID)
    .maybeSingle();

  if (error) {
    console.error("Failed to load site content from Supabase:", error.message);
    return defaultSiteContent;
  }
  return mergeContent(data?.content as Partial<SiteContent> | undefined);
});

export { SITE_CONTENT_ID };
