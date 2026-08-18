"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FormField, adminInputClassName } from "@/components/admin/FormField";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { Plus, Copy, Check, Trash2, Image as ImageIcon, Link as LinkIcon, ExternalLink } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  altText: string | null;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    filename: "",
    url: "",
    altText: "",
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const json = await res.json();
      if (json.success) setMediaList(json.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setAddModalOpen(false);
        setForm({ filename: "", url: "", altText: "" });
        fetchMedia();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/media?id=${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Media Library</h1>
          <p className="text-sm text-black/40 mt-1">Manage asset URLs and image links</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={16} /> Add Media URL
        </button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-12 text-center text-black/30 space-y-3">
          <ImageIcon size={40} className="mx-auto text-black/15" />
          <p className="text-sm">No media assets added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:border-black/15 transition-all flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-40 w-full bg-black/[0.02] border-b border-black/5 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.altText || item.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-black/80 truncate">{item.filename}</h4>
                  <p className="text-[11px] text-black/35 truncate font-mono mt-0.5">{item.url}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#b87333] hover:underline"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={12} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy URL
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-black/30 hover:text-black/60 rounded"
                    >
                      <ExternalLink size={12} />
                    </a>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="p-1 text-red-400 hover:text-red-600 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Media URL"
        description="Register a new image or media URL asset into the media selector library."
      >
        <form onSubmit={handleAddMedia} className="space-y-4">
          <FormField label="Asset Filename / Title" required>
            <input
              type="text"
              required
              value={form.filename}
              onChange={(e) => setForm({ ...form, filename: e.target.value })}
              placeholder="e.g. hero-banner.jpg"
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Media URL" required>
            <input
              type="url"
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
              className={adminInputClassName}
            />
          </FormField>

          <FormField label="Alt Text / Description">
            <input
              type="text"
              value={form.altText}
              onChange={(e) => setForm({ ...form, altText: e.target.value })}
              placeholder="Image description..."
              className={adminInputClassName}
            />
          </FormField>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="px-4 py-2 text-xs font-medium border border-black/10 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow"
            >
              Save Media Asset
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Media Asset"
        description="Are you sure you want to remove this media URL from the library?"
        confirmLabel="Remove"
        confirmVariant="danger"
      />
    </div>
  );
}
