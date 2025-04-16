import type { Route } from "./+types/tt1";
import TT2 from "@/tt-pocs/tt2/tt2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Time Tracker Proof of Concept v2" },
    { name: "description", content: "Proof of Concept for Time Tracker" },
  ];
}

export default function TT2Route() {
  return <TT2 />;
} 