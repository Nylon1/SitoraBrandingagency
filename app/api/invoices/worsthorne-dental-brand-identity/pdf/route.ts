import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

export const runtime = "nodejs";

function money(amount: number) {
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function drawTextBlock({
  page,
  text,
  x,
  y,
  size,
  font,
  color,
  maxWidth,
  lineHeight,
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  size: number;
  font: PDFFont;
  color: RGB;
  maxWidth: number;
  lineHeight: number;
}) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);

    if (testWidth > maxWidth && line) {
      page.drawText(line, {
        x,
        y: currentY,
        size,
        font,
        color,
      });

      line = word;
      currentY -= lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    page.drawText(line, {
      x,
      y: currentY,
      size,
      font,
      color,
    });
  }

  return currentY;
}

export async function GET() {
  const invoiceNumber = "SIT-WDC-001";
  const clientName = "Worsthorne Dental Clinic";
  const projectName = "Premium Brand Identity System";

  const subtotal = 5500;
  const vat = 0;
  const total = subtotal + vat;
  const deposit = total / 2;
  const balance = total / 2;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);

  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const navy = rgb(0.063, 0.094, 0.153);
  const darkNavy = rgb(0.035, 0.055, 0.09);
  const gold = rgb(0.847, 0.714, 0.427);
  const ivory = rgb(0.972, 0.961, 0.929);
  const cream = rgb(0.985, 0.98, 0.965);
  const grey = rgb(0.29, 0.34, 0.4);
  const lightGrey = rgb(0.55, 0.6, 0.67);
  const white = rgb(1, 1, 1);

  // Page background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: cream,
  });

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 220,
    width,
    height: 220,
    color: darkNavy,
  });

  // Sitora branding
  page.drawText("SITORA", {
    x: 50,
    y: height - 50,
    size: 16,
    font: bold,
    color: gold,
  });

  page.drawText("Brand Identity & Website Design", {
    x: 50,
    y: height - 70,
    size: 10,
    font,
    color: rgb(0.78, 0.82, 0.88),
  });

  page.drawText("DEPOSIT INVOICE / PRO FORMA", {
    x: 50,
    y: height - 108,
    size: 10,
    font: bold,
    color: gold,
  });

  // Split title to avoid overlap
  page.drawText("Brand Identity", {
    x: 50,
    y: height - 142,
    size: 30,
    font: bold,
    color: white,
  });

  page.drawText("Deposit Invoice", {
    x: 50,
    y: height - 176,
    size: 30,
    font: bold,
    color: white,
  });

  page.drawText(clientName, {
    x: 50,
    y: height - 202,
    size: 15,
    font: bold,
    color: rgb(0.86, 0.9, 0.96),
  });

  // Invoice meta card
  page.drawRectangle({
    x: 395,
    y: height - 190,
    width: 150,
    height: 130,
    color: rgb(0.12, 0.16, 0.22),
  });

  page.drawText("INVOICE NO.", {
    x: 412,
    y: height - 82,
    size: 8,
    font: bold,
    color: gold,
  });

  page.drawText(invoiceNumber, {
    x: 412,
    y: height - 100,
    size: 12,
    font: bold,
    color: white,
  });

  page.drawText("INVOICE DATE", {
    x: 412,
    y: height - 126,
    size: 8,
    font: bold,
    color: gold,
  });

  page.drawText("To be confirmed", {
    x: 412,
    y: height - 142,
    size: 10,
    font,
    color: white,
  });

  page.drawText("DUE DATE", {
    x: 412,
    y: height - 166,
    size: 8,
    font: bold,
    color: gold,
  });

  page.drawText("On receipt", {
    x: 412,
    y: height - 182,
    size: 10,
    font,
    color: white,
  });

  // Main white sheet
  page.drawRectangle({
    x: 35,
    y: 42,
    width: 525,
    height: 565,
    color: white,
  });

  // From
  page.drawText("FROM", {
    x: 60,
    y: 575,
    size: 8,
    font: bold,
    color: lightGrey,
  });

  page.drawText("Sitora", {
    x: 60,
    y: 552,
    size: 19,
    font: bold,
    color: navy,
  });

  drawTextBlock({
    page,
    text: "Brand identity, website design and digital presence services.",
    x: 60,
    y: 528,
    size: 9,
    font,
    color: grey,
    maxWidth: 210,
    lineHeight: 13,
  });

  page.drawText("Email: [your email]", {
    x: 60,
    y: 490,
    size: 9,
    font,
    color: grey,
  });

  page.drawText("Website: [your website]", {
    x: 60,
    y: 476,
    size: 9,
    font,
    color: grey,
  });

  // Bill to
  page.drawText("BILL TO", {
    x: 330,
    y: 575,
    size: 8,
    font: bold,
    color: lightGrey,
  });

  page.drawText(clientName, {
    x: 330,
    y: 552,
    size: 18,
    font: bold,
    color: navy,
  });

  page.drawText("[Client address]", {
    x: 330,
    y: 526,
    size: 9,
    font,
    color: grey,
  });

  page.drawText("[Client email]", {
    x: 330,
    y: 512,
    size: 9,
    font,
    color: grey,
  });

  // Notice box
  page.drawRectangle({
    x: 60,
    y: 440,
    width: 475,
    height: 50,
    color: ivory,
  });

  drawTextBlock({
    page,
    text:
      "This invoice covers the 50% deposit required to begin the Worsthorne Dental Clinic brand identity project. The remaining balance is due before final file release or handover.",
    x: 78,
    y: 470,
    size: 9,
    font,
    color: grey,
    maxWidth: 430,
    lineHeight: 13,
  });

  // Table header
  page.drawRectangle({
    x: 60,
    y: 392,
    width: 475,
    height: 34,
    color: navy,
  });

  page.drawText("Description", {
    x: 75,
    y: 404,
    size: 9,
    font: bold,
    color: white,
  });

  page.drawText("Qty", {
    x: 340,
    y: 404,
    size: 9,
    font: bold,
    color: white,
  });

  page.drawText("Price", {
    x: 390,
    y: 404,
    size: 9,
    font: bold,
    color: white,
  });

  page.drawText("Amount", {
    x: 470,
    y: 404,
    size: 9,
    font: bold,
    color: white,
  });

  // Table row
  page.drawRectangle({
    x: 60,
    y: 310,
    width: 475,
    height: 82,
    color: rgb(0.965, 0.96, 0.94),
  });

  page.drawText(projectName, {
    x: 75,
    y: 365,
    size: 12,
    font: bold,
    color: navy,
  });

  drawTextBlock({
    page,
    text:
      "Brand direction, messaging, digital BrandBook guidance and agreed designed assets for Worsthorne Dental Clinic.",
    x: 75,
    y: 343,
    size: 9,
    font,
    color: grey,
    maxWidth: 245,
    lineHeight: 13,
  });

  page.drawText("1", {
    x: 345,
    y: 348,
    size: 10,
    font,
    color: navy,
  });

  page.drawText(money(subtotal), {
    x: 382,
    y: 348,
    size: 10,
    font,
    color: navy,
  });

  page.drawText(money(subtotal), {
    x: 462,
    y: 348,
    size: 10,
    font: bold,
    color: navy,
  });

  // Totals
  page.drawText("Subtotal", {
    x: 350,
    y: 280,
    size: 10,
    font,
    color: grey,
  });

  page.drawText(money(subtotal), {
    x: 465,
    y: 280,
    size: 10,
    font,
    color: grey,
  });

  page.drawText("VAT", {
    x: 350,
    y: 257,
    size: 10,
    font,
    color: grey,
  });

  page.drawText(money(vat), {
    x: 465,
    y: 257,
    size: 10,
    font,
    color: grey,
  });

  page.drawText("Total", {
    x: 350,
    y: 227,
    size: 13,
    font: bold,
    color: navy,
  });

  page.drawText(money(total), {
    x: 455,
    y: 227,
    size: 13,
    font: bold,
    color: navy,
  });

  // Deposit due box
  page.drawRectangle({
    x: 60,
    y: 158,
    width: 475,
    height: 56,
    color: navy,
  });

  page.drawText("DEPOSIT DUE NOW", {
    x: 78,
    y: 192,
    size: 9,
    font: bold,
    color: gold,
  });

  page.drawText(money(deposit), {
    x: 78,
    y: 168,
    size: 24,
    font: bold,
    color: white,
  });

  page.drawText("BALANCE DUE LATER", {
    x: 330,
    y: 192,
    size: 8,
    font: bold,
    color: gold,
  });

  page.drawText(money(balance), {
    x: 330,
    y: 173,
    size: 15,
    font: bold,
    color: white,
  });

  page.drawText("Due before final file release or handover", {
    x: 330,
    y: 161,
    size: 8,
    font,
    color: rgb(0.78, 0.82, 0.88),
  });

  // Payment Details
  page.drawText("Payment Details", {
    x: 60,
    y: 127,
    size: 13,
    font: bold,
    color: navy,
  });

  page.drawText("Account Name: [Sitora / Business Name]", {
    x: 60,
    y: 106,
    size: 8.5,
    font,
    color: grey,
  });

  page.drawText("Sort Code: [Insert]", {
    x: 60,
    y: 92,
    size: 8.5,
    font,
    color: grey,
  });

  page.drawText("Account Number: [Insert]", {
    x: 60,
    y: 78,
    size: 8.5,
    font,
    color: grey,
  });

  page.drawText("Payment Reference: SIT-WDC-001", {
    x: 310,
    y: 106,
    size: 8.5,
    font,
    color: grey,
  });

  page.drawText("Payment Link: [Insert payment link]", {
    x: 310,
    y: 92,
    size: 8.5,
    font,
    color: grey,
  });

  // Footer
  page.drawText(
    "Website work, printing, signage manufacturing and third-party costs are not included unless confirmed separately in writing.",
    {
      x: 60,
      y: 58,
      size: 7.5,
      font,
      color: lightGrey,
      maxWidth: 470,
    },
  );

  page.drawText("Thank you for choosing Sitora.", {
    x: 60,
    y: 30,
    size: 8,
    font,
    color: lightGrey,
  });

  const pdfBytes = await pdfDoc.save();

  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  ) as ArrayBuffer;

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Worsthorne-Dental-Clinic-Brand-Identity-Deposit-Invoice.pdf"',
    },
  });
}