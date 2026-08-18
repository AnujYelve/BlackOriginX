import type { Metadata } from "next";
import BrandsContent from "./BrandsContent";

export const metadata: Metadata = {
  title: "Our Brands",
  description: "Explore the BlackOriginX brand ecosystem. Discover Torkk, our premium smart electric mobility venture and upcoming ventures.",
  keywords: ["brands", "torkk", "electric scooter", "sustainable mobility", "clean energy"],
};

export default function Brands() {
  return <BrandsContent />;
}
