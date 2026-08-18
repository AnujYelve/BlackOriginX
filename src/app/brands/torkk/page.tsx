import type { Metadata } from "next";
import TorkkContent from "./TorkkContent";

export const metadata: Metadata = {
  title: "Torkk | Smart Electric Mobility",
  description: "Torkk is our signature smart electric mobility brand. Discover premium electric two-wheelers, custom battery telemetry, and join the reservation waitlist.",
  keywords: ["Torkk", "electric scooter", "smart vehicle", "EV", "waitlist", "specifications"],
};

export default function TorkkBrand() {
  return <TorkkContent />;
}
