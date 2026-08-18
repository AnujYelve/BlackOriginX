import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const original = await prisma.blog.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!original) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const newSlug = `${original.slug}-copy-${Date.now()}`;
    const newTitle = `${original.title} (Copy)`;

    const duplicated = await prisma.blog.create({
      data: {
        title: newTitle,
        slug: newSlug,
        shortDescription: original.shortDescription,
        content: original.content,
        coverImageUrl: original.coverImageUrl,
        author: original.author,
        categoryId: original.categoryId,
        seoTitle: original.seoTitle,
        seoDescription: original.seoDescription,
        status: "DRAFT",
        isFeatured: false,
        publishedAt: null,
        tags: {
          create: original.tags.map((t) => ({ tagId: t.tagId })),
        },
      },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "BLOG_DUPLICATED",
      entity: "Blog",
      entityId: duplicated.id,
      metadata: { originalId: original.id, newTitle: duplicated.title },
    });

    return NextResponse.json({ success: true, data: duplicated }, { status: 201 });
  } catch (error) {
    console.error("[Blog Duplicate API]", error);
    return NextResponse.json({ error: "Failed to duplicate blog" }, { status: 500 });
  }
}
