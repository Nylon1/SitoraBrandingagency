import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function generateTempPassword() {
  const random = Math.random().toString(36).slice(2, 8);
  return "Sitora-" + random + "-2026!";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const clientId = body.clientId;
    const email = body.email;
    const role = "client";

    if (!clientId || !email) {
      return NextResponse.json(
        { error: "clientId and email are required." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables.");
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

    const { data: adminProfile, error: adminProfileError } = await userSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (adminProfileError || adminProfile?.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    const adminSupabase = createClient(supabaseUrl, serviceRoleKey);

    const tempPassword = generateTempPassword();

    const { data: createdUser, error: createUserError } =
      await adminSupabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          client_id: clientId,
          role
        }
      });

    if (createUserError) {
      throw new Error(createUserError.message);
    }

    const authUserId = createdUser.user?.id;

    if (!authUserId) {
      throw new Error("Auth user was not created.");
    }

    const { error: profileError } = await adminSupabase.from("profiles").upsert({
      id: authUserId,
      email,
      role,
      client_id: clientId
    });

    if (profileError) {
      throw new Error(profileError.message);
    }

    return NextResponse.json({
      success: true,
      email,
      tempPassword,
      authUserId
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown create user error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}