import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@prisma/client";

/**
 * Fetches the site settings (single-row design).
 * Creates default settings if none exist.
 * Can be called from server components directly.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  let settings = await prisma.siteSettings.findFirst();

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        companyName: "BlackOriginX",
        tagline: "Redefining the Future of Mobility",
        companyDescription:
          "Building and scaling technology-driven brands that redefine the future of mobility and beyond.",
        logoUrl: "/logo.jpg.jpeg",
        primaryEmail: "contact@blackoriginx.com",
        address: "Gurugram, Haryana",
        linkedinUrl: "https://www.linkedin.com/showcase/blackoriginx/",
        instagramUrl: "https://www.instagram.com/blackoriginx",
        twitterUrl: "https://x.com/blackoriginx_",
        footerDescription:
          "Building and scaling technology-driven brands that redefine the future of mobility and beyond.",
        footerCopyright: `© ${new Date().getFullYear()} BlackOriginX Private Limited. All rights reserved.`,
        seoDefaultTitle: "BlackOriginX | Redefining the Future of Mobility",
        seoDefaultDescription:
          "BlackOriginX is a holding company building and scaling technology-driven brands that redefine the future of mobility.",
        seoDefaultKeywords: "technology, mobility, future, investment",
      },
    });
  }

  return settings;
}

/**
 * Fetches a subset of site settings safe for public API responses.
 * Excludes internal/analytics fields.
 */
export async function getPublicSettings() {
  const settings = await getSiteSettings();
  return {
    companyName: settings.companyName,
    tagline: settings.tagline,
    companyDescription: settings.companyDescription,
    logoUrl: settings.logoUrl,
    faviconUrl: settings.faviconUrl,
    websiteUrl: settings.websiteUrl,
    primaryEmail: settings.primaryEmail,
    supportEmail: settings.supportEmail,
    phoneNumber: settings.phoneNumber,
    address: settings.address,
    googleMapsEmbedUrl: settings.googleMapsEmbedUrl,
    linkedinUrl: settings.linkedinUrl,
    instagramUrl: settings.instagramUrl,
    twitterUrl: settings.twitterUrl,
    facebookUrl: settings.facebookUrl,
    youtubeUrl: settings.youtubeUrl,
    footerCopyright: settings.footerCopyright,
    footerDescription: settings.footerDescription,
    seoDefaultTitle: settings.seoDefaultTitle,
    seoDefaultDescription: settings.seoDefaultDescription,
    seoDefaultKeywords: settings.seoDefaultKeywords,
    openGraphImage: settings.openGraphImage,
  };
}
