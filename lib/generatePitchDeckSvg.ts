type DeckData = Record<string, string>;

const escapeSvg = (value?: string) => {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const cleanNumber = (value?: string, fallback = 0) => {
  if (!value) return fallback;
  const number = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(number) ? number : fallback;
};

const fallback = "To be refined during Sitora review.";

const shorten = (value?: string, max = 240) => {
  if (!value || value.trim().length === 0) return fallback;
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const splitLines = (text?: string, maxLength = 44, maxLines = 4) => {
  const words = shorten(text, maxLength * maxLines).split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = `${current} ${word}`.trim();

    if (next.length <= maxLength) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, maxLines);
};

const multiText = ({
  text,
  x,
  y,
  size = 24,
  lineHeight = 34,
  color = "#334155",
  weight = 400,
  maxLength = 44,
  maxLines = 4,
}: {
  text?: string;
  x: number;
  y: number;
  size?: number;
  lineHeight?: number;
  color?: string;
  weight?: number;
  maxLength?: number;
  maxLines?: number;
}) => {
  return splitLines(text, maxLength, maxLines)
    .map(
      (line, i) => `
  <text x="${x}" y="${y + i * lineHeight}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">
    ${escapeSvg(line)}
  </text>`
    )
    .join("");
};

const defs = `
  <defs>
    <linearGradient id="darkBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080B12"/>
      <stop offset="60%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>

    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7E7A3"/>
      <stop offset="50%" stop-color="#D6B35F"/>
      <stop offset="100%" stop-color="#A67C2D"/>
    </linearGradient>

    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.16"/>
    </filter>
  </defs>
`;

const footer = (businessName: string, slideNumber: number, dark = false) => `
  <text x="80" y="830" font-family="Inter, Arial, sans-serif" font-size="18" fill="${dark ? "rgba(255,255,255,0.45)" : "#64748B"}">
    ${escapeSvg(businessName)} — Investor Pitch Deck
  </text>

  <text x="1460" y="830" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="800" fill="${dark ? "#D6B35F" : "#A67C2D"}">
    ${String(slideNumber).padStart(2, "0")}
  </text>
`;

const darkShell = ({
  businessName,
  slideNumber,
  children,
}: {
  businessName: string;
  slideNumber: number;
  children: string;
}) => `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="1600" height="900" fill="url(#darkBg)"/>
  <circle cx="1320" cy="160" r="360" fill="#D6B35F" opacity="0.055"/>
  <circle cx="1420" cy="235" r="140" fill="none" stroke="#D6B35F" stroke-width="2" opacity="0.28"/>
  ${children}
  ${footer(businessName, slideNumber, true)}
</svg>`;

const lightShell = ({
  businessName,
  slideNumber,
  children,
}: {
  businessName: string;
  slideNumber: number;
  children: string;
}) => `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  <rect width="1600" height="900" fill="#F8F5EE"/>
  <rect width="1600" height="900" fill="#FFFFFF" opacity="0.42"/>
  <circle cx="1460" cy="90" r="320" fill="#D6B35F" opacity="0.08"/>
  ${children}
  ${footer(businessName, slideNumber, false)}
</svg>`;

const eyebrow = (label: string, dark = false) => `
  <text x="80" y="90" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="7" fill="${dark ? "#D6B35F" : "#A67C2D"}">
    ${escapeSvg(label).toUpperCase()}
  </text>
`;

const title = (text: string, dark = false, y = 162, size = 54) => `
  <text x="80" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="850" fill="${dark ? "#FFFFFF" : "#111827"}">
    ${escapeSvg(text)}
  </text>
`;

const imageBox = ({
  x,
  y,
  w,
  h,
  url,
  label,
  dark = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  url?: string;
  label: string;
  dark?: boolean;
}) => {
  if (url) {
    return `
      <clipPath id="clip-${x}-${y}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28"/>
      </clipPath>
      <image href="${escapeSvg(url)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip-${x}-${y})"/>
    `;
  }

  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${dark ? "rgba(255,255,255,0.06)" : "#FFFFFF"}" stroke="${dark ? "rgba(255,255,255,0.12)" : "#E7DDC8"}" filter="url(#shadow)"/>
    <text x="${x + 35}" y="${y + h / 2}" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="800" fill="#A67C2D">
      ${escapeSvg(label)}
    </text>
    <text x="${x + 35}" y="${y + h / 2 + 38}" font-family="Inter, Arial, sans-serif" font-size="18" fill="${dark ? "rgba(255,255,255,0.55)" : "#64748B"}">
      Replace with project photo in Figma
    </text>
  `;
};

const card = ({
  x,
  y,
  w,
  h,
  number,
  heading,
  body,
  dark = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  number: string;
  heading: string;
  body?: string;
  dark?: boolean;
}) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${dark ? "rgba(255,255,255,0.06)" : "#FFFFFF"}" stroke="${dark ? "rgba(255,255,255,0.12)" : "#E7DDC8"}" filter="url(#shadow)"/>
  <text x="${x + 30}" y="${y + 48}" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="850" letter-spacing="5" fill="#A67C2D">
    ${number}
  </text>
  <text x="${x + 30}" y="${y + 92}" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="850" fill="${dark ? "#FFFFFF" : "#111827"}">
    ${escapeSvg(heading)}
  </text>
  ${multiText({
    text: body,
    x: x + 30,
    y: y + 132,
    size: 19,
    lineHeight: 28,
    color: dark ? "rgba(255,255,255,0.68)" : "#475569",
    maxLength: 31,
    maxLines: 4,
  })}
`;

const cover = (data: DeckData) => {
  const businessName = data.business_name || "Founder Deck";

  return darkShell({
    businessName,
    slideNumber: 1,
    children: `
      ${eyebrow("Sitora DeckStudio", true)}

      <text x="80" y="245" font-family="Inter, Arial, sans-serif" font-size="92" font-weight="900" fill="#FFFFFF">
        ${escapeSvg(businessName)}
      </text>

      ${multiText({
        text: data.one_line_pitch || "Investor-ready pitch deck prepared for review.",
        x: 86,
        y: 325,
        size: 32,
        lineHeight: 46,
        color: "rgba(255,255,255,0.74)",
        maxLength: 58,
        maxLines: 3,
      })}

      <rect x="82" y="500" width="350" height="68" rx="34" fill="url(#gold)"/>
      <text x="122" y="544" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="850" fill="#080B12">
        Investor Deck Draft
      </text>

      ${imageBox({
        x: 960,
        y: 310,
        w: 470,
        h: 300,
        url: data.hero_image_url,
        label: "Hero visual",
        dark: true,
      })}
    `,
  });
};

const vision = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 2,
    children: `
      ${eyebrow("Vision")}
      ${title("The bigger opportunity")}

      <rect x="80" y="230" width="810" height="380" rx="34" fill="#FFFFFF" stroke="#E7DDC8" filter="url(#shadow)"/>
      ${multiText({
        text: data.business_summary,
        x: 130,
        y: 315,
        size: 31,
        lineHeight: 46,
        color: "#334155",
        maxLength: 43,
        maxLines: 5,
      })}

      <rect x="970" y="230" width="450" height="380" rx="34" fill="#111827" filter="url(#shadow)"/>
      <text x="1020" y="315" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="850" letter-spacing="6" fill="#D6B35F">
        POSITION
      </text>
      ${multiText({
        text: data.market_position || "A specialist premium brand in a market full of general providers.",
        x: 1020,
        y: 385,
        size: 31,
        lineHeight: 45,
        color: "rgba(255,255,255,0.82)",
        maxLength: 24,
        maxLines: 5,
      })}
    `,
  });

const problem = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 3,
    children: `
      ${eyebrow("Problem")}
      ${title("The pain in the market")}

      ${card({ x: 80, y: 245, w: 450, h: 320, number: "01", heading: "Customer pain", body: data.problem })}
      ${card({ x: 575, y: 245, w: 450, h: 320, number: "02", heading: "Current options", body: data.current_solution })}
      ${card({ x: 1070, y: 245, w: 450, h: 320, number: "03", heading: "Why it matters", body: data.problem_impact })}

      <rect x="80" y="620" width="1440" height="68" rx="24" fill="#111827"/>
      <text x="120" y="664" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="750" fill="#FFFFFF">
        The opportunity: solve a visible, high-friction problem with a specialist premium service.
      </text>
    `,
  });

