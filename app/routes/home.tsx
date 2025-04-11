import type { Route } from "./+types/home";
import TimeEntryForm from "@/timetracker/timetracker";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Time Tracker Entry Form" },
    { name: "description", content: "Welcome to SSIS Time Tracker!" },
  ];
}

export default function Home() {
  return <TimeEntryForm />;
}
