import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  generateKsaAiFiles,
  CompanyFileInfo,
} from "@/lib/ksaAiFileGenerator";

export const runtime = "nodejs";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || id === "undefined") {
      return NextResponse.json(
        { success: false, message: "Missing audit ID." },
        { status: 400 }
      );
    }

    const companyInfo = (await request.json()) as CompanyFileInfo;

    const supabase = getSupabaseAdmin();

    const { data: audit, error: auditError } = await supabase
      .from("ksa_ai_audit_intakes")
      .select("*")
      .eq("id", id)
      .single();

    if (auditError || !audit) {
      return NextResponse.json(
        { success: false, message: auditError?.message || "Audit not found." },
        { status: 404 }
      );
    }

    const files = generateKsaAiFiles(audit as any, companyInfo);

    await supabase.from("ksa_ai_generated_files").delete().eq("audit_id", id);

    const insertRows = files.map((file) => ({
      audit_id: id,
      document_key: file.document_key,
      title: file.title,
      category: file.category,
      content_markdown: file.content_markdown,
    }));

    const { data, error } = await supabase
      .from("ksa_ai_generated_files")
      .insert(insertRows)
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Files generated successfully.",
      files: data,
    });
  } catch (error) {
    console.error("Generate AI files error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not generate files.",
      },
      { status: 500 }
    );
  }
}