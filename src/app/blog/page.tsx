"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Search, Calendar, User, ArrowRight, Sparkles, Tag as TagIcon } from "lucide-react";
import { format } from "date-fns";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  coverImageUrl: string | null;
  author: string;
  publishedAt: string | null;
  createdAt: string;
  isFeatured: boolean;
  category: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "9",
        ...(selectedCategory ? { category: selectedCategory } : {}),
        ...(search ? { search } : {}),
      });

      const res = await fetch(`/api/blog?${params}`);
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data);
        setTotalPages(json.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch public blogs:", err);
    }
    setLoading(false);
  }, [page, selectedCategory, search]);

  useEffect(() => {
    // Fetch categories
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCategories(json.data);
      });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const featuredBlog = blogs.find((b) => b.isFeatured) || blogs[0];
  const regularBlogs = blogs.filter((b) => b.id !== featuredBlog?.id);

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-black">
      <Container>
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16 px-4"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.25em] text-[#e5a93c] font-bold mb-4 block"
          >
            Insights & Thought Leadership
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 text-brand-white"
          >
            Latest Perspectives
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-brand-light-grey font-light leading-relaxed mb-8"
          >
            Exploring the technology, strategy, and vision driving the future of mobility and enterprise scale across India and beyond.
          </motion.p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 px-4 sm:px-0">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => { setSelectedCategory(""); setPage(1); }}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow-md"
                  : "bg-black/[0.03] text-brand-light-grey border border-black/8 hover:text-brand-white"
              }`}
            >
              All Articles
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? "bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow-md"
                    : "bg-black/[0.03] text-brand-light-grey border border-black/8 hover:text-brand-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-light-grey/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..."
              className="w-full input-premium focus:ring-1 focus:ring-[#e5a93c]/35 pl-11 pr-4 py-2.5 text-xs font-light"
            />
          </div>
        </div>

        {/* Featured Post Hero Card (if available on page 1 with no search filter) */}
        {featuredBlog && page === 1 && !search && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 px-4 sm:px-0"
          >
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="group block bg-black/[0.01] border border-black/8 rounded-3xl overflow-hidden hover:border-black/20 transition-all duration-500 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Column — conditional layout collapse if coverImageUrl is empty */}
                {featuredBlog.coverImageUrl ? (
                  <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] overflow-hidden">
                    <Image
                      src={featuredBlog.coverImageUrl}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 lg:hidden" />
                  </div>
                ) : null}

                {/* Content Column */}
                <div className={`${featuredBlog.coverImageUrl ? "lg:col-span-5" : "lg:col-span-12"} p-8 md:p-12 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#b87333]/15 text-[#e5a93c] border border-[#b87333]/25 flex items-center gap-1">
                        <Sparkles size={12} /> Featured
                      </span>
                      {featuredBlog.category && (
                        <span className="text-xs text-brand-light-grey/60 font-medium">
                          {featuredBlog.category.name}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-brand-white group-hover:text-[#e5a93c] transition-colors mb-4 leading-tight">
                      {featuredBlog.title}
                    </h2>

                    {featuredBlog.shortDescription && (
                      <p className="text-sm md:text-base text-brand-light-grey/80 font-light leading-relaxed mb-8 line-clamp-3">
                        {featuredBlog.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-black/5 text-xs text-brand-light-grey/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User size={14} className="text-[#b87333]" />
                        {featuredBlog.author}
                      </span>
                      {featuredBlog.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {format(new Date(featuredBlog.publishedAt), "MMM d, yyyy")}
                        </span>
                      )}
                    </div>

                    <span className="text-[#e5a93c] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Blog Card Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 text-brand-light-grey/50">
            <p className="text-lg font-light mb-2">No articles found</p>
            <p className="text-xs">Try selecting a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0 mb-16">
            {(page === 1 && !search && !selectedCategory ? regularBlogs : blogs).map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col h-full bg-black/[0.01] border border-black/8 rounded-2xl overflow-hidden hover:border-black/20 hover:shadow-lg transition-all duration-300"
                >
                  {/* Cover Image — Conditional layout collapse if coverImageUrl is null */}
                  {blog.coverImageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  ) : null}

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {blog.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#e5a93c] mb-3 block">
                          {blog.category.name}
                        </span>
                      )}

                      <h3 className="text-xl font-bold tracking-tight text-brand-white group-hover:text-[#e5a93c] transition-colors mb-3 leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      {blog.shortDescription && (
                        <p className="text-xs text-brand-light-grey/70 font-light leading-relaxed mb-6 line-clamp-3">
                          {blog.shortDescription}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5 text-[11px] text-brand-light-grey/40">
                      <span>{blog.author}</span>
                      {blog.publishedAt && (
                        <span>{format(new Date(blog.publishedAt), "MMM d, yyyy")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-full text-xs font-semibold transition-all ${
                  page === i + 1
                    ? "bg-gradient-to-r from-[#b87333] to-[#e5a93c] text-white shadow-md"
                    : "bg-black/[0.03] text-brand-light-grey border border-black/8 hover:text-brand-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