const solution = (data: DeckData, businessName: string) =>
  darkShell({
    businessName,
    slideNumber: 4,
    children: `
      ${eyebrow("Solution", true)}
      ${title("A better way forward", true)}

      <rect x="80" y="245" width="640" height="340" rx="34" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" filter="url(#shadow)"/>
      <text x="130" y="325" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="850" fill="#FFFFFF">The offer</text>
      ${multiText({
        text: data.solution,
        x: 132,
        y: 390,
        size: 26,
        lineHeight: 38,
        color: "rgba(255,255,255,0.72)",
        maxLength: 36,
        maxLines: 4,
      })}

      <rect x="800" y="245" width="640" height="340" rx="34" fill="rgba(214,179,95,0.10)" stroke="rgba(214,179,95,0.35)" filter="url(#shadow)"/>
      <text x="850" y="325" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="850" fill="#FFFFFF">How it works</text>
      ${multiText({
        text: data.how_it_works,
        x: 852,
        y: 390,
        size: 26,
        lineHeight: 38,
        color: "rgba(255,255,255,0.72)",
        maxLength: 36,
        maxLines: 4,
      })}
    `,
  });

const market = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 5,
    children: `
      ${eyebrow("Market")}
      ${title("A market ready for change")}

      ${card({ x: 80, y: 245, w: 450, h: 300, number: "01", heading: "Market size", body: data.market_size })}
      ${card({ x: 575, y: 245, w: 450, h: 300, number: "02", heading: "Timing", body: data.market_trends })}
      ${card({ x: 1070, y: 245, w: 450, h: 300, number: "03", heading: "Region", body: data.target_region })}

      <rect x="80" y="590" width="1440" height="90" rx="28" fill="#FFFFFF" stroke="#E7DDC8"/>
      <text x="120" y="646" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="800" fill="#111827">
        Specialist positioning creates separation from generic providers.
      </text>
    `,
  });

