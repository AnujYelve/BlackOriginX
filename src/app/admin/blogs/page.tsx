"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmModal } from "@/components/admin/Modal";
import { format } from "date-fns";
import { Plus, Edit, Copy, Trash2, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
  category: { name: string } | null;
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search,
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/admin/blogs?${params}`);
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data);
        setTotal(json.pagination.total);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
    setLoading(false);
  }, [page, pageSize, search, statusFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDuplicate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}/duplicate`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Failed to duplicate blog:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/blogs/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const columns: Column<Blog>[] = [
    {
      key: "title",
      header: "Title",
      render: (blog) => (
        <div>
          <p className="font-semibold text-black/85 truncate max-w-[280px]">{blog.title}</p>
          <p className="text-[11px] text-black/35 font-mono">/blog/{blog.slug}</p>
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      render: (blog) => <span className="text-xs text-black/60">{blog.author}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (blog) => (
        <span className="text-xs text-black/50">{blog.category?.name || "Uncategorized"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (blog) => (
        <div className="flex items-center gap-1.5">
          <StatusBadge variant={blog.status.toLowerCase() as "published" | "draft"} />
          {blog.isFeatured && (
            <span className="text-[10px] bg-[#b87333]/10 text-[#b87333] font-bold px-1.5 py-0.5 rounded">
              Featured
            </span>
          )}
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (blog) => (
        <span className="text-xs text-black/40">
          {blog.publishedAt
            ? format(new Date(blog.publishedAt), "MMM d, yyyy")
            : `${format(new Date(blog.createdAt), "MMM d, yyyy")} (Created)`}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (blog) => (
        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
          {blog.status === "PUBLISHED" && (
            <Link
              href={`/blog/${blog.slug}`}
              target="_blank"
              className="p-1.5 text-black/40 hover:text-black/70 rounded-lg hover:bg-black/[0.03]"
              title="Preview"
            >
              <ExternalLink size={14} />
            </Link>
          )}
          <button
            onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
            className="p-1.5 text-black/40 hover:text-black/70 rounded-lg hover:bg-black/[0.03]"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDuplicate(blog.id)}
            className="p-1.5 text-black/40 hover:text-black/70 rounded-lg hover:bg-black/[0.03]"
            title="Duplicate"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={() => setDeleteId(blog.id)}
            className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black/85 tracking-tight">Blog Management</h1>
          <p className="text-sm text-black/40 mt-1">{total} blog posts total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={16} />
          Create Blog Post
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex gap-1 bg-black/[0.02] rounded-xl p-1 border border-black/5">
          {[
            { key: "", label: "All" },
            { key: "PUBLISHED", label: "Published" },
            { key: "DRAFT", label: "Drafts" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setStatusFilter(tab.key); setPage(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === tab.key
                  ? "bg-white text-black/80 shadow-sm border border-black/5"
                  : "text-black/40 hover:text-black/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <SearchBar
          value={search}
          onSearch={(q) => { setSearch(q); setPage(1); }}
          placeholder="Search blogs..."
          className="w-full sm:w-80"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={blogs}
        keyExtractor={(b) => b.id}
        onRowClick={(b) => router.push(`/admin/blogs/${b.id}/edit`)}
        loading={loading}
        emptyMessage="No blog posts found"
        emptyIcon={<FileText size={40} className="mb-3 text-black/15" />}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}
