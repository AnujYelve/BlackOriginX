import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { meetingUpdateSchema } from "@/lib/validators";
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
    const meeting = await prisma.investorMeeting.findUnique({ where: { id } });

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: meeting });
  } catch (error) {
    console.error("[Admin Meeting GET ID]", error);
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
    const parsed = meetingUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = { ...parsed };
    if (parsed.isDeleted === true) updateData.deletedAt = new Date();
    if (parsed.isDeleted === false) updateData.deletedAt = null;

    const meeting = await prisma.investorMeeting.update({
      where: { id },
      data: updateData,
    });

    let action: AuditAction = "MEETING_STATUS_CHANGED";
    if (parsed.isContacted !== undefined) action = "MEETING_CONTACTED";
    if (parsed.isDeleted === true) action = "MEETING_DELETED";

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action,
      entity: "InvestorMeeting",
      entityId: id,
      metadata: { status: meeting.status, isContacted: meeting.isContacted },
    });

    return NextResponse.json({ success: true, data: meeting });
  } catch (error) {
    console.error("[Admin Meeting PATCH ID]", error);
    return NextResponse.json({ error: "Failed to update meeting" }, { status: 500 });
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
    await prisma.investorMeeting.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MEETING_DELETED",
      entity: "InvestorMeeting",
      entityId: id,
    });

    return NextResponse.json({ success: true, message: "Meeting deleted" });
  } catch (error) {
    console.error("[Admin Meeting DELETE ID]", error);
    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}
