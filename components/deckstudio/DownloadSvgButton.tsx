"use client";

export default function DownloadSvgButton({
  filename,
  svg,
}: {
  filename: string;
  svg: string;
}) {
  const downloadSvg = () => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadSvg}
      className="rounded-full bg-gradient-to-r from-[#c9a44c] to-[#f5d77a] px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
    >
      Download SVG
    </button>
  );
}