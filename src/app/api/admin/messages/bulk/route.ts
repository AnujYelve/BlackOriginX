import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { messageBulkSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { ids, action } = messageBulkSchema.parse(body);

    let updateData: Record<string, unknown> = {};

    switch (action) {
      case "markRead":
        updateData = { isRead: true };
        break;
      case "markUnread":
        updateData = { isRead: false };
        break;
      case "archive":
        updateData = { isArchived: true };
        break;
      case "unarchive":
        updateData = { isArchived: false };
        break;
      case "delete":
        updateData = { isDeleted: true, deletedAt: new Date() };
        break;
      case "restore":
        updateData = { isDeleted: false, deletedAt: null };
        break;
    }

    await prisma.contactMessage.updateMany({
      where: { id: { in: ids } },
      data: updateData,
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MESSAGE_BULK_ACTION",
      entity: "ContactMessage",
      metadata: { action, count: ids.length },
    });

    return NextResponse.json({ success: true, message: `${ids.length} messages updated` });
  } catch (error) {
    console.error("[Messages Bulk API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
