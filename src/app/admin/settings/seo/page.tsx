"use client";

import { useState, useEffect } from "react";
import { FormField, adminInputClassName, adminTextareaClassName } from "@/components/admin/FormField";
import { Modal } from "@/components/admin/Modal";
import { Save, Globe, Edit, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface PageSeoItem {
  id: string;
  pageSlug: string;
  seoTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  openGraphImage: string | null;
  canonicalUrl: string | null;
}

export default function AdminPageSeoPage() {
  const [seoList, setSeoList] = useState<PageSeoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<PageSeoItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchSeo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings/seo");
      const json = await res.json();
      if (json.success) setSeoList(json.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings/seo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setEditingItem(null);
        fetchSeo();
      }
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 text-xs text-[#b87333] hover:underline font-semibold mb-1"
          >
            <ArrowLeft size={12} /> Back to Site Settings
          </Link>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Per-Page SEO Manager</h1>
          <p className="text-sm text-black/40 mt-1">
            Customize meta titles, descriptions, keywords, and OpenGraph social images for all public website pages.
          </p>
        </div>
      </div>

      {/* Pages SEO Table / List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {seoList.map((item) => (
            <div
              key={item.pageSlug}
              className="bg-white border border-black/5 rounded-2xl p-6 flex items-start justify-between hover:border-black/15 transition-all shadow-sm"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#b87333]/10 text-[#b87333]">
                    /{item.pageSlug === "home" ? "" : item.pageSlug}
                  </span>
                  <h3 className="text-base font-bold text-black/85">
                    {item.seoTitle || "Default Site Title"}
                  </h3>
                </div>

                <p className="text-xs text-black/60 font-light line-clamp-2">
                  {item.metaDescription || "Default meta description"}
                </p>

                {item.keywords && (
                  <p className="text-[11px] text-black/35 font-mono">
                    Keywords: {item.keywords}
                  </p>
                )}
              </div>

              <button
                onClick={() => setEditingItem(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/10 text-xs font-semibold text-black/70 hover:bg-black/[0.02] transition-all flex-shrink-0"
              >
                <Edit size={14} /> Edit SEO
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit SEO Modal */}
      {editingItem && (
        <Modal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          title={`Edit SEO for /${editingItem.pageSlug}`}
          description="Configure search engine title, description, and keywords for this page."
          size="lg"
        >
          <form onSubmit={handleSaveSeo} className="space-y-4">
            <FormField label="SEO Title">
              <input
                type="text"
                value={editingItem.seoTitle || ""}
                onChange={(e) => setEditingItem({ ...editingItem, seoTitle: e.target.value })}
                placeholder="Page Title | BlackOriginX"
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Meta Description">
              <textarea
                rows={3}
                value={editingItem.metaDescription || ""}
                onChange={(e) => setEditingItem({ ...editingItem, metaDescription: e.target.value })}
                placeholder="Page description snippet..."
                className={adminTextareaClassName}
              />
            </FormField>

            <FormField label="Keywords" helpText="Comma-separated keywords">
              <input
                type="text"
                value={editingItem.keywords || ""}
                onChange={(e) => setEditingItem({ ...editingItem, keywords: e.target.value })}
                placeholder="mobility, tech, venture..."
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="OpenGraph Image URL">
              <input
                type="url"
                value={editingItem.openGraphImage || ""}
                onChange={(e) => setEditingItem({ ...editingItem, openGraphImage: e.target.value })}
                placeholder="https://..."
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Canonical URL">
              <input
                type="url"
                value={editingItem.canonicalUrl || ""}
                onChange={(e) => setEditingItem({ ...editingItem, canonicalUrl: e.target.value })}
                placeholder="https://blackoriginx.com/page"
                className={adminInputClassName}
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-medium border border-black/10 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow"
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save SEO Metadata"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
