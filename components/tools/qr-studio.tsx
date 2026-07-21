"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  Globe2,
  ImagePlus,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Wifi,
  X,
} from "lucide-react";

type QRCodeStylingInstance =
  import("qr-code-styling").default;

type QRType =
  | "website"
  | "review"
  | "whatsapp"
  | "email"
  | "phone"
  | "wifi";

type DotStyle = "square" | "dots" | "rounded";

type FinderStyle = "square" | "rounded";

type FrameStyle = "none" | "poster" | "ticket" | "badge";

interface QRTypeOption {
  id: QRType;
  label: string;
  placeholder: string;
  icon: typeof Globe2;
}

interface ColourPreset {
  name: string;
  foreground: string;
  background: string;
  accent: string;
}

const qrTypes: QRTypeOption[] = [
  {
    id: "website",
    label: "Website",
    placeholder: "https://yourwebsite.com",
    icon: Globe2,
  },
  {
    id: "review",
    label: "Reviews",
    placeholder: "Paste your Google review link",
    icon: Star,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    placeholder: "+44 7700 900000",
    icon: MessageCircle,
  },
  {
    id: "email",
    label: "Email",
    placeholder: "hello@yourbusiness.com",
    icon: Mail,
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "+44 1254 000000",
    icon: Phone,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    placeholder: "Enter your network name",
    icon: Wifi,
  },
];

const colourPresets: ColourPreset[] = [
  {
    name: "Sitora Gold",
    foreground: "#090b10",
    background: "#fffaf0",
    accent: "#d8b66d",
  },
  {
    name: "Midnight",
    foreground: "#090d1a",
    background: "#f7f9ff",
    accent: "#4f7cff",
  },
  {
    name: "Botanical",
    foreground: "#15382a",
    background: "#f4fbf7",
    accent: "#4fa477",
  },
  {
    name: "Warm",
    foreground: "#431b12",
    background: "#fff8f1",
    accent: "#d87545",
  },
  {
    name: "Editorial",
    foreground: "#111111",
    background: "#ffffff",
    accent: "#df3159",
  },
];

function normaliseDestination(
  type: QRType,
  value: string,
) {
  const cleanValue = value.trim();

  if (!cleanValue) {
    return "https://sitora.co.uk";
  }

  switch (type) {
    case "email":
      return `mailto:${cleanValue}`;

    case "phone":
      return `tel:${cleanValue.replace(/\s/g, "")}`;

    case "whatsapp":
      return `https://wa.me/${cleanValue.replace(
        /[^0-9]/g,
        "",
      )}`;

    case "wifi":
      return `WIFI:T:WPA;S:${cleanValue};P:;H:false;;`;

    default:
      return cleanValue;
  }
}

async function loadImage(source: string) {
  const image = new Image();
  image.src = source;
  await image.decode();

  return image;
}

function drawRoundedRectangle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(
    x,
    y,
    width,
    height,
    radius,
  );
  context.fill();
}

