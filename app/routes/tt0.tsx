import type { Route } from "./+types/tt0";
import TT0 from "@/tt-pocs/tt0/tt0";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Time Tracker Proof of Concept v0" },
    { name: "description", content: "Proof of Concept for Time Tracker" },
  ];
}

export default function TT0Route() {
  return <TT0 />;
}
