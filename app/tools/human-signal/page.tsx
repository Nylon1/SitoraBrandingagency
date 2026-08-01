import type { Metadata } from "next";
import { HumanSignalWizard } from "../../../components/human-signal/HumanSignalWizard";

export const metadata: Metadata = {
  title: "HumanSignal — Your LinkedIn writing coach",
  description:
    "Find post ideas, write with guided coaching, review drafts and practise the skills that make professional writing worth reading.",
};

export default function HumanSignalPage() {
  return <HumanSignalWizard />;
}
