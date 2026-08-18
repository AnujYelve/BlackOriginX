import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, vision, values, and journey of BlackOriginX, a forward-looking holding company driving mobility and deep technology.",
  keywords: ["about", "holding company", "venture scaling", "deep tech", "shivasheesh kumar"],
};

export default function About() {
  return <AboutContent />;
}