const productJourney = (data: DeckData, businessName: string) => {
  const steps = [
    data.customer_journey_step_1 || "Enquiry",
    data.customer_journey_step_2 || "Review",
    data.customer_journey_step_3 || "Quote",
    data.customer_journey_step_4 || "Delivery",
    data.customer_journey_step_5 || "Aftercare",
  ];

  return darkShell({
    businessName,
    slideNumber: 6,
    children: `
      ${eyebrow("Product / Service", true)}
      ${title("What the customer gets", true)}

      <rect x="80" y="230" width="560" height="360" rx="34" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" filter="url(#shadow)"/>
      <text x="125" y="305" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="850" fill="#FFFFFF">Core offer</text>
      ${multiText({
        text: data.product_features,
        x: 127,
        y: 365,
        size: 25,
        lineHeight: 36,
        color: "rgba(255,255,255,0.72)",
        maxLength: 31,
        maxLines: 5,
      })}

      <text x="720" y="285" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="850" fill="#FFFFFF">Customer journey</text>

      ${steps
        .map((step, i) => {
          const x = 720 + i * 155;
          return `
            <circle cx="${x}" cy="405" r="42" fill="url(#gold)"/>
            <text x="${x - 11}" y="414" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#080B12">${i + 1}</text>
            ${
              i < steps.length - 1
                ? `<line x1="${x + 48}" y1="405" x2="${x + 107}" y2="405" stroke="#D6B35F" stroke-width="3" opacity="0.7"/>`
                : ""
            }
            <text x="${x - 55}" y="490" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="750" fill="rgba(255,255,255,0.78)">
              ${escapeSvg(step)}
            </text>
          `;
        })
        .join("")}
    `,
  });
};

