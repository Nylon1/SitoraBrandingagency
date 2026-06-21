import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

export type GeneratedFilePdfData = {
  id: string;
  audit_id: string;
  document_key: string;
  title: string;
  category: string;
  content_markdown: string;
  created_at: string;
};

export type AuditClientData = {
  company_name: string | null;
  ai_product_name: string | null;
  primary_market: string | null;
};

function cleanMarkdown(markdown: string) {
  return markdown
    .replace(/^# /gm, "")
    .replace(/^## /gm, "\n")
    .replace(/^### /gm, "\n")
    .replace(/\*\*/g, "")
    .replace(/---/g, "")
    .trim();
}

function splitIntoBlocks(markdown: string) {
  const cleaned = cleanMarkdown(markdown);
  return cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function value(input?: string | null) {
  return input && input.trim().length > 0 ? input : "Not provided";
}

const styles = StyleSheet.create({
  coverPage: {
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: "#070707",
    color: "#ffffff",
  },
  goldBar: {
    height: 12,
    backgroundColor: "#d6a84f",
  },
  coverInner: {
    padding: 48,
  },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid #d6a84f",
    backgroundColor: "#171717",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 700,
    color: "#d6a84f",
  },
  brandRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brand: {
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
  },
  smallCapsLight: {
    fontSize: 8,
    letterSpacing: 1.6,
    color: "#c7a35a",
    textTransform: "uppercase",
  },
  coverLabel: {
    marginTop: 85,
    fontSize: 9,
    letterSpacing: 2.2,
    color: "#d6a84f",
    textTransform: "uppercase",
  },
  coverTitle: {
    marginTop: 16,
    fontSize: 34,
    lineHeight: 1.12,
    fontWeight: 700,
    color: "#ffffff",
    maxWidth: 460,
  },
  coverSubtitle: {
    marginTop: 18,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#d1d5db",
    maxWidth: 450,
  },
  coverGrid: {
    marginTop: 44,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  coverBox: {
    width: "48%",
    border: "1px solid #3f3f46",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#111111",
  },
  coverBoxLabel: {
    fontSize: 7,
    letterSpacing: 1,
    color: "#a1a1aa",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  coverBoxValue: {
    fontSize: 10,
    color: "#ffffff",
    lineHeight: 1.4,
  },
  coverFooter: {
    position: "absolute",
    bottom: 26,
    left: 48,
    right: 48,
    fontSize: 8,
    color: "#a1a1aa",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #3f3f46",
    paddingTop: 10,
  },
  page: {
    paddingTop: 42,
    paddingBottom: 52,
    paddingLeft: 42,
    paddingRight: 42,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  watermark: {
    position: "absolute",
    top: 330,
    left: 90,
    fontSize: 58,
    color: "#f3f4f6",
    opacity: 0.28,
    transform: "rotate(-25deg)",
    fontWeight: 700,
  },
  smallCaps: {
    fontSize: 8,
    letterSpacing: 1.4,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 6,
    marginBottom: 8,
    color: "#111827",
  },
  divider: {
    height: 2,
    width: 80,
    backgroundColor: "#d6a84f",
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.65,
    color: "#374151",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 10,
    lineHeight: 1.55,
    color: "#374151",
    marginBottom: 5,
    paddingLeft: 8,
  },
  tableLine: {
    fontSize: 8.7,
    lineHeight: 1.5,
    color: "#374151",
    marginBottom: 4,
    padding: 6,
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  sectionHeading: {
    marginTop: 12,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 700,
    color: "#111827",
  },
  disclaimer: {
    marginTop: 18,
    border: "1px solid #fecaca",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fef2f2",
    fontSize: 9,
    lineHeight: 1.6,
    color: "#7f1d1d",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 42,
    right: 42,
    fontSize: 8,
    color: "#9ca3af",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 8,
  },
});

function CoverBox({ label, text }: { label: string; text?: string | null }) {
  return (
    <View style={styles.coverBox}>
      <Text style={styles.coverBoxLabel}>{label}</Text>
      <Text style={styles.coverBoxValue}>{value(text)}</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text>Sitora AI Trust Framework - sitora.co.uk</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}

function CoverFooter() {
  return (
    <View style={styles.coverFooter} fixed>
      <Text>Prepared by Sitora</Text>
      <Text>AI governance - compliance-readiness - digital trust</Text>
    </View>
  );
}

function renderLine(line: string, index: number) {
  if (line.startsWith("|")) {
    return (
      <Text key={index} style={styles.tableLine}>
        {line}
      </Text>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <Text key={index} style={styles.bullet}>
        • {line.replace("- ", "")}
      </Text>
    );
  }

  if (/^\d+\./.test(line)) {
    return (
      <Text key={index} style={styles.bullet}>
        {line}
      </Text>
    );
  }

  if (
    line.length < 80 &&
    !line.includes(":") &&
    !line.includes(".") &&
    index !== 0
  ) {
    return (
      <Text key={index} style={styles.sectionHeading}>
        {line}
      </Text>
    );
  }

  return (
    <Text key={index} style={styles.paragraph}>
      {line}
    </Text>
  );
}

function GeneratedFileDocument({
  file,
  audit,
}: {
  file: GeneratedFilePdfData;
  audit: AuditClientData;
}) {
  const lines = splitIntoBlocks(file.content_markdown);

  return (
    <Document
      title={`${file.title} - ${audit.company_name || "Client"}`}
      author="Sitora"
      subject="Saudi AI compliance-readiness generated file"
    >
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.goldBar} />

        <View style={styles.coverInner}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>S</Text>
            </View>

            <View>
              <Text style={styles.brand}>Sitora</Text>
              <Text style={styles.smallCapsLight}>AI Trust Framework</Text>
            </View>
          </View>

          <Text style={styles.coverLabel}>Generated File</Text>

          <Text style={styles.coverTitle}>{file.title}</Text>

          <Text style={styles.coverSubtitle}>
            A Saudi AI governance and compliance-readiness document generated
            from the Sitora AI Trust Audit system.
          </Text>

          <View style={styles.coverGrid}>
            <CoverBox label="Client" text={audit.company_name} />
            <CoverBox label="AI System" text={audit.ai_product_name} />
            <CoverBox label="Market" text={audit.primary_market} />
            <CoverBox label="Category" text={file.category} />
          </View>
        </View>

        <CoverFooter />
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.watermark}>DRAFT</Text>

        <Text style={styles.smallCaps}>Sitora Generated File</Text>
        <Text style={styles.h1}>{file.title}</Text>
        <View style={styles.divider} />

        {lines.map((line, index) => renderLine(line, index))}

        <View style={styles.disclaimer}>
          <Text>
            Important disclaimer: Sitora provides AI governance, software trust
            and compliance-readiness support. This document is designed to
            identify risks, gaps and practical improvement actions. It does not
            constitute legal advice, regulatory certification or formal approval
            by any Saudi regulator. Where specialist legal, regulatory or
            sector-specific approval is required, the client should seek advice
            from qualified Saudi legal and regulatory professionals.
          </Text>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}

export async function generateKsaAiGeneratedFilePdf({
  file,
  audit,
}: {
  file: GeneratedFilePdfData;
  audit: AuditClientData;
}) {
  return renderToBuffer(<GeneratedFileDocument file={file} audit={audit} />);
}