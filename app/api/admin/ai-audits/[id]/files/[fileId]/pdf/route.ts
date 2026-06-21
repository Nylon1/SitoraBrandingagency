import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateKsaAiGeneratedFilePdf } from "@/lib/ksaAiGeneratedFilePdf";

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
  return (value || "sitora-ai-file")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; fileId: string }> }
) {
  try {
    const { id, fileId } = await context.params;

    if (!id || id === "undefined" || !fileId || fileId === "undefined") {
      return NextResponse.json(
        {
          success: false,
          message: "Missing audit ID or file ID.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: audit, error: auditError } = await supabase
      .from("ksa_ai_audit_intakes")
      .select("company_name, ai_product_name, primary_market")
      .eq("id", id)
      .single();

    if (auditError || !audit) {
      return NextResponse.json(
        {
          success: false,
          message: auditError?.message || "Audit not found.",
        },
        { status: 404 }
      );
    }

    const { data: file, error: fileError } = await supabase
      .from("ksa_ai_generated_files")
      .select("*")
      .eq("id", fileId)
      .eq("audit_id", id)
      .single();

    if (fileError || !file) {
      return NextResponse.json(
        {
          success: false,
          message: fileError?.message || "Generated file not found.",
        },
        { status: 404 }
      );
    }

    const pdfBuffer = await generateKsaAiGeneratedFilePdf({
      file: file as any,
      audit: audit as any,
    });

    const pdfBody = new Uint8Array(pdfBuffer);

    const filename = `${safeFileName(
      audit.company_name
    )}-${safeFileName(file.title)}.pdf`;

    return new Response(pdfBody, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Generated file PDF error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not generate file PDF.",
      },
      { status: 500 }
    );
  }
}