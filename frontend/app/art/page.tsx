import PlaceholderPage from "@/components/PlaceholderPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Gallery",
  description: "Realistic pencil sketches and paintings by Aditya Waradkar.",
};

export default function Art() {
  return <PlaceholderPage title="Art Gallery" number="04" />;
}