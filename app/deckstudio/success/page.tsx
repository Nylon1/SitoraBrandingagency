import Link from "next/link";

export const metadata = {
  title: "Pitch Deck Submitted | Sitora DeckStudio",
};

export default function DeckStudioSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070d] px-5 text-white">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d7b35a]">
          Submitted Successfully
        </p>

        <h1 className="mb-6 text-4xl font-semibold md:text-6xl">
          Your pitch deck brief has been received.
        </h1>

        <p className="mb-8 text-lg leading-8 text-white/70">
          Sitora will now review your generated deck draft, improve the
          positioning and prepare the final version for delivery.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-8 py-4 text-sm font-semibold text-black"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}