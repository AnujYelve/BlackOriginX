import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { mediaSchema } from "@/lib/validators";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("[Media GET]", error);
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
    const parsed = mediaSchema.parse(body);

    const media = await prisma.media.create({
      data: {
        ...parsed,
        uploadedById: session.user.id,
      },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MEDIA_UPLOADED",
      entity: "Media",
      entityId: media.id,
      metadata: { filename: media.filename, url: media.url },
    });

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error("[Media POST]", error);
    return NextResponse.json({ error: "Failed to add media entry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const media = await prisma.media.delete({ where: { id } });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MEDIA_DELETED",
      entity: "Media",
      entityId: id,
      metadata: { filename: media.filename },
    });

    return NextResponse.json({ success: true, message: "Media entry deleted" });
  } catch (error) {
    console.error("[Media DELETE]", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
