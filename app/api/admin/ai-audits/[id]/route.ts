import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const allowedStatuses = [
  "new",
  "reviewing",
  "needs_more_info",
  "report_in_progress",
  "proposal_sent",
  "converted",
  "closed",
];

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey);
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing audit ID." },
        { status: 400 }
      );
    }

    const status = cleanText(body.status);
    const sitoraNotes = cleanText(body.sitoraNotes);

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("ksa_ai_audit_intakes")
      .update({
        status,
        sitora_notes: sitoraNotes,
      })
      .eq("id", id)
      .select("id, status, sitora_notes")
      .single();

    if (error) {
      console.error("Update audit error:", error);

      return NextResponse.json(
        { success: false, message: "Could not update audit." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Audit updated successfully.",
      data,
    });
  } catch (error) {
    console.error("Audit update route error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}