export function QRStudio() {
  const [qrType, setQrType] =
    useState<QRType>("website");

  const [destination, setDestination] = useState(
    "https://sitora.co.uk",
  );

  const [foreground, setForeground] =
    useState("#090b10");

  const [background, setBackground] =
    useState("#fffaf0");

  const [accent, setAccent] =
    useState("#d8b66d");

  const [dotStyle, setDotStyle] =
    useState<DotStyle>("rounded");

  const [finderStyle, setFinderStyle] =
    useState<FinderStyle>("rounded");

  const [frameStyle, setFrameStyle] =
    useState<FrameStyle>("poster");

  const [frameText, setFrameText] = useState(
    "SCAN TO DISCOVER",
  );

  const [logo, setLogo] =
    useState<string | null>(null);

  const [logoScale, setLogoScale] =
    useState(20);

  const [showShadow, setShowShadow] =
    useState(true);

  const [showTilt, setShowTilt] =
    useState(false);

  const [
    downloadModalOpen,
    setDownloadModalOpen,
  ] = useState(false);

  const [email, setEmail] = useState("");

  const [
    marketingConsent,
    setMarketingConsent,
  ] = useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [
    downloadComplete,
    setDownloadComplete,
  ] = useState(false);

  const [error, setError] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const qrPreviewRef =
    useRef<HTMLDivElement>(null);

  const qrInstanceRef =
    useRef<QRCodeStylingInstance | null>(null);

  const activeType = qrTypes.find(
    (type) => type.id === qrType,
  );

  const qrText = useMemo(
    () =>
      normaliseDestination(qrType, destination),
    [qrType, destination],
  );

  useEffect(() => {
    let cancelled = false;
    const previewElement = qrPreviewRef.current;

    async function renderQRCode() {
      const QRCodeStyling = (
        await import("qr-code-styling")
      ).default;

      if (cancelled || !previewElement) {
        return;
      }

      previewElement.innerHTML = "";

      const qrCode = new QRCodeStyling({
        width: 900,
        height: 900,
        type: "canvas",
        data: qrText,
        image: logo || undefined,
        margin: 24,

        qrOptions: {
          errorCorrectionLevel: logo
            ? "H"
            : "Q",
        },

        dotsOptions: {
          color: foreground,
          type:
            dotStyle === "dots"
              ? "dots"
              : dotStyle === "rounded"
                ? "rounded"
                : "square",
        },

        backgroundOptions: {
          color: background,
        },

        cornersSquareOptions: {
          color: accent,
          type:
            finderStyle === "rounded"
              ? "extra-rounded"
              : "square",
        },

        cornersDotOptions: {
          color: accent,
          type:
            finderStyle === "rounded"
              ? "dot"
              : "square",
        },

        imageOptions: {
          crossOrigin: "anonymous",
          margin: 12,
          imageSize: logoScale / 100,
          hideBackgroundDots: true,
        },
      });

      qrInstanceRef.current = qrCode;
      qrCode.append(previewElement);
    }

    void renderQRCode();

    return () => {
      cancelled = true;

      if (previewElement) {
        previewElement.innerHTML = "";
      }
    };
  }, [
    qrText,
    foreground,
    background,
    accent,
    dotStyle,
    finderStyle,
    logo,
    logoScale,
  ]);

  function selectType(type: QRType) {
    setQrType(type);
    setDestination("");
    setError("");
  }

  function handleLogoUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.type.startsWith("image/")
    ) {
      setError(
        "Please select a PNG, JPG or WebP image.",
      );
      return;
    }

    if (selectedFile.size > 2_000_000) {
      setError(
        "Please choose a logo smaller than 2MB.",
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(String(reader.result));
      setError("");
    };

    reader.onerror = () => {
      setError(
        "The logo could not be loaded.",
      );
    };

    reader.readAsDataURL(selectedFile);
  }

  function removeLogo() {
    setLogo(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function resetDesign() {
    setForeground("#090b10");
    setBackground("#fffaf0");
    setAccent("#d8b66d");
    setDotStyle("rounded");
    setFinderStyle("rounded");
    setFrameStyle("poster");
    setFrameText("SCAN TO DISCOVER");
    setLogo(null);
    setLogoScale(20);
    setShowShadow(true);
    setShowTilt(false);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function downloadPNG() {
    const qrCode = qrInstanceRef.current;

    if (!qrCode) {
      throw new Error(
        "The QR code is still loading. Please try again.",
      );
    }

    const rawData =
      await qrCode.getRawData("png");

    if (!(rawData instanceof Blob)) {
      throw new Error(
        "The QR image could not be prepared.",
      );
    }

    const qrObjectUrl =
      URL.createObjectURL(rawData);

    try {
      const qrImage =
        await loadImage(qrObjectUrl);

      const canvas =
        document.createElement("canvas");

      const canvasWidth = 1440;
      const canvasHeight =
        frameStyle === "none"
          ? 1440
          : 1740;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser could not create the download.",
        );
      }

      context.fillStyle = background;
      context.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight,
      );

     if (frameStyle !== "none") {
  context.fillStyle = accent;

  if (frameStyle === "ticket") {
    drawRoundedRectangle(
      context,
      0,
      0,
      canvasWidth,
      canvasHeight,
      90,
    );
  } else if (frameStyle === "badge") {
    drawRoundedRectangle(
      context,
      0,
      0,
      canvasWidth,
      canvasHeight,
      220,
    );
  } else {
    drawRoundedRectangle(
      context,
      0,
      0,
      canvasWidth,
      canvasHeight,
      48,
    );
  }

  context.fillStyle = background;

  drawRoundedRectangle(
    context,
    50,
    50,
    canvasWidth - 100,
    1390,
    38,
  );
}
      const qrSize =
        frameStyle === "none"
          ? 1420
          : 1220;

      const qrX =
        (canvasWidth - qrSize) / 2;

      const qrY =
        frameStyle === "none"
          ? 90
          : 210;

      context.drawImage(
        qrImage,
        qrX,
        qrY,
        qrSize,
        qrSize,
      );

      if (frameStyle !== "none") {
        context.fillStyle = foreground;
        context.textAlign = "center";
        context.textBaseline = "middle";

        context.font =
          "700 68px Arial, sans-serif";

        context.fillText(
          frameText.trim() || "SCAN ME",
          canvasWidth / 2,
          1585,
          1280,
        );

        context.font =
          "32px Arial, sans-serif";

        context.globalAlpha = 0.62;

      

        context.globalAlpha = 1;
      }

      const outputBlob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              resolve,
              "image/png",
              1,
            );
          },
        );

      if (!outputBlob) {
        throw new Error(
          "The finished image could not be created.",
        );
      }

      const downloadUrl =
        URL.createObjectURL(outputBlob);

      const link =
        document.createElement("a");

      link.href = downloadUrl;
      link.download =
        "sitora-custom-qr-code.png";

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(downloadUrl);
    } finally {
      URL.revokeObjectURL(qrObjectUrl);
    }
  }

  async function handleDownloadSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "/api/qr-lead",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            qrType,
            destination,
            marketingConsent,
            design: {
              foreground,
              background,
              accent,
              dotStyle,
              finderStyle,
              frameStyle,
              frameText,
              hasLogo: Boolean(logo),
              logoScale,
            },
          }),
        },
      );

      const result =
        (await response.json()) as {
          success?: boolean;
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Your download could not be prepared.",
        );
      }

      await downloadPNG();
      setDownloadComplete(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03050a] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-14rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[#d8b66d]/15 blur-[140px]" />

        <div className="absolute right-[-12rem] top-[20rem] h-[36rem] w-[36rem] rounded-full bg-[#6d7fd8]/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <header className="relative z-20 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-[26px] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-2xl">
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#d8b66d]/30 bg-[#d8b66d]/10 text-[#d8b66d]">
              <Sparkles className="h-5 w-5" />
            </span>

            <span>
              <strong className="block text-xl tracking-tight">
                Sitora
              </strong>

              <small className="text-white/45">
                Free digital tools
              </small>
            </span>
          </a>

          <div className="hidden items-center gap-2 text-sm text-white/55 sm:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Free high-resolution export
          </div>
        </div>
      </header>

      <section className="relative z-10 px-4 pb-10 pt-10 text-center sm:px-6 lg:pt-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8b66d]/25 bg-[#d8b66d]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#f0cf88]">
            <QrCode className="h-4 w-4" />
            Sitora QR Studio
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] sm:text-7xl lg:text-8xl">
            Turn a QR code into a{" "}
            <span className="bg-gradient-to-r from-[#f2d395] via-[#d8b66d] to-[#fff0c5] bg-clip-text text-transparent">
              brand asset.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/56 sm:text-lg">
            Customise the colour, pattern,
            corners, logo and frame. Preview
            your design live and export a
            high-resolution file ready for
            print or digital use.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-[1500px] items-start gap-5 px-4 pb-24 sm:px-6 lg:grid-cols-[440px_minmax(0,1fr)] lg:px-8">
        <div className="space-y-5 rounded-[32px] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-2xl sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                01 · Destination
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                What should it open?
              </h2>
            </div>

            <button
              type="button"
              onClick={resetDesign}
              className="rounded-xl border border-white/10 p-3 text-white/50 transition hover:bg-white/10 hover:text-white"
              aria-label="Reset design"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {qrTypes.map((type) => {
              const Icon = type.icon;
              const selected =
                qrType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    selectType(type.id)
                  }
                  className={`rounded-2xl border p-3 text-left transition ${
                    selected
                      ? "border-[#d8b66d]/60 bg-[#d8b66d]/12 text-[#f3d591]"
                      : "border-white/8 bg-black/15 text-white/45 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <Icon className="mb-3 h-5 w-5" />

                  <span className="block text-xs font-semibold">
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white/70">
              {activeType?.label} details
            </span>

            <input
              value={destination}
              onChange={(event) =>
                setDestination(
                  event.target.value,
                )
              }
              placeholder={
                activeType?.placeholder
              }
              className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-[#d8b66d]/60"
            />
          </label>

          <div className="border-t border-white/8 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
              02 · Brand style
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Build your visual identity
            </h3>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {colourPresets.map(
              (preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setForeground(
                      preset.foreground,
                    );
                    setBackground(
                      preset.background,
                    );
                    setAccent(
                      preset.accent,
                    );
                  }}
                  title={preset.name}
                  aria-label={`Use ${preset.name} colour palette`}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 transition hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${preset.foreground} 0 45%, ${preset.accent} 45% 70%, ${preset.background} 70%)`,
                  }}
                />
              ),
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ColourInput
              label="Pattern"
              value={foreground}
              onChange={setForeground}
            />

            <ColourInput
              label="Background"
              value={background}
              onChange={setBackground}
            />

            <ColourInput
              label="Corners"
              value={accent}
              onChange={setAccent}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Pattern style"
              value={dotStyle}
              onChange={(value) =>
                setDotStyle(
                  value as DotStyle,
                )
              }
              options={[
                {
                  value: "square",
                  label: "Square",
                },
                {
                  value: "rounded",
                  label: "Rounded",
                },
                {
                  value: "dots",
                  label: "Dots",
                },
              ]}
            />

            <SelectField
              label="Corner style"
              value={finderStyle}
              onChange={(value) =>
                setFinderStyle(
                  value as FinderStyle,
                )
              }
              options={[
                {
                  value: "square",
                  label: "Square",
                },
                {
                  value: "rounded",
                  label: "Rounded",
                },
              ]}
            />
          </div>

          <div className="border-t border-white/8 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
              03 · Graphic frame
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {(
              [
                ["none", "None"],
                ["poster", "Poster"],
                ["ticket", "Ticket"],
                ["badge", "Badge"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setFrameStyle(value)
                }
                className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                  frameStyle === value
                    ? "border-[#d8b66d]/55 bg-[#d8b66d]/12 text-[#f0cf88]"
                    : "border-white/10 bg-black/15 text-white/45 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white/70">
              Frame wording
            </span>

            <input
              value={frameText}
              onChange={(event) =>
                setFrameText(
                  event.target.value.toUpperCase(),
                )
              }
              maxLength={32}
              className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-white outline-none focus:border-[#d8b66d]/60"
            />
          </label>

          <div className="rounded-2xl border border-dashed border-white/15 bg-black/15 p-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.07] text-[#d8b66d]">
                  <ImagePlus className="h-5 w-5" />
                </span>

                <span>
                  <strong className="block text-sm">
                    Upload your logo
                  </strong>

                  <small className="text-white/40">
                    PNG, JPG or WebP under
                    2MB
                  </small>
                </span>
              </span>

              <span className="text-xs font-semibold text-[#d8b66d]">
                Choose
              </span>
            </button>

            {logo && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                  <span>Logo size</span>
                  <span>
                    {logoScale}%
                  </span>
                </div>

                <input
                  type="range"
                  min="12"
                  max="30"
                  value={logoScale}
                  onChange={(event) =>
                    setLogoScale(
                      Number(
                        event.target.value,
                      ),
                    )
                  }
                  className="w-full accent-[#d8b66d]"
                />

                <button
                  type="button"
                  onClick={removeLogo}
                  className="mt-3 w-full rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/55 transition hover:bg-white/10 hover:text-white"
                >
                  Remove logo
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ToggleButton
              active={showShadow}
              label="Depth shadow"
              onClick={() =>
                setShowShadow(
                  !showShadow,
                )
              }
            />

            <ToggleButton
              active={showTilt}
              label="Editorial tilt"
              onClick={() =>
                setShowTilt(!showTilt)
              }
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        <div className="relative min-h-[760px] self-start overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-5 sm:p-8 lg:sticky lg:top-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(216,182,109,.16),transparent_35%)]" />

          <div className="relative flex min-h-[720px] flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b66d]">
                  Live preview
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Your finished artwork
                </h2>
              </div>

              <Palette className="h-5 w-5 text-white/35" />
            </div>

            <div className="flex flex-1 items-center justify-center py-10">
              <motion.div
                animate={{
                  rotate: showTilt
                    ? -3
                    : 0,
                  scale: showTilt
                    ? 0.96
                    : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
                className={`relative w-full max-w-[540px] ${
                  showShadow
                    ? "drop-shadow-[0_40px_70px_rgba(0,0,0,.55)]"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    frameStyle === "ticket"
                      ? "rounded-[38px]"
                      : frameStyle ===
                          "badge"
                        ? "rounded-[90px]"
                        : "rounded-[28px]"
                  }`}
                  style={{
                    background:
                      frameStyle === "none"
                        ? background
                        : accent,
                    padding:
                      frameStyle === "none"
                        ? "18px"
                        : "30px",
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-[22px] p-5"
                    style={{
                      background,
                    }}
                  >
                    <div
                      ref={qrPreviewRef}
                      aria-label="Custom QR code preview"
                      className="aspect-square w-full overflow-hidden [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:object-contain [&>svg]:h-full [&>svg]:w-full"
                      style={{
                        background,
                      }}
                    />
                  </div>

                  {frameStyle !==
                    "none" && (
                    <div
                      className="px-4 pb-2 pt-6 text-center"
                      style={{
                        color:
                          foreground,
                      }}
                    >
                      <p className="text-lg font-black tracking-[0.16em] sm:text-2xl">
                        {frameText ||
                          "SCAN ME"}
                      </p>

                     
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setDownloadComplete(
                    false,
                  );
                  setDownloadModalOpen(
                    true,
                  );
                }}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#d8b66d] px-6 py-4 font-bold text-[#080a0f] shadow-[0_18px_55px_rgba(216,182,109,.22)] transition hover:-translate-y-1 hover:bg-[#f1cf86]"
              >
                <ArrowDownToLine className="h-5 w-5" />
                Download high-resolution
                PNG
              </button>

              <div className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 text-sm text-white/45">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Commercial use
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {downloadModalOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#0a0d14] p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() =>
                  setDownloadModalOpen(
                    false,
                  )
                }
                className="absolute right-5 top-5 rounded-xl border border-white/10 p-2 text-white/45 hover:bg-white/10 hover:text-white"
                aria-label="Close download window"
              >
                <X className="h-4 w-4" />
              </button>

              {!downloadComplete ? (
                <>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#d8b66d]/12 text-[#d8b66d]">
                    <ArrowDownToLine className="h-6 w-6" />
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                    Your QR code is ready
                  </h2>

                  <p className="mt-3 leading-7 text-white/50">
                    Enter your email
                    address to unlock the
                    high-resolution
                    download.
                  </p>

                  <form
                    onSubmit={
                      handleDownloadSubmit
                    }
                    className="mt-6 space-y-4"
                  >
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-white/70">
                        Email address
                      </span>

                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(
                          event,
                        ) =>
                          setEmail(
                            event.target
                              .value,
                          )
                        }
                        placeholder="you@company.com"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 outline-none focus:border-[#d8b66d]/60"
                      />
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4">
                      <input
                        type="checkbox"
                        checked={
                          marketingConsent
                        }
                        onChange={(
                          event,
                        ) =>
                          setMarketingConsent(
                            event.target
                              .checked,
                          )
                        }
                        className="mt-1 accent-[#d8b66d]"
                      />

                      <span className="text-sm leading-6 text-white/50">
                        I would like
                        occasional digital
                        growth tips and free
                        business resources
                        from Sitora.
                      </span>
                    </label>

                    {error && (
                      <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#d8b66d] px-6 py-4 font-bold text-[#080a0f] transition hover:bg-[#f1cf86] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting
                        ? "Preparing download..."
                        : "Download my QR code"}
                    </button>

                    <p className="text-center text-xs leading-5 text-white/32">
                      Marketing consent is
                      optional and is not
                      required to download
                      your QR code.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/12 text-emerald-300">
                    <Check className="h-7 w-7" />
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold">
                    Download complete
                  </h2>

                  <p className="mt-3 leading-7 text-white/50">
                    Your high-resolution
                    QR code has been
                    downloaded.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setDownloadModalOpen(
                        false,
                      );
                      setDownloadComplete(
                        false,
                      );
                    }}
                    className="mt-7 rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    Return to QR Studio
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

interface ColourInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColourInput({
  label,
  value,
  onChange,
}: ColourInputProps) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold text-white/50">
        {label}
      </span>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2">
        <input
          type="color"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent"
        />

        <span className="hidden text-[10px] uppercase text-white/40 sm:block">
          {value}
        </span>
      </div>
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange: (value: string) => void;
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold text-white/50">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-[#0a0d14] px-3 py-3 text-sm text-white outline-none focus:border-[#d8b66d]/60"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface ToggleButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function ToggleButton({
  active,
  label,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-[#d8b66d]/50 bg-[#d8b66d]/10 text-[#f0cf88]"
          : "border-white/10 bg-black/15 text-white/45"
      }`}
    >
      {label}
    </button>
  );
}