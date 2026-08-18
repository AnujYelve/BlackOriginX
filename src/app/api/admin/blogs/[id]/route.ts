import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { blogUpdateSchema } from "@/lib/validators";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("[Admin Blog GET ID]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = blogUpdateSchema.parse(body);

    const currentBlog = await prisma.blog.findUnique({ where: { id } });
    if (!currentBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    let publishedAt = currentBlog.publishedAt;
    if (parsed.status === "PUBLISHED" && currentBlog.status !== "PUBLISHED") {
      publishedAt = new Date();
    } else if (parsed.status === "DRAFT") {
      publishedAt = null;
    }

    const { tagIds, ...blogData } = parsed;

    // Transaction for tags update if tagIds provided
    const blog = await prisma.$transaction(async (tx) => {
      if (tagIds !== undefined) {
        await tx.blogTag.deleteMany({ where: { blogId: id } });
        if (tagIds.length > 0) {
          await tx.blogTag.createMany({
            data: tagIds.map((tagId) => ({ blogId: id, tagId })),
          });
        }
      }

      return tx.blog.update({
        where: { id },
        data: {
          ...blogData,
          publishedAt,
        },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      });
    });

    const action =
      parsed.status === "PUBLISHED"
        ? "BLOG_PUBLISHED"
        : parsed.status === "DRAFT"
        ? "BLOG_UNPUBLISHED"
        : "BLOG_UPDATED";

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action,
      entity: "Blog",
      entityId: blog.id,
      metadata: { title: blog.title, status: blog.status },
    });

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("[Admin Blog PATCH ID]", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const blog = await prisma.blog.delete({ where: { id } });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "BLOG_DELETED",
      entity: "Blog",
      entityId: id,
      metadata: { title: blog.title },
    });

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("[Admin Blog DELETE ID]", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
