import { NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  message: string;
  history?: Message[];
}

interface ResponseAction {
  label: string;
  href: string;
  external?: boolean;
}

interface ChatResponseData {
  reply: string;
  actions?: ResponseAction[];
  suggestions?: string[];
}

// Knowledge Base Topics & Intent Matcher
const KNOWLEDGE_BASE = [
  {
    id: "torkk",
    keywords: [
      "torkk",
      "tork",
      "torkk.in",
      "torkk ride",
      "torkk app",
      "torkk captain",
      "zero commission",
      "0% commission",
      "fair rides",
      "ride booking",
      "cab",
      "taxi",
      "driver app",
      "driver earnings",
      "aadhaar verified",
      "emergency sos",
      "live tracking",
      "surge pricing",
    ],
    reply:
      "**Torkk** (*Fairer Rides. Safer Journeys.*) is BlackOriginX's flagship smart urban mobility ecosystem!\n\n🌐 **Official Website**: [https://torkk.in/](https://torkk.in/)\n\n✨ **Key Highlights of Torkk**:\n• **0% Commission for Drivers**: Drivers keep 100% of their trip earnings through transparent, flexible subscription plans.\n• **Verified Drivers**: 100% background-checked & Aadhaar-verified driver partners (*Torkk Captains*).\n• **Transparent Upfront Fares**: Zero surge price manipulation and upfront fair pricing for commuters.\n• **Safety-First Architecture**: Live GPS trip tracking, biometric safety check-ins, and 1-tap Emergency SOS linked directly to police control rooms and Torkk rapid dispatch teams.\n• **AI Smart Matching**: Intelligent algorithm for lightning-fast nearby driver pairing.\n• **Rider & Driver Apps**: Available on Google Play & Apple App Store.\n\n📧 **Support Contact**: `support@torkk.in`",
    actions: [
      { label: "Visit Torkk.in", href: "https://torkk.in/", external: true },
      { label: "Explore Torkk Brand Page", href: "/brands/torkk" },
      { label: "Contact Torkk Support", href: "mailto:support@torkk.in", external: true },
    ],
    suggestions: ["How does 0% commission work?", "What is BlackOriginX?", "Who is the founder?"],
  },
  {
    id: "blackoriginx",
    keywords: [
      "blackoriginx",
      "black origin",
      "holding company",
      "venture studio",
      "what is blackoriginx",
      "about blackoriginx",
      "overview",
      "what do you do",
    ],
    reply:
      "**BlackOriginX** is a technology-first holding company headquartered in Gurugram, Haryana. We build, incubate, and scale next-generation ventures across smart electric mobility, AI logistics, and sustainable infrastructure.\n\nOur flagship venture is **Torkk** ([torkk.in](https://torkk.in/)) — a zero-commission, safety-first ride booking platform built for drivers and commuters across India.",
    actions: [
      { label: "Learn About Us", href: "/about" },
      { label: "Explore Our Brands", href: "/brands" },
      { label: "Visit Torkk.in", href: "https://torkk.in/", external: true },
    ],
    suggestions: ["Tell me about Torkk", "Who is the founder?", "How to invest?"],
  },
  {
    id: "investor",
    keywords: ["invest", "investor", "fund", "equity", "partner", "partnership", "pitch", "capital", "meeting", "schedule"],
    reply:
      "We welcome institutional investors, strategic partners, and venture capital firms looking to back India's next-generation mobility ecosystem.\n\nYou can schedule an investor meeting online or send an email directly to **contact@blackoriginx.com**.",
    actions: [
      { label: "Schedule Investor Meeting", href: "/investors" },
      { label: "Partner Inquiry Form", href: "/contact" },
    ],
    suggestions: ["What is BlackOriginX?", "Tell me about Torkk", "Where are you located?"],
  },
  {
    id: "founder",
    keywords: ["founder", "ceo", "leadership", "team", "shivasheesh", "owner", "management"],
    reply:
      "BlackOriginX was founded by **Shivasheesh Kumar**, a visionary entrepreneur dedicated to building scalable technology platforms and transforming urban mobility across India.\n\nUnder his leadership, BlackOriginX incubates disruptive ventures like **Torkk** ([torkk.in](https://torkk.in/)) with a focus on engineering excellence, zero commission driver empowerment, and long-term sustainability.",
    actions: [{ label: "Read Our Story", href: "/about" }],
    suggestions: ["What is BlackOriginX?", "Tell me about Torkk", "Contact Us"],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "address", "location", "phone", "reach", "office", "gurugram", "haryana"],
    reply:
      "📍 **Headquarters**: Gurugram, Haryana, India\n✉️ **Primary Email**: contact@blackoriginx.com\n🚗 **Torkk Support**: support@torkk.in ([torkk.in](https://torkk.in/))\n💼 **LinkedIn**: [BlackOriginX Showcase](https://www.linkedin.com/showcase/blackoriginx/)\n\nYou can also drop us a direct message using our interactive contact form!",
    actions: [{ label: "Open Contact Form", href: "/contact" }],
    suggestions: ["Schedule Investor Meeting", "Tell me about Torkk", "What is BlackOriginX?"],
  },
  {
    id: "blog",
    keywords: ["blog", "news", "updates", "articles", "insights", "press", "media"],
    reply:
      "Stay updated with our latest industry insights, product launches, clean energy developments, and thought leadership articles on our official blog.",
    actions: [{ label: "Explore Blog", href: "/blog" }],
    suggestions: ["Tell me about Torkk", "What is BlackOriginX?", "How to invest?"],
  },
  {
    id: "privacy",
    keywords: [
      "privacy",
      "policy",
      "privacy policy",
      "data privacy",
      "data protection",
      "data security",
      "data retention",
      "gdpr",
      "grievance",
      "nodal officer",
      "location tracking",
      "terms",
      "legal"
    ],
    reply:
      "🔒 **BlackOriginX & Torkk Privacy Summary**:\n\n" +
      "• **Zero Data Monetization**: We NEVER sell, rent, or use your data for targeted ads.\n" +
      "• **Data Collected**: Account info, Aadhaar/KYC (Captains), and OTP verification SMS.\n" +
      "• **Location Privacy**: Captains tracked ONLY when 'On Duty'; Commuters during active trips.\n" +
      "• **Security & 180-Day Retention**: TLS 1.3 / AES-256 encryption. Data retained max **180 days** post-deletion before full erasure.\n" +
      "• **Contacts**: Grievance Officer: `nodalofficer@torkk.bike` | Support: `support@torkk.in`",
    actions: [
      { label: "Read Full Privacy Policy", href: "/privacy" },
      { label: "Contact Grievance Officer", href: "mailto:nodalofficer@torkk.bike", external: true },
    ],
    suggestions: ["Tell me about Torkk", "What is BlackOriginX?", "Who is the founder?"],
  },
  {
    id: "career",
    keywords: ["career", "job", "hiring", "join", "work", "apply", "position"],
    reply:
      "We are always looking for passionate engineers, designers, product managers, and problem solvers to join our team in building the future of mobility!\n\nSend your resume and portfolio directly to `contact@blackoriginx.com` or reach out via our contact page.",
    actions: [{ label: "Get in Touch", href: "/contact" }],
    suggestions: ["What is BlackOriginX?", "Who is the founder?", "Tell me about Torkk"],
  },
];

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const message = body.message?.trim().toLowerCase() || "";

    if (!message) {
      return NextResponse.json({
        reply: "Hello! How can I assist you with BlackOriginX or Torkk today?",
        suggestions: ["⚡ Tell me about Torkk", "🚀 What is BlackOriginX?", "💼 How to invest?"],
      });
    }

    // Match query against knowledge base
    let matchedItem = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((keyword) => message.includes(keyword))
    );

    if (!matchedItem) {
      // Default intelligent fallback response
      return NextResponse.json<ChatResponseData>({
        reply:
          "Thank you for reaching out! **BlackOriginX** is a technology holding company building innovative mobility and deep-tech platforms — including **Torkk** ([torkk.in](https://torkk.in/)), our 0% commission, safety-first ride platform.\n\nHow can I best assist you?",
        actions: [
          { label: "Visit Torkk.in", href: "https://torkk.in/", external: true },
          { label: "Explore Brands", href: "/brands" },
          { label: "Contact Us", href: "/contact" },
          { label: "Investor Hub", href: "/investors" },
        ],
        suggestions: ["Tell me about Torkk", "What is BlackOriginX?", "How to schedule a meeting?"],
      });
    }

    return NextResponse.json<ChatResponseData>({
      reply: matchedItem.reply,
      actions: matchedItem.actions,
      suggestions: matchedItem.suggestions,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I'm sorry, I ran into a brief issue processing your request. Please try asking again!",
        suggestions: ["Tell me about Torkk", "What is BlackOriginX?"],
      },
      { status: 500 }
    );
  }
}

