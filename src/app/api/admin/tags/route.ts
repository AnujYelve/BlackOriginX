import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { tagSchema } from "@/lib/validators";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ success: true, data: tags });
  } catch (error) {
    console.error("[Tags GET]", error);
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
    const parsed = tagSchema.parse(body);

    const tag = await prisma.tag.create({
      data: parsed,
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "TAG_CREATED",
      entity: "Tag",
      entityId: tag.id,
      metadata: { name: tag.name },
    });

    return NextResponse.json({ success: true, data: tag }, { status: 201 });
  } catch (error) {
    console.error("[Tags POST]", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
