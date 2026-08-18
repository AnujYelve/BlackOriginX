import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { investorMeetingSchema } from "@/lib/validators";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = investorMeetingSchema.parse(body);

    const meeting = await prisma.investorMeeting.create({
      data: {
        name: parsed.name,
        company: parsed.company || null,
        email: parsed.email,
        phone: parsed.phone || null,
        country: parsed.country || null,
        investmentType: parsed.investmentType || null,
        investmentSize: parsed.investmentSize || null,
        message: parsed.message || null,
        preferredDate: parsed.preferredDate || null,
        preferredTime: parsed.preferredTime || null,
      },
    });

    // Send email notification if EMAIL_USER is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
          replyTo: parsed.email,
          subject: `New Investor Meeting Request from ${parsed.name} (${parsed.company || "Individual"})`,
          html: `
            <h2>New Investor Meeting Request</h2>
            <p><strong>Name:</strong> ${parsed.name}</p>
            <p><strong>Company:</strong> ${parsed.company || "N/A"}</p>
            <p><strong>Email:</strong> ${parsed.email}</p>
            <p><strong>Phone:</strong> ${parsed.phone || "N/A"}</p>
            <p><strong>Country:</strong> ${parsed.country || "N/A"}</p>
            <p><strong>Investment Type:</strong> ${parsed.investmentType || "N/A"}</p>
            <p><strong>Investment Size:</strong> ${parsed.investmentSize || "N/A"}</p>
            <p><strong>Preferred Date/Time:</strong> ${parsed.preferredDate || "N/A"} ${parsed.preferredTime || ""}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${parsed.message || "N/A"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send investor meeting notification email:", emailErr);
      }
    }

    return NextResponse.json({ success: true, data: meeting }, { status: 201 });
  } catch (error) {
    console.error("[Investor Meeting API]", error);
    return NextResponse.json({ error: "Failed to submit meeting request" }, { status: 500 });
  }
}
