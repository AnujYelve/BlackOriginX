import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { categorySchema } from "@/lib/validators";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { blogs: true } },
      },
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("[Categories GET]", error);
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
    const parsed = categorySchema.parse(body);

    const category = await prisma.category.create({
      data: parsed,
    });

    await logAudit({
      adminId: session.user.id,
      adminEmail: session.user.email,
      action: "CATEGORY_CREATED",
      entity: "Category",
      entityId: category.id,
      metadata: { name: category.name },
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error("[Categories POST]", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
