"use client";

import { useState, useEffect } from "react";
import { StatsCard } from "@/components/admin/StatsCard";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  FileText,
  CheckCircle,
  Edit3,
  Mail,
  MailOpen,
  Users,
  Clock,
  CheckSquare,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface DashboardData {
  stats: {
    blogs: { total: number; published: number; draft: number };
    messages: { total: number; unread: number };
    meetings: { total: number; pending: number; scheduled: number; completed: number; rejected: number };
  };
  recentActivity: Array<{
    id: string;
    adminEmail: string | null;
    action: string;
    entity: string | null;
    entityId: string | null;
    createdAt: string;
  }>;
  latestMessages: Array<{
    id: string;
    name: string;
    email: string;
    inquiryType: string;
    isRead: boolean;
    createdAt: string;
  }>;
  latestMeetings: Array<{
    id: string;
    name: string;
    company: string | null;
    email: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#b87333]/20 border-t-[#b87333] rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-black/40">
        Failed to load dashboard data
      </div>
    );
  }

  const { stats, recentActivity, latestMessages, latestMeetings } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black/85 tracking-tight">Dashboard</h1>
        <p className="text-sm text-black/40 mt-1">Welcome back. Here&apos;s an overview of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Blogs" value={stats.blogs.total} icon={FileText} />
        <StatsCard label="Published" value={stats.blogs.published} icon={CheckCircle} />
        <StatsCard label="Drafts" value={stats.blogs.draft} icon={Edit3} />
        <StatsCard label="Total Messages" value={stats.messages.total} icon={Mail} />
        <StatsCard
          label="Unread Messages"
          value={stats.messages.unread}
          icon={MailOpen}
          trend={stats.messages.unread > 0 ? { value: `${stats.messages.unread} new`, direction: "up" } : undefined}
        />
        <StatsCard label="Investor Requests" value={stats.meetings.total} icon={Users} />
        <StatsCard label="Pending Meetings" value={stats.meetings.pending} icon={Clock} />
        <StatsCard label="Completed" value={stats.meetings.completed} icon={CheckSquare} />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-5 bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5">
            <h3 className="text-sm font-bold text-black/70">Recent Activity</h3>
          </div>
          <ActivityFeed entries={recentActivity} />
        </div>

        {/* Latest Messages */}
        <div className="lg:col-span-4 bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-black/70">Latest Messages</h3>
            <Link href="/admin/messages" className="text-xs text-[#b87333] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-black/[0.03]">
            {latestMessages.length === 0 ? (
              <div className="py-12 text-center text-sm text-black/30">No messages yet</div>
            ) : (
              latestMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href={`/admin/messages/${msg.id}`}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-black/[0.01] transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.isRead ? "bg-black/10" : "bg-[#b87333]"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black/70 truncate">{msg.name}</p>
                    <p className="text-[11px] text-black/35 mt-0.5">
                      {msg.inquiryType} • {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Latest Meetings */}
        <div className="lg:col-span-3 bg-white border border-black/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-black/70">Meetings</h3>
            <Link href="/admin/meetings" className="text-xs text-[#b87333] hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-black/[0.03]">
            {latestMeetings.length === 0 ? (
              <div className="py-12 text-center text-sm text-black/30">No meetings yet</div>
            ) : (
              latestMeetings.map((mtg) => (
                <Link
                  key={mtg.id}
                  href={`/admin/meetings/${mtg.id}`}
                  className="block px-5 py-3 hover:bg-black/[0.01] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-black/70 truncate">{mtg.name}</p>
                    <StatusBadge variant={mtg.status.toLowerCase() as "pending" | "scheduled" | "completed" | "rejected"} />
                  </div>
                  {mtg.company && (
                    <p className="text-[11px] text-black/35 mt-0.5">{mtg.company}</p>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Messages Over Time", subtitle: "Line chart" },
          { title: "Blog Performance", subtitle: "Bar chart" },
          { title: "Meeting Distribution", subtitle: "Pie chart" },
        ].map((chart) => (
          <div
            key={chart.title}
            className="bg-white border border-black/5 rounded-2xl p-6 flex flex-col items-center justify-center h-48"
          >
            <BarChart3 size={28} className="text-black/10 mb-3" />
            <p className="text-sm font-semibold text-black/25">{chart.title}</p>
            <p className="text-[11px] text-black/15 mt-0.5">{chart.subtitle} — Coming Soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
