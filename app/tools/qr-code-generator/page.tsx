import type { Metadata } from "next";
import { QRStudio } from "@/components/tools/qr-studio";

export const metadata: Metadata = {
  title: "Free Custom QR Code Generator | Sitora",
  description:
    "Create a branded, high-resolution QR code with custom colours, patterns, frames and your business logo.",
};

export default function QRCodeGeneratorPage() {
  return <QRStudio />;
}