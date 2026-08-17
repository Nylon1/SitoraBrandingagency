import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import ResearchSubmitCta from "./ResearchSubmitCta";

const DOI = "10.5281/zenodo.21978373";

export default function JlrResearchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="border-b border-[#d9b59f] bg-[#fff7f2] text-[#6f432f]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-black">Published research record</span>
            <span className="mx-2 text-[#c56f47]">•</span>
            <span className="font-mono font-bold">DOI: {DOI}</span>
          </div>
          <a
            href={`https://zenodo.org/records/21978373`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-black text-[#9b4f2e] hover:text-[#71351f]"
          >
            Open Zenodo record <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      {children}
      <ResearchSubmitCta />
    </>
  );
}
