import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getPublicSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("[Public Settings API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
