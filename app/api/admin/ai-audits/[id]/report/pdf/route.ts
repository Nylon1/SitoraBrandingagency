import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateKsaAiReportPdf } from "@/lib/ksaAiReportPdf";

export const runtime = "nodejs";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

function safeFileName(value?: string | null) {
  return (value || "sitora-ai-trust-report")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || id === "undefined") {
      return NextResponse.json(
        {
          success: false,
          message: "Missing audit ID.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("ksa_ai_audit_intakes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Audit not found.",
        },
        { status: 404 }
      );
    }

    const pdfBuffer = await generateKsaAiReportPdf(data as any);

    const pdfBody = new Uint8Array(pdfBuffer);

    const filename = `${safeFileName(
      data.company_name
    )}-ksa-ai-trust-report.pdf`;

    return new Response(pdfBody, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not generate PDF report.",
      },
      { status: 500 }
    );
  }
}