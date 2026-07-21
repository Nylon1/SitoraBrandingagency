import { NextResponse } from "next/server";

const allowedDotStyles = new Set([
  "square",
  "rounded",
  "dots",
]);

const allowedFinderStyles = new Set([
  "square",
  "rounded",
]);

function safeHex(value: string | null, fallback: string) {
  if (!value) {
    return fallback;
  }

  const cleaned = value.replace("#", "");

  return /^[0-9a-fA-F]{6}$/.test(cleaned)
    ? cleaned
    : fallback;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const text =
    requestUrl.searchParams.get("text") ||
    "https://sitora.co.uk";

  const foreground = safeHex(
    requestUrl.searchParams.get("foreground"),
    "090b10",
  );

  const background = safeHex(
    requestUrl.searchParams.get("background"),
    "fffaf0",
  );

  const accent = safeHex(
    requestUrl.searchParams.get("accent"),
    "d8b66d",
  );

  const requestedDotStyle =
    requestUrl.searchParams.get("dotStyle");

  const requestedFinderStyle =
    requestUrl.searchParams.get("finderStyle");

  const dotStyle = allowedDotStyles.has(
    requestedDotStyle || "",
  )
    ? requestedDotStyle
    : "rounded";

  const finderStyle = allowedFinderStyles.has(
    requestedFinderStyle || "",
  )
    ? requestedFinderStyle
    : "rounded";

  const requestedSize = Number(
    requestUrl.searchParams.get("size") || 900,
  );

  const size = Math.min(
    Math.max(
      Number.isFinite(requestedSize) ? requestedSize : 900,
      300,
    ),
    1600,
  );

  const qrParameters = new URLSearchParams({
    text,
    size: String(size),
    format: "png",
    dark: foreground,
    light: background,
    margin: "2",
    ecLevel: "H",
    dotScale: dotStyle === "dots" ? "0.7" : "0.9",
    centerImageSizeRatio: "0",
    eyeColor: accent,
    eyeShape:
      finderStyle === "rounded" ? "rounded" : "square",
  });

  const qrResponse = await fetch(
    `https://quickchart.io/qr?${qrParameters.toString()}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (!qrResponse.ok) {
    return NextResponse.json(
      {
        error: "The QR image provider did not respond.",
      },
      {
        status: 502,
      },
    );
  }

  const imageBuffer = await qrResponse.arrayBuffer();

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}