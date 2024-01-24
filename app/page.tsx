import { Metadata } from "next";
import Dashboard from "@/pages/Dashboard";

export const metadata: Metadata = {
  title: "Intrims",
};

export default function Home() {
  return <Dashboard />;
}
