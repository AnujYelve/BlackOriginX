import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactStoreSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactStoreSchema.parse(body);

    // Extract IP and User-Agent from headers
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null;
    const userAgent = request.headers.get("user-agent") || null;

    await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        inquiryType: parsed.inquiryType,
        subject: parsed.subject || null,
        message: parsed.message,
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ success: true, message: "Message stored" }, { status: 201 });
  } catch (error) {
    console.error("[Contact Store API]", error);
    return NextResponse.json({ error: "Failed to store message" }, { status: 500 });
  }
}
