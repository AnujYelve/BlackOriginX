import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { blogSchema } from "@/lib/validators";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const categoryId = searchParams.get("categoryId") || "";

    const where: Record<string, unknown> = {};

    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.blog.findMany({
        where: where as any,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
        },
      }),
      prisma.blog.count({ where: where as any }),
    ]);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("[Admin Blogs GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = blogSchema.parse(body);

    const publishedAt = parsed.status === "PUBLISHED" ? new Date() : null;

    const blog = await prisma.blog.create({
      data: {
        title: parsed.title,
        slug: parsed.slug,
        shortDescription: parsed.shortDescription || null,
        content: parsed.content,
        coverImageUrl: parsed.coverImageUrl || null,
        author: parsed.author,
        categoryId: parsed.categoryId || null,
        seoTitle: parsed.seoTitle || null,
        seoDescription: parsed.seoDescription || null,
        status: parsed.status,
        isFeatured: parsed.isFeatured,
        publishedAt,
        tags: {
          create: (parsed.tagIds || []).map((tagId) => ({ tagId })),
        },
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: parsed.status === "PUBLISHED" ? "BLOG_PUBLISHED" : "BLOG_CREATED",
      entity: "Blog",
      entityId: blog.id,
      metadata: { title: blog.title, slug: blog.slug },
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("[Admin Blogs POST]", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
