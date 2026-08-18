import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!blog || blog.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Get related posts in same category or recent posts
    const relatedPosts = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
        id: { not: blog.id },
        ...(blog.categoryId ? { categoryId: blog.categoryId } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        coverImageUrl: true,
        author: true,
        publishedAt: true,
        category: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        blog,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("[Public Single Blog API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
