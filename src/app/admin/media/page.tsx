import fs from "node:fs/promises";
import path from "node:path";
import { AdminShell } from "@/components/admin/admin-shell";
import { MediaGrid } from "@/components/admin/media-grid";

export const dynamic = "force-dynamic";

async function listLocalImages() {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f))
      .map((f) => ({ name: f, url: `/images/${f}` }));
  } catch {
    return [];
  }
}

export default async function AdminMediaPage() {
  const images = await listLocalImages();
  return (
    <AdminShell title="Media Library">
      <MediaGrid images={images} />
    </AdminShell>
  );
}
