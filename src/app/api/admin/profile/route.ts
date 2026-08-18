import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { logAudit } from "@/lib/audit";
import { profileUpdateSchema } from "@/lib/validators";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error("[Profile GET]", error);
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
    const parsed = profileUpdateSchema.parse(body);

    const admin = await prisma.admin.findUnique({
      where: { id: session.user.id },
    });

    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.name) updateData.name = parsed.name;
    if (parsed.avatarUrl !== undefined) updateData.avatarUrl = parsed.avatarUrl || null;

    if (parsed.newPassword) {
      if (!parsed.currentPassword) {
        return NextResponse.json({ error: "Current password required" }, { status: 400 });
      }
      const isValid = await compare(parsed.currentPassword, admin.password);
      if (!isValid) {
        return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
      }
      updateData.password = await hash(parsed.newPassword, 12);
    }

    const updated = await prisma.admin.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
      },
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "PROFILE_UPDATED",
      entity: "Admin",
      entityId: session.user.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Profile PATCH]", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
