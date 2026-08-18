import { PrismaClient, AdminRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // ============================================
  // 1. Seed Admin User
  // ============================================
  const adminEmail = process.env.ADMIN_EMAIL || "admin@blackoriginx.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin",
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`⏭️  Admin user already exists: ${adminEmail}`);
  }

  // ============================================
  // 2. Seed Site Settings
  // ============================================
  const existingSettings = await prisma.siteSettings.findFirst();

  if (!existingSettings) {
    await prisma.siteSettings.create({
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
    console.log("✅ Site settings created with defaults");
  } else {
    console.log("⏭️  Site settings already exist");
  }

  // ============================================
  // 3. Seed Page SEO
  // ============================================
  const pages = [
    {
      pageSlug: "home",
      seoTitle: "BlackOriginX | Redefining the Future of Mobility",
      metaDescription:
        "BlackOriginX is a holding company building and scaling technology-driven brands that redefine the future of mobility.",
      keywords: "technology, mobility, future, investment",
    },
    {
      pageSlug: "about",
      seoTitle: "About Us | BlackOriginX",
      metaDescription:
        "Learn about the mission, vision, values, and journey of BlackOriginX, a forward-looking holding company driving mobility and deep technology.",
      keywords: "about, holding company, venture scaling, deep tech, shivasheesh kumar",
    },
    {
      pageSlug: "brands",
      seoTitle: "Our Brands | BlackOriginX",
      metaDescription:
        "Explore the BlackOriginX brand ecosystem. Discover Torkk, our premium smart electric mobility venture and upcoming ventures.",
      keywords: "brands, torkk, electric scooter, sustainable mobility, clean energy",
    },
    {
      pageSlug: "contact",
      seoTitle: "Contact Us | BlackOriginX",
      metaDescription:
        "Connect with BlackOriginX. Submit partnership inquiries, investment proposals, and general requests.",
      keywords: "contact, investment, partnership, email, address, gurugram, haryana",
    },
    {
      pageSlug: "investors",
      seoTitle: "Investors | BlackOriginX",
      metaDescription:
        "Explore investment opportunities with BlackOriginX. Building India's future mobility ecosystem.",
      keywords: "investors, investment, funding, mobility, partnership",
    },
    {
      pageSlug: "blog",
      seoTitle: "Blog | BlackOriginX",
      metaDescription:
        "Insights, updates, and thought leadership from BlackOriginX on mobility, technology, and innovation.",
      keywords: "blog, insights, mobility, technology, innovation",
    },
    {
      pageSlug: "privacy",
      seoTitle: "Privacy Policy | BlackOriginX",
      metaDescription: "Privacy Policy for BlackOriginX Private Limited.",
      keywords: "privacy, policy, data protection",
    },
    {
      pageSlug: "terms",
      seoTitle: "Terms of Service | BlackOriginX",
      metaDescription: "Terms of Service for BlackOriginX Private Limited.",
      keywords: "terms, service, conditions",
    },
  ];

  for (const page of pages) {
    await prisma.pageSeo.upsert({
      where: { pageSlug: page.pageSlug },
      update: {},
      create: page,
    });
  }
  console.log(`✅ Page SEO entries created/verified for ${pages.length} pages`);

  // ============================================
  // 4. Seed Homepage CMS Sections
  // ============================================
  const homepageSections = [
    {
      pageSlug: "home",
      sectionKey: "hero",
      sortOrder: 0,
      content: {
        headline: "Redefining the Future of Mobility",
        subheadline:
          "Building and scaling technology-driven brands across India's most transformative sectors.",
        ctaButtons: [
          { label: "Explore Our Brands", href: "/brands", variant: "primary" },
          { label: "Learn More", href: "/about", variant: "outline" },
        ],
      },
    },
    {
      pageSlug: "home",
      sectionKey: "stats",
      sortOrder: 1,
      content: {
        items: [
          { value: "2+", label: "Brands Launched" },
          { value: "15+", label: "Team Members" },
          { value: "3+", label: "Sectors Targeted" },
          { value: "2024", label: "Founded" },
        ],
      },
    },
    {
      pageSlug: "home",
      sectionKey: "vision",
      sortOrder: 2,
      content: {
        headline: "Our Vision",
        description:
          "To build an ecosystem of forward-thinking brands that lead the transformation of mobility, infrastructure, and daily life through intelligent technology.",
      },
    },
    {
      pageSlug: "home",
      sectionKey: "mission",
      sortOrder: 3,
      content: {
        headline: "Our Mission",
        description:
          "To identify, incubate, and scale high-impact ventures that solve real-world problems across mobility, logistics, and smart infrastructure — with design, speed, and purpose.",
      },
    },
    {
      pageSlug: "home",
      sectionKey: "values",
      sortOrder: 4,
      content: {
        items: [
          {
            icon: "Lightbulb",
            title: "Innovation First",
            description: "Pushing boundaries to create products that didn't exist before.",
          },
          {
            icon: "Shield",
            title: "Trust & Integrity",
            description: "Building with transparency, honesty, and long-term thinking.",
          },
          {
            icon: "TrendingUp",
            title: "Scalable Growth",
            description: "Designing systems and brands that grow sustainably.",
          },
          {
            icon: "Users",
            title: "User Centric",
            description: "Every decision starts with the people we're building for.",
          },
          {
            icon: "Award",
            title: "Quality Obsession",
            description: "Delivering premium experiences at every level.",
          },
          {
            icon: "Cpu",
            title: "Tech Driven",
            description: "Leveraging cutting-edge technology for real-world impact.",
          },
        ],
      },
    },
    {
      pageSlug: "home",
      sectionKey: "cta",
      sortOrder: 5,
      content: {
        headline: "Ready to Build the Future Together?",
        description:
          "Whether you're an investor, a brand partner, or a future team member — we'd love to hear from you.",
        ctaButtons: [
          { label: "Partner With Us", href: "/contact", variant: "primary" },
          { label: "View Our Brands", href: "/brands", variant: "outline" },
        ],
      },
    },
  ];

  for (const section of homepageSections) {
    await prisma.cmsPage.upsert({
      where: {
        pageSlug_sectionKey: {
          pageSlug: section.pageSlug,
          sectionKey: section.sectionKey,
        },
      },
      update: {},
      create: section,
    });
  }
  console.log(`✅ Homepage CMS sections created/verified (${homepageSections.length} sections)`);

  // ============================================
  // 5. Seed Default Blog Categories
  // ============================================
  const categories = [
    { name: "Technology", slug: "technology", description: "Tech insights and updates" },
    { name: "Mobility", slug: "mobility", description: "Future of mobility and transportation" },
    { name: "Company News", slug: "company-news", description: "Updates from BlackOriginX" },
    { name: "Innovation", slug: "innovation", description: "Innovation and research" },
    { name: "Industry Insights", slug: "industry-insights", description: "Industry trends and analysis" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`✅ Blog categories created/verified (${categories.length} categories)`);

  // ============================================
  // 6. Seed Default Tags
  // ============================================
  const tags = [
    { name: "EV", slug: "ev" },
    { name: "Startup", slug: "startup" },
    { name: "India", slug: "india" },
    { name: "Sustainability", slug: "sustainability" },
    { name: "Leadership", slug: "leadership" },
    { name: "Product Launch", slug: "product-launch" },
    { name: "Funding", slug: "funding" },
    { name: "Partnership", slug: "partnership" },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }
  console.log(`✅ Blog tags created/verified (${tags.length} tags)`);

  console.log("\n🎉 Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
