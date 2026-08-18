import { z } from "zod";

// ============================================
// Auth
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ============================================
// Blog
// ============================================

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  shortDescription: z.string().max(500).optional().nullable(),
  content: z.string().min(1, "Content is required"),
  coverImageUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  author: z.string().min(1, "Author is required").max(100),
  categoryId: z.string().optional().nullable(),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDescription: z.string().max(160).optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  tagIds: z.array(z.string()).optional().default([]),
});

export const blogUpdateSchema = blogSchema.partial();

// ============================================
// Category
// ============================================

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  description: z.string().max(500).optional().nullable(),
});

// ============================================
// Tag
// ============================================

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  slug: z.string().min(1, "Slug is required").max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
});

// ============================================
// Contact Message
// ============================================

export const contactStoreSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string().min(1, "Inquiry type is required"),
  subject: z.string().max(300).optional().nullable(),
  message: z.string().min(1, "Message is required").max(5000),
});

export const messageUpdateSchema = z.object({
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const messageBulkSchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID required"),
  action: z.enum(["markRead", "markUnread", "archive", "unarchive", "delete", "restore"]),
});

// ============================================
// Investor Meeting
// ============================================

export const investorMeetingSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  company: z.string().max(200).optional().nullable(),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  investmentType: z.string().max(100).optional().nullable(),
  investmentSize: z.string().max(100).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
});

export const meetingUpdateSchema = z.object({
  status: z.enum(["PENDING", "SCHEDULED", "COMPLETED", "REJECTED"]).optional(),
  isContacted: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

// ============================================
// Site Settings
// ============================================

export const siteSettingsSchema = z.object({
  companyName: z.string().max(200).optional(),
  tagline: z.string().max(300).optional(),
  companyDescription: z.string().max(2000).optional().nullable(),
  logoUrl: z.string().max(500).optional(),
  faviconUrl: z.string().max(500).optional().nullable(),
  websiteUrl: z.string().url().optional().nullable().or(z.literal("")),
  primaryEmail: z.string().email().optional().nullable().or(z.literal("")),
  supportEmail: z.string().email().optional().nullable().or(z.literal("")),
  phoneNumber: z.string().max(30).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  googleMapsEmbedUrl: z.string().max(1000).optional().nullable(),
  linkedinUrl: z.string().url().optional().nullable().or(z.literal("")),
  instagramUrl: z.string().url().optional().nullable().or(z.literal("")),
  twitterUrl: z.string().url().optional().nullable().or(z.literal("")),
  facebookUrl: z.string().url().optional().nullable().or(z.literal("")),
  youtubeUrl: z.string().url().optional().nullable().or(z.literal("")),
  footerCopyright: z.string().max(500).optional().nullable(),
  footerDescription: z.string().max(1000).optional().nullable(),
  seoDefaultTitle: z.string().max(70).optional().nullable(),
  seoDefaultDescription: z.string().max(160).optional().nullable(),
  seoDefaultKeywords: z.string().max(500).optional().nullable(),
  openGraphImage: z.string().max(500).optional().nullable(),
  googleAnalyticsId: z.string().max(50).optional().nullable(),
  googleTagManagerId: z.string().max(50).optional().nullable(),
});

// ============================================
// CMS Page
// ============================================

export const cmsPageUpdateSchema = z.object({
  pageSlug: z.string().min(1),
  sectionKey: z.string().min(1),
  content: z.record(z.string(), z.unknown()),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

// ============================================
// Page SEO
// ============================================

export const pageSeoSchema = z.object({
  pageSlug: z.string().min(1),
  seoTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  keywords: z.string().max(500).optional().nullable(),
  openGraphImage: z.string().max(500).optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable().or(z.literal("")),
});

// ============================================
// Media
// ============================================

export const mediaSchema = z.object({
  filename: z.string().min(1, "Filename is required").max(255),
  url: z.string().url("Must be a valid URL"),
  altText: z.string().max(300).optional().nullable(),
  mimeType: z.string().max(100).optional().nullable(),
  sizeBytes: z.number().int().optional().nullable(),
});

// ============================================
// Profile
// ============================================

export const profileUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).optional(),
  avatarUrl: z.string().url().optional().nullable().or(z.literal("")),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
}).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) return false;
    return true;
  },
  { message: "Current password is required when changing password", path: ["currentPassword"] }
);

// ============================================
// Query Params
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional().default(""),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});
