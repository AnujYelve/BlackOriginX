import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { getSiteSettings } from "@/lib/settings";
import { siteSettingsSchema } from "@/lib/validators";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Settings GET]", error);
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
    const parsed = siteSettingsSchema.parse(body);

    const current = await getSiteSettings();

    const updated = await prisma.siteSettings.update({
      where: { id: current.id },
      data: parsed,
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "SETTINGS_UPDATED",
      entity: "SiteSettings",
      entityId: updated.id,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[Settings PATCH]", error);
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
