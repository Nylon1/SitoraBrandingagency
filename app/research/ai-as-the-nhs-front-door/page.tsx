import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#07100f] text-white">
      <div className="mx-auto max-w-4xl px-5 py-24 md:px-8">
        <Link href="/research" className="text-sm text-[#7acdc3]">← Sitora Research</Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">AI as the NHS Front Door</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">This Sitora research paper is in final editorial review. The full web edition will be published here shortly.</p>
      </div>
    </main>
  );
}
