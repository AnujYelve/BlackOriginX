import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User, Tag as TagIcon, Share2, Sparkles, ArrowRight } from "lucide-react";

interface SingleBlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SingleBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog || blog.status !== "PUBLISHED") {
    return { title: "Article Not Found | BlackOriginX" };
  }

  return {
    title: blog.seoTitle || `${blog.title} | BlackOriginX`,
    description: blog.seoDescription || blog.shortDescription || "",
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.shortDescription || "",
      images: blog.coverImageUrl ? [blog.coverImageUrl] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });

  if (!blog || blog.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch related posts
  const relatedPosts = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
      id: { not: blog.id },
      ...(blog.categoryId ? { categoryId: blog.categoryId } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-brand-black">
      <Container>
        <article className="max-w-4xl mx-auto px-4 sm:px-0">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#e5a93c] font-bold mb-8 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-10">
            {blog.category && (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#b87333]/15 text-[#e5a93c] border border-[#b87333]/25 mb-4">
                {blog.category.name}
              </span>
            )}

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-brand-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {blog.shortDescription && (
              <p className="text-lg text-brand-light-grey/80 font-light leading-relaxed mb-8">
                {blog.shortDescription}
              </p>
            )}

            {/* Author & Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-black/8 text-xs text-brand-light-grey/60">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 font-medium text-brand-white">
                  <User size={14} className="text-[#b87333]" />
                  {blog.author}
                </span>
                {blog.publishedAt && (
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {format(new Date(blog.publishedAt), "MMMM d, yyyy")}
                  </span>
                )}
              </div>

              {/* Tags list */}
              {blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <TagIcon size={12} className="text-brand-light-grey/40" />
                  <div className="flex gap-1.5">
                    {blog.tags.map(({ tag }) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 rounded bg-black/[0.03] border border-black/5 text-[11px] text-brand-light-grey/70"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Cover Image — Conditional layout collapse: if coverImageUrl is empty, image section completely disappears */}
          {blog.coverImageUrl ? (
            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden mb-12 border border-black/8 shadow-2xl">
              <Image
                src={blog.coverImageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {/* Article HTML Content */}
          <div
            className="prose prose-invert prose-lg max-w-none text-brand-light-grey/90 font-light leading-relaxed mb-16
              prose-headings:font-bold prose-headings:text-brand-white prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-6
              prose-a:text-[#e5a93c] prose-a:underline hover:prose-a:text-brand-white
              prose-blockquote:border-l-2 prose-blockquote:border-[#b87333] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-brand-light-grey/70
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
              prose-img:rounded-2xl prose-img:border prose-img:border-black/10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <section className="pt-12 border-t border-black/8">
              <h3 className="text-2xl font-bold tracking-tight text-brand-white mb-8 flex items-center gap-2">
                <Sparkles size={18} className="text-[#e5a93c]" /> Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group block bg-black/[0.01] border border-black/8 rounded-2xl p-5 hover:border-black/20 transition-all duration-300"
                  >
                    {rel.category && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#e5a93c] mb-2 block">
                        {rel.category.name}
                      </span>
                    )}
                    <h4 className="text-base font-bold text-brand-white group-hover:text-[#e5a93c] transition-colors mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    {rel.publishedAt && (
                      <p className="text-[11px] text-brand-light-grey/40">
                        {format(new Date(rel.publishedAt), "MMM d, yyyy")}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </Container>
    </div>
  );
}
