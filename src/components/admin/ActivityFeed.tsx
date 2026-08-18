"use client";

import { formatDistanceToNow } from "date-fns";
import {
  FileText,
  Mail,
  Users,
  Settings,
  Shield,
  LogIn,
  Image as ImageIcon,
  Tag,
  Globe,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  adminEmail: string | null;
  action: string;
  entity: string | null;
  entityId: string | null;
  createdAt: string;
}

interface ActivityFeedProps {
  entries: AuditEntry[];
  className?: string;
}

const actionIcons: Record<string, typeof FileText> = {
  ADMIN_LOGIN: LogIn,
  BLOG_CREATED: FileText,
  BLOG_UPDATED: FileText,
  BLOG_PUBLISHED: FileText,
  BLOG_DELETED: FileText,
  MESSAGE_READ: Mail,
  MESSAGE_ARCHIVED: Mail,
  MESSAGE_DELETED: Mail,
  MEETING_STATUS_CHANGED: Users,
  MEETING_CONTACTED: Users,
  SETTINGS_UPDATED: Settings,
  HOMEPAGE_UPDATED: Globe,
  SEO_UPDATED: Globe,
  MEDIA_UPLOADED: ImageIcon,
  MEDIA_DELETED: ImageIcon,
  PROFILE_UPDATED: UserCircle,
  CATEGORY_CREATED: Tag,
  TAG_CREATED: Tag,
};

function formatAction(action: string): string {
  return action
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ActivityFeed({ entries, className }: ActivityFeedProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-black/25">
        <Shield size={32} className="mb-3" />
        <p className="text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {entries.map((entry) => {
        const Icon = actionIcons[entry.action] || Shield;
        return (
          <div
            key={entry.id}
            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-black/[0.02] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon size={14} className="text-black/35" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-black/70">
                <span className="font-semibold">{entry.adminEmail || "System"}</span>{" "}
                <span className="text-black/50">{formatAction(entry.action).toLowerCase()}</span>
                {entry.entity && (
                  <span className="text-black/40"> on {entry.entity}</span>
                )}
              </p>
              <p className="text-[11px] text-black/30 mt-0.5">
                {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
