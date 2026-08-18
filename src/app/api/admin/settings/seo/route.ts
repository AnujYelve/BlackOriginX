import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { pageSeoSchema } from "@/lib/validators";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const seoEntries = await prisma.pageSeo.findMany({
      orderBy: { pageSlug: "asc" },
    });
    return NextResponse.json({ success: true, data: seoEntries });
  } catch (error) {
    console.error("[Page SEO GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = pageSeoSchema.parse(body);

    const updated = await prisma.pageSeo.upsert({
      where: { pageSlug: parsed.pageSlug },
      update: parsed,
      create: parsed,
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "SEO_UPDATED",
      entity: "PageSeo",
      entityId: updated.id,
      metadata: { pageSlug: parsed.pageSlug },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Page SEO PATCH]", error);
    return NextResponse.json({ error: "Failed to update page SEO" }, { status: 500 });
  }
}
