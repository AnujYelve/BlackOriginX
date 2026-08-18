import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sections = await prisma.cmsPage.findMany({
      where: { pageSlug: "home" },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data: sections });
  } catch (error) {
    console.error("[Homepage CMS GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { sectionKey, content } = await request.json();
    if (!sectionKey || !content) {
      return NextResponse.json({ error: "sectionKey and content required" }, { status: 400 });
    }

    const updated = await prisma.cmsPage.upsert({
      where: {
        pageSlug_sectionKey: {
          pageSlug: "home",
          sectionKey,
        },
      },
      update: { content },
      create: {
        pageSlug: "home",
        sectionKey,
        content,
      },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "HOMEPAGE_UPDATED",
      entity: "CmsPage",
      entityId: updated.id,
      metadata: { sectionKey },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Homepage CMS PATCH]", error);
    return NextResponse.json({ error: "Failed to update homepage CMS section" }, { status: 500 });
  }
}
