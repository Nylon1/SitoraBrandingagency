import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

interface QRLeadPayload {
  email?: unknown;
  qrType?: unknown;
  destination?: unknown;
  marketingConsent?: unknown;
  design?: unknown;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QRLeadPayload;

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const qrType =
      typeof body.qrType === "string"
        ? body.qrType
        : "unknown";

    const destination =
      typeof body.destination === "string"
        ? body.destination
        : "";

    const marketingConsent =
      body.marketingConsent === true;

    const createdAt = new Date().toISOString();

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceRoleKey) {
      const supabase = createClient(
        supabaseUrl,
        serviceRoleKey,
      );

      const { error } = await supabase
        .from("qr_generator_leads")
        .insert([
          {
            email,
            qr_type: qrType,
            destination,
            marketing_consent: marketingConsent,
            design:
              typeof body.design === "object"
                ? body.design
                : null,
            source: "sitora-qr-studio",
            created_at: createdAt,
          },
        ]);

      if (error) {
        console.error(
          "QR lead Supabase error:",
          error.message,
        );
      }
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const resend = new Resend(resendKey);

      try {
        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Sitora <onboarding@resend.dev>",
          to: [email],
          subject: "Your Sitora QR code is ready",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:32px;background:#080a0f;color:#ffffff;border-radius:20px;">
              <p style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#d8b66d;font-weight:bold;">
                Sitora QR Studio
              </p>

              <h1 style="font-size:32px;margin:16px 0;">
                Your custom QR code is ready
              </h1>

              <p style="font-size:16px;line-height:1.7;color:#c8c8c8;">
                Your QR code download has been generated successfully.
                Keep the downloaded PNG somewhere safe and test the QR
                code before sending it to print.
              </p>

              <p style="font-size:14px;line-height:1.7;color:#8d8d8d;margin-top:28px;">
                Created using Sitora QR Studio.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error(
          "QR confirmation email error:",
          emailError,
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("QR lead route error:", error);

    return NextResponse.json(
      {
        error:
          "The download could not be prepared. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}