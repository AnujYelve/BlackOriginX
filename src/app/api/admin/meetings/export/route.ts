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
    const meetings = await prisma.investorMeeting.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    });

    // Helper to sanitize CSV field
    const sanitize = (field: string | null | undefined) => {
      if (!field) return '""';
      const escaped = String(field).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const header = [
      "ID",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "Investment Type",
      "Investment Size",
      "Message",
      "Preferred Date",
      "Preferred Time",
      "Status",
      "Contacted",
      "Created At",
    ].join(",");

    const rows = meetings.map((m) =>
      [
        sanitize(m.id),
        sanitize(m.name),
        sanitize(m.company),
        sanitize(m.email),
        sanitize(m.phone),
        sanitize(m.country),
        sanitize(m.investmentType),
        sanitize(m.investmentSize),
        sanitize(m.message),
        sanitize(m.preferredDate),
        sanitize(m.preferredTime),
        sanitize(m.status),
        sanitize(m.isContacted ? "Yes" : "No"),
        sanitize(m.createdAt.toISOString()),
      ].join(",")
    );

    const csvContent = [header, ...rows].join("\n");

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "MEETING_EXPORTED",
      entity: "InvestorMeeting",
      metadata: { count: meetings.length },
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="investor_meetings_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("[Meetings CSV Export API]", error);
    return NextResponse.json({ error: "Failed to export CSV" }, { status: 500 });
  }
}
