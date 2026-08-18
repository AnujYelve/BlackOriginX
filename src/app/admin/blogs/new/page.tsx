"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormField, adminInputClassName, adminTextareaClassName, adminSelectClassName } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaSelector } from "@/components/admin/MediaSelector";
import { ArrowLeft, Save, Globe } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    content: "",
    coverImageUrl: "",
    author: "BlackOriginX Team",
    categoryId: "",
    seoTitle: "",
    seoDescription: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
    isFeatured: false,
    tagIds: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch categories and tags
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/tags").then((r) => r.json()),
    ]).then(([catRes, tagRes]) => {
      if (catRes.success) setCategories(catRes.data);
      if (tagRes.success) setTags(tagRes.data);
    });
  }, []);

  // Auto generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm((prev) => ({ ...prev, title, slug: prev.slug || slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (json.success) {
        router.push("/admin/blogs");
      } else {
        setErrors({ general: json.error || "Failed to create blog post" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Network error. Please try again." });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="flex items-center gap-2 text-sm text-black/50 hover:text-black/70 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, status: "DRAFT" }))}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              form.status === "DRAFT"
                ? "bg-[#b87333]/10 text-[#b87333] border-[#b87333]/30"
                : "border-black/10 text-black/60 hover:bg-black/[0.02]"
            }`}
          >
            Draft Mode
          </button>
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, status: "PUBLISHED" }))}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              form.status === "PUBLISHED"
                ? "bg-green-50 text-green-700 border-green-300"
                : "border-black/10 text-black/60 hover:bg-black/[0.02]"
            }`}
          >
            Publish Mode
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? "Saving..." : form.status === "PUBLISHED" ? "Publish Post" : "Save Draft"}
          </button>
        </div>
      </div>

      {errors.general && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200">
          {errors.general}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Content Editor) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-black/85">Article Content</h3>

            <FormField label="Title" required error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Enter article title..."
                required
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Slug" required helpText="URL segment for this article">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="article-slug"
                required
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Short Description" helpText="Summary snippet for blog listing cards">
              <textarea
                value={form.shortDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
                rows={3}
                placeholder="Brief summary..."
                className={adminTextareaClassName}
              />
            </FormField>

            <FormField label="Content" required error={errors.content}>
              <RichTextEditor
                content={form.content}
                onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                placeholder="Write full article here..."
              />
            </FormField>
          </div>

          {/* SEO Card */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-black/85 flex items-center gap-2">
              <Globe size={18} className="text-[#b87333]" /> SEO Metadata
            </h3>

            <FormField label="SEO Title" helpText="Overrides page title for search engines">
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                placeholder={form.title || "SEO title..."}
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Meta Description" helpText="Search engine description snippet">
              <textarea
                value={form.seoDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                rows={2}
                placeholder={form.shortDescription || "Meta description..."}
                className={adminTextareaClassName}
              />
            </FormField>
          </div>
        </div>

        {/* Right Column (Settings & Cover Image) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Metadata Card */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
            <h3 className="text-base font-bold text-black/85">Article Details</h3>

            <FormField label="Author" required>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                required
                className={adminInputClassName}
              />
            </FormField>

            <FormField label="Category">
              <select
                value={form.categoryId}
                onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                className={adminSelectClassName}
              >
                <option value="">Select Category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Featured Post">
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 rounded border-black/15 text-[#b87333] focus:ring-[#b87333]/20"
                />
                <span className="text-sm font-medium text-black/70">Pin to featured section</span>
              </label>
            </FormField>

            {/* Tags */}
            <FormField label="Tags">
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.map((t) => {
                  const selected = form.tagIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          tagIds: selected
                            ? prev.tagIds.filter((id) => id !== t.id)
                            : [...prev.tagIds, t.id],
                        }));
                      }}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        selected
                          ? "bg-[#b87333] text-white border-[#b87333]"
                          : "bg-black/[0.02] text-black/60 border-black/8 hover:border-black/20"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </FormField>
          </div>

          {/* Cover Image Card */}
          <div className="bg-white border border-black/5 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-black/85">Cover Image</h3>
            <p className="text-xs text-black/40">
              Leave blank to automatically collapse image space on public blog pages.
            </p>
            <MediaSelector
              value={form.coverImageUrl}
              onChange={(url) => setForm((prev) => ({ ...prev, coverImageUrl: url }))}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