const businessModel = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 7,
    children: `
      ${eyebrow("Business Model")}
      ${title("How the business makes money")}

      ${card({
        x: 80,
        y: 240,
        w: 340,
        h: 260,
        number: "01",
        heading: "Bespoke Projects",
        body: data.business_model || "Revenue from made-to-measure specialist projects.",
      })}

      ${card({
        x: 455,
        y: 240,
        w: 340,
        h: 260,
        number: "02",
        heading: "Measuring & Advice",
        body: "Specialist consultation, design advice, measuring support and project planning.",
      })}

      ${card({
        x: 830,
        y: 240,
        w: 340,
        h: 260,
        number: "03",
        heading: "Installations",
        body: "Premium tracks, hardware, fitting and professional installation services.",
      })}

      ${card({
        x: 1205,
        y: 240,
        w: 315,
        h: 260,
        number: "04",
        heading: "Upgrades",
        body: data.revenue_streams || "Lining, interlining, voiles, layered solutions and repeat projects.",
      })}

      <rect x="80" y="555" width="1440" height="120" rx="30" fill="#111827" filter="url(#shadow)"/>
      <text x="130" y="610" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="850" letter-spacing="5" fill="#D6B35F">
        COMMERCIAL LOGIC
      </text>
      <text x="130" y="655" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="750" fill="#FFFFFF">
        Premium specialist projects can create higher-value orders than standard curtain retail.
      </text>
    `,
  });

const traction = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 8,
    children: `
      ${eyebrow("Traction / Proof")}
      ${title("Evidence of momentum")}

      <rect x="80" y="230" width="1440" height="120" rx="30" fill="#111827" filter="url(#shadow)"/>

      <text x="140" y="285" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF">
        ${escapeSvg(data.metric_1_value || "—")}
      </text>
      <text x="140" y="320" font-family="Inter, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.65)">
        ${escapeSvg(data.metric_1_label || "Metric one")}
      </text>

      <text x="610" y="285" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF">
        ${escapeSvg(data.metric_2_value || "—")}
      </text>
      <text x="610" y="320" font-family="Inter, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.65)">
        ${escapeSvg(data.metric_2_label || "Metric two")}
      </text>

      <text x="1080" y="285" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="900" fill="#FFFFFF">
        ${escapeSvg(data.metric_3_value || "—")}
      </text>
      <text x="1080" y="320" font-family="Inter, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.65)">
        ${escapeSvg(data.metric_3_label || "Metric three")}
      </text>

      ${imageBox({ x: 80, y: 400, w: 440, h: 230, url: data.project_image_1, label: "Project image 1" })}
      ${imageBox({ x: 580, y: 400, w: 440, h: 230, url: data.project_image_2, label: "Project image 2" })}
      ${imageBox({ x: 1080, y: 400, w: 440, h: 230, url: data.project_image_3, label: "Project image 3" })}
    `,
  });

