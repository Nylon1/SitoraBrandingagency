import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reportId = body.reportId;

    if (!reportId) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }

    if (!serviceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header." },
        { status: 401 }
      );
    }

    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    });

    const {
      data: { user },
      error: userError
    } = await userSupabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await userSupabase
      .from("profiles")
      .select("client_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.client_id) {
      return NextResponse.json(
        { error: "Client profile not found." },
        { status: 403 }
      );
    }

    const { data: report, error: reportError } = await userSupabase
      .from("reports")
      .select("id, client_id, storage_path")
      .eq("id", reportId)
      .eq("client_id", profile.client_id)
      .single();

    if (reportError || !report) {
      return NextResponse.json(
        { error: "Report not found or access denied." },
        { status: 404 }
      );
    }

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: signedData, error: signedError } = await adminSupabase.storage
      .from("client-reports")
      .createSignedUrl(report.storage_path, 300);

    if (signedError || !signedData?.signedUrl) {
      throw new Error(
        signedError?.message ||
          "Could not create signed URL for: " + report.storage_path
      );
    }

    return NextResponse.json({
      signedUrl: signedData.signedUrl
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown download error";

    console.error("Download report error:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}