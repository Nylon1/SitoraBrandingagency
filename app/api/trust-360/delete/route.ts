import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { auditId } = await request.json();

    if (!auditId) {
      return NextResponse.json(
        { error: "Audit ID is required." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdmin();

    // Get file path first so we can delete uploaded file from storage
    const { data: audit, error: fetchError } = await supabase
      .from("trust360_audits")
      .select("id, uploaded_file_path")
      .eq("id", auditId)
      .single();

    if (fetchError || !audit) {
      return NextResponse.json(
        { error: "Audit not found." },
        { status: 404 },
      );
    }

    // Delete uploaded file if it exists
    if (audit.uploaded_file_path) {
      await supabase.storage
        .from("trust360-uploads")
        .remove([audit.uploaded_file_path]);
    }

    // trust360_issues should delete automatically because of on delete cascade
    const { error: deleteError } = await supabase
      .from("trust360_audits")
      .delete()
      .eq("id", auditId);

    if (deleteError) {
      console.error(deleteError);

      return NextResponse.json(
        { error: "Could not delete audit." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Delete failed." },
      { status: 500 },
    );
  }
}