const advantage = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 9,
    children: `
      ${eyebrow("Competitive Advantage")}
      ${title("Why this can win")}

      <rect x="80" y="230" width="640" height="390" rx="34" fill="#FFFFFF" stroke="#E7DDC8" filter="url(#shadow)"/>
      <text x="130" y="305" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="850" fill="#111827">Advantage</text>
      ${multiText({
        text: data.competitive_advantage,
        x: 132,
        y: 365,
        size: 25,
        lineHeight: 36,
        color: "#475569",
        maxLength: 35,
        maxLines: 5,
      })}

      <rect x="820" y="230" width="620" height="390" rx="34" fill="#111827" filter="url(#shadow)"/>
      <line x1="890" y1="520" x2="1360" y2="520" stroke="#64748B" stroke-width="2"/>
      <line x1="1030" y1="300" x2="1030" y2="570" stroke="#64748B" stroke-width="2"/>

      <text x="880" y="590" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.55)">Generic</text>
      <text x="1260" y="590" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.55)">Specialist</text>
      <text x="840" y="325" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.55)">Premium</text>
      <text x="840" y="555" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.55)">Basic</text>

      <circle cx="1275" cy="355" r="16" fill="url(#gold)"/>
      <text x="1305" y="363" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="850" fill="#FFFFFF">
        ${escapeSvg(businessName)}
      </text>

      <circle cx="930" cy="530" r="10" fill="#94A3B8"/>
      <text x="950" y="537" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">
        ${escapeSvg(data.competitor_1 || "Generic retailers")}
      </text>

      <circle cx="990" cy="470" r="10" fill="#94A3B8"/>
      <text x="1010" y="477" font-family="Inter, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">
        ${escapeSvg(data.competitor_2 || "Local fitters")}
      </text>
    `,
  });

const teamSlide = (data: DeckData, businessName: string) =>
  lightShell({
    businessName,
    slideNumber: 10,
    children: `
      ${eyebrow("Team")}
      ${title("The people behind the business")}

      ${card({
        x: 80,
        y: 240,
        w: 440,
        h: 300,
        number: "01",
        heading: data.team_member_1_name || "Founder",
        body:
          `${data.team_member_1_role || "Founder"} — ${
            data.team_member_1_bio || "Role and short bio to be refined during Sitora review."
          }`,
      })}

      ${card({
        x: 580,
        y: 240,
        w: 440,
        h: 300,
        number: "02",
        heading: data.team_member_2_name || "Team Member",
        body:
          `${data.team_member_2_role || "Operations / Delivery"} — ${
            data.team_member_2_bio || "Role and short bio to be refined during Sitora review."
          }`,
      })}

      ${card({
        x: 1080,
        y: 240,
        w: 440,
        h: 300,
        number: "03",
        heading: data.team_member_3_name || "Team Member",
        body:
          `${data.team_member_3_role || "Growth / Support"} — ${
            data.team_member_3_bio || "Role and short bio to be refined during Sitora review."
          }`,
      })}

      <rect x="80" y="590" width="1440" height="95" rx="28" fill="#111827" filter="url(#shadow)"/>
      ${multiText({
        text:
          data.team_summary ||
          "A focused team with specialist knowledge, operational capability and a clear growth direction.",
        x: 130,
        y: 645,
        size: 25,
        lineHeight: 34,
        color: "#FFFFFF",
        weight: 750,
        maxLength: 76,
        maxLines: 2,
      })}
    `,
  });

const roadmap = (data: DeckData, businessName: string) =>
  darkShell({
    businessName,
    slideNumber: 11,
    children: `
      ${eyebrow("3-Year Roadmap", true)}
      ${title("How growth happens", true)}

      ${card({
        x: 80,
        y: 245,
        w: 450,
        h: 330,
        number: "YEAR 1",
        heading: "Foundation",
        body: data.year_1_plan || data.go_to_market,
        dark: true,
      })}

      ${card({
        x: 575,
        y: 245,
        w: 450,
        h: 330,
        number: "YEAR 2",
        heading: "Expansion",
        body: data.year_2_plan,
        dark: true,
      })}

      ${card({
        x: 1070,
        y: 245,
        w: 450,
        h: 330,
        number: "YEAR 3",
        heading: "Leadership",
        body: data.year_3_plan,
        dark: true,
      })}

      <line x1="160" y1="640" x2="1430" y2="640" stroke="#D6B35F" stroke-width="3" opacity="0.6"/>
      <circle cx="160" cy="640" r="12" fill="#D6B35F"/>
      <circle cx="795" cy="640" r="12" fill="#D6B35F"/>
      <circle cx="1430" cy="640" r="12" fill="#D6B35F"/>
    `,
  });

