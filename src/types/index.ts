// ============================================
// BlackOriginX CMS — Shared TypeScript Types
// ============================================

// Re-export Prisma types for convenience
export type {
  Admin,
  SiteSettings,
  CmsPage,
  PageSeo,
  Blog,
  Category,
  Tag,
  BlogTag,
  ContactMessage,
  InvestorMeeting,
  Media,
  AuditLog,
} from "@prisma/client";

export { AdminRole, BlogStatus, MeetingStatus } from "@prisma/client";

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Dashboard Stats
// ============================================

export interface DashboardStats {
  blogs: {
    total: number;
    published: number;
    draft: number;
  };
  messages: {
    total: number;
    unread: number;
  };
  meetings: {
    total: number;
    pending: number;
    scheduled: number;
    completed: number;
    rejected: number;
  };
}

// ============================================
// Auth Types
// ============================================

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string | null;
}

// ============================================
// CMS Content Shapes
// ============================================

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
  }>;
}

export interface StatsContent {
  items: Array<{
    value: string;
    label: string;
  }>;
}

export interface ValuesContent {
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface TextSectionContent {
  headline: string;
  description: string;
  image?: string;
}

export interface CtaContent {
  headline: string;
  description: string;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
  }>;
}

export interface BrandsContent {
  items: Array<{
    name: string;
    description: string;
    logo: string;
    href: string;
  }>;
}

// ============================================
// Admin Sidebar Navigation
// ============================================

export interface SidebarLink {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

// ============================================
// Audit Log Actions
// ============================================

export const AUDIT_ACTIONS = {
  ADMIN_LOGIN: "ADMIN_LOGIN",
  ADMIN_LOGOUT: "ADMIN_LOGOUT",
  BLOG_CREATED: "BLOG_CREATED",
  BLOG_UPDATED: "BLOG_UPDATED",
  BLOG_PUBLISHED: "BLOG_PUBLISHED",
  BLOG_UNPUBLISHED: "BLOG_UNPUBLISHED",
  BLOG_DELETED: "BLOG_DELETED",
  BLOG_DUPLICATED: "BLOG_DUPLICATED",
  MESSAGE_READ: "MESSAGE_READ",
  MESSAGE_ARCHIVED: "MESSAGE_ARCHIVED",
  MESSAGE_DELETED: "MESSAGE_DELETED",
  MESSAGE_RESTORED: "MESSAGE_RESTORED",
  MESSAGE_BULK_ACTION: "MESSAGE_BULK_ACTION",
  MEETING_STATUS_CHANGED: "MEETING_STATUS_CHANGED",
  MEETING_CONTACTED: "MEETING_CONTACTED",
  MEETING_ARCHIVED: "MEETING_ARCHIVED",
  MEETING_DELETED: "MEETING_DELETED",
  MEETING_EXPORTED: "MEETING_EXPORTED",
  SETTINGS_UPDATED: "SETTINGS_UPDATED",
  HOMEPAGE_UPDATED: "HOMEPAGE_UPDATED",
  SEO_UPDATED: "SEO_UPDATED",
  MEDIA_UPLOADED: "MEDIA_UPLOADED",
  MEDIA_DELETED: "MEDIA_DELETED",
  PROFILE_UPDATED: "PROFILE_UPDATED",
  CATEGORY_CREATED: "CATEGORY_CREATED",
  TAG_CREATED: "TAG_CREATED",
} as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];
