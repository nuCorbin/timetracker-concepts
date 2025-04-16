import type { Route } from "./+types/tt1";
import TT1 from "@/tt-pocs/tt1/tt1";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Time Tracker Proof of Concept v1" },
    { name: "description", content: "Proof of Concept for Time Tracker" },
  ];
}

export default function TT1Route() {
  return <TT1 />;
} 