const ask = (data: DeckData, businessName: string) => {
  const y1 = cleanNumber(data.year_1_revenue, 150000);
  const y2 = cleanNumber(data.year_2_revenue, 350000);
  const y3 = cleanNumber(data.year_3_revenue, 750000);
  const max = Math.max(y1, y2, y3);

  const h1 = Math.round((y1 / max) * 190);
  const h2 = Math.round((y2 / max) * 190);
  const h3 = Math.round((y3 / max) * 190);

  const marketing = cleanNumber(data.use_funds_marketing, 35);
  const operations = cleanNumber(data.use_funds_operations, 20);
  const product = cleanNumber(data.use_funds_product, 20);
  const team = cleanNumber(data.use_funds_team, 15);
  const other = cleanNumber(data.use_funds_other, 10);

  return lightShell({
    businessName,
    slideNumber: 12,
    children: `
      ${eyebrow("Investment Ask")}
      ${title("Funding the next stage")}

      <rect x="80" y="230" width="430" height="390" rx="34" fill="#111827" filter="url(#shadow)"/>
      <text x="125" y="310" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="850" letter-spacing="5" fill="#D6B35F">
        FUNDING NEEDED
      </text>
      <text x="125" y="385" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="900" fill="#FFFFFF">
        ${escapeSvg(data.funding_needed || "To discuss")}
      </text>
      ${multiText({
        text: data.investment_ask || data.use_of_funds,
        x: 125,
        y: 455,
        size: 22,
        lineHeight: 32,
        color: "rgba(255,255,255,0.68)",
        maxLength: 29,
        maxLines: 4,
      })}

      <rect x="560" y="230" width="430" height="390" rx="34" fill="#FFFFFF" stroke="#E7DDC8" filter="url(#shadow)"/>
      <text x="605" y="305" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="850" fill="#111827">Use of funds</text>

      <circle cx="705" cy="440" r="86" fill="none" stroke="#D6B35F" stroke-width="28" opacity="0.95"/>
      <circle cx="705" cy="440" r="52" fill="#FFFFFF"/>
      <text x="675" y="450" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#111827">100%</text>

      <text x="825" y="385" font-family="Inter, Arial, sans-serif" font-size="18" fill="#334155">Marketing / SEO — ${marketing}%</text>
      <text x="825" y="425" font-family="Inter, Arial, sans-serif" font-size="18" fill="#334155">Operations — ${operations}%</text>
      <text x="825" y="465" font-family="Inter, Arial, sans-serif" font-size="18" fill="#334155">Product / Tech — ${product}%</text>
      <text x="825" y="505" font-family="Inter, Arial, sans-serif" font-size="18" fill="#334155">Team — ${team}%</text>
      <text x="825" y="545" font-family="Inter, Arial, sans-serif" font-size="18" fill="#334155">Other — ${other}%</text>

      <rect x="1040" y="230" width="480" height="390" rx="34" fill="#FFFFFF" stroke="#E7DDC8" filter="url(#shadow)"/>
      <text x="1085" y="305" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="850" fill="#111827">3-year projection</text>

      <line x1="1115" y1="540" x2="1450" y2="540" stroke="#CBD5E1" stroke-width="2"/>
      <rect x="1140" y="${540 - h1}" width="70" height="${h1}" rx="12" fill="url(#gold)"/>
      <rect x="1255" y="${540 - h2}" width="70" height="${h2}" rx="12" fill="url(#gold)"/>
      <rect x="1370" y="${540 - h3}" width="70" height="${h3}" rx="12" fill="url(#gold)"/>

      <text x="1138" y="575" font-family="Inter, Arial, sans-serif" font-size="17" fill="#475569">Y1</text>
      <text x="1253" y="575" font-family="Inter, Arial, sans-serif" font-size="17" fill="#475569">Y2</text>
      <text x="1368" y="575" font-family="Inter, Arial, sans-serif" font-size="17" fill="#475569">Y3</text>

      <text x="1120" y="355" font-family="Inter, Arial, sans-serif" font-size="18" fill="#475569">${escapeSvg(data.year_1_revenue || "£150k")}</text>
      <text x="1235" y="355" font-family="Inter, Arial, sans-serif" font-size="18" fill="#475569">${escapeSvg(data.year_2_revenue || "£350k")}</text>
      <text x="1350" y="355" font-family="Inter, Arial, sans-serif" font-size="18" fill="#475569">${escapeSvg(data.year_3_revenue || "£750k")}</text>
    `,
  });
};

