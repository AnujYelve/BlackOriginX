import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { messageUpdateSchema } from "@/lib/validators";
import type { AuditAction } from "@/types";

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
    const message = await prisma.contactMessage.findUnique({ where: { id } });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("[Message Detail API]", error);
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
    const parsed = messageUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = { ...parsed };
    if (parsed.isDeleted === true) {
      updateData.deletedAt = new Date();
    }
    if (parsed.isDeleted === false) {
      updateData.deletedAt = null;
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    // Determine audit action
    let action: AuditAction = "MESSAGE_READ";
    if (parsed.isArchived !== undefined) action = parsed.isArchived ? "MESSAGE_ARCHIVED" : "MESSAGE_READ";
    if (parsed.isDeleted === true) action = "MESSAGE_DELETED";
    if (parsed.isDeleted === false) action = "MESSAGE_RESTORED";

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action,
      entity: "ContactMessage",
      entityId: id,
    });

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("[Message Update API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
    await prisma.contactMessage.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MESSAGE_DELETED",
      entity: "ContactMessage",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("[Message Delete API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
