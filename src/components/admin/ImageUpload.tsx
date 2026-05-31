"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";

    const data = await response.json().catch(() => ({}));
    if (response.ok && data.url) {
      onChange(data.url);
    } else {
      setError(data.error || "Upload failed. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-hairline bg-soft">
          {value ? (
            <Image src={value} alt="Listing image preview" fill sizes="128px" className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-xs text-muted">No image</span>
          )}
        </div>
        <div>
          <label className="inline-flex cursor-pointer items-center rounded-xl border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-soft">
            {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
          <p className="mt-1 text-xs text-muted">JPG, PNG, WebP, or AVIF. Max 8 MB.</p>
        </div>
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}