const contactSlide = (data: DeckData, businessName: string) =>
  darkShell({
    businessName,
    slideNumber: 13,
    children: `
      ${eyebrow("Next Steps", true)}

      <text x="80" y="225" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="900" fill="#FFFFFF">
        Let’s discuss the opportunity
      </text>

      <rect x="80" y="300" width="760" height="330" rx="34" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" filter="url(#shadow)"/>

      <text x="130" y="375" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850" letter-spacing="5" fill="#D6B35F">
        CONTACT
      </text>

      <text x="130" y="435" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="850" fill="#FFFFFF">
        ${escapeSvg(data.founder_name || "Founder")}
      </text>

      <text x="130" y="490" font-family="Inter, Arial, sans-serif" font-size="25" fill="rgba(255,255,255,0.72)">
        ${escapeSvg(data.email || "Email to be added")}
      </text>

      <text x="130" y="535" font-family="Inter, Arial, sans-serif" font-size="25" fill="rgba(255,255,255,0.72)">
        ${escapeSvg(data.phone || "Phone to be added")}
      </text>

      <text x="130" y="580" font-family="Inter, Arial, sans-serif" font-size="25" fill="rgba(255,255,255,0.72)">
        ${escapeSvg(data.website || "Website to be added")}
      </text>

      <rect x="920" y="300" width="520" height="330" rx="34" fill="url(#gold)" filter="url(#shadow)"/>

      <text x="970" y="375" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="5" fill="#111827">
        INVESTOR NEXT STEPS
      </text>

      <text x="970" y="445" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#111827">
        01. Book a discovery call
      </text>

      <text x="970" y="500" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#111827">
        02. Review financials
      </text>

      <text x="970" y="555" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#111827">
        03. Discuss investment fit
      </text>

      <text x="82" y="705" font-family="Inter, Arial, sans-serif" font-size="27" fill="rgba(255,255,255,0.58)">
        Prepared for investor conversations, strategic partnerships and growth discussions.
      </text>
    `,
  });

export const generatePitchDeckSvgs = (data: DeckData) => {
  const businessName = data.business_name || "Founder Deck";

  return [
    { filename: "01-cover.svg", svg: cover(data) },
    { filename: "02-vision.svg", svg: vision(data, businessName) },
    { filename: "03-problem.svg", svg: problem(data, businessName) },
    { filename: "04-solution.svg", svg: solution(data, businessName) },
    { filename: "05-market.svg", svg: market(data, businessName) },
    { filename: "06-product-journey.svg", svg: productJourney(data, businessName) },
    { filename: "07-business-model.svg", svg: businessModel(data, businessName) },
    { filename: "08-traction-proof.svg", svg: traction(data, businessName) },
    { filename: "09-competitive-advantage.svg", svg: advantage(data, businessName) },
    { filename: "10-team.svg", svg: teamSlide(data, businessName) },
    { filename: "11-roadmap.svg", svg: roadmap(data, businessName) },
    { filename: "12-investment-ask.svg", svg: ask(data, businessName) },
    { filename: "13-contact-next-steps.svg", svg: contactSlide(data, businessName) },
  ];
};