import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalMessages,
      unreadMessages,
      totalMeetings,
      pendingMeetings,
      scheduledMeetings,
      completedMeetings,
      rejectedMeetings,
      recentActivity,
      latestMessages,
      latestMeetings,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.blog.count({ where: { status: "DRAFT" } }),
      prisma.contactMessage.count({ where: { isDeleted: false } }),
      prisma.contactMessage.count({ where: { isRead: false, isDeleted: false } }),
      prisma.investorMeeting.count({ where: { isDeleted: false } }),
      prisma.investorMeeting.count({ where: { status: "PENDING", isDeleted: false } }),
      prisma.investorMeeting.count({ where: { status: "SCHEDULED", isDeleted: false } }),
      prisma.investorMeeting.count({ where: { status: "COMPLETED", isDeleted: false } }),
      prisma.investorMeeting.count({ where: { status: "REJECTED", isDeleted: false } }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.contactMessage.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          inquiryType: true,
          isRead: true,
          createdAt: true,
        },
      }),
      prisma.investorMeeting.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          company: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          blogs: { total: totalBlogs, published: publishedBlogs, draft: draftBlogs },
          messages: { total: totalMessages, unread: unreadMessages },
          meetings: {
            total: totalMeetings,
            pending: pendingMeetings,
            scheduled: scheduledMeetings,
            completed: completedMeetings,
            rejected: rejectedMeetings,
          },
        },
        recentActivity,
        latestMessages,
        latestMeetings,
      },
    });
  } catch (error) {
    console.error("[Dashboard API]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
