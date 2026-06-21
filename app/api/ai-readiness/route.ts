import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

type AIReadinessPayload = {
  name?: string;
  businessName?: string;
  email?: string;
  website?: string;
  industry?: string;
  currentlyUsesAI?: string;
  aiUses?: string[];
  hasChatbot?: string;
  staffUseAI?: string;
  entersSensitiveData?: string;
  influencesDecisions?: string;
  hasPolicy?: string;
  supportNeeded?: string[];
  concerns?: string;
};

function formatList(items?: string[]) {
  if (!items || items.length === 0) return "Not provided";
  return items.join(", ");
}

function clean(value?: string) {
  return value && value.trim().length > 0 ? value : "Not provided";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AIReadinessPayload;

    if (!body.name || !body.businessName || !body.email || !body.industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { error: supabaseError } = await supabase
      .from("ai_readiness_enquiries")
      .insert({
        name: body.name,
        business_name: body.businessName,
        email: body.email,
        website: body.website || null,
        industry: body.industry,

        currently_uses_ai: body.currentlyUsesAI || null,
        ai_uses: body.aiUses || [],
        has_chatbot: body.hasChatbot || null,
        staff_use_ai: body.staffUseAI || null,
        enters_sensitive_data: body.entersSensitiveData || null,
        influences_decisions: body.influencesDecisions || null,
        has_policy: body.hasPolicy || null,
        support_needed: body.supportNeeded || [],
        concerns: body.concerns || null,

        status: "New",
      });

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      return NextResponse.json(
        { error: "Unable to save enquiry" },
        { status: 500 }
      );
    }

    const fromEmail =
      process.env.AI_READINESS_FROM_EMAIL || "Sitora <onboarding@resend.dev>";

    const toEmail = process.env.AI_READINESS_TO_EMAIL;

    if (!toEmail) {
      console.error("Missing AI_READINESS_TO_EMAIL");
      return NextResponse.json(
        { error: "Recipient email not configured" },
        { status: 500 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    });

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: body.email,
      subject: `New AI Readiness Enquiry - ${body.businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 720px;">
          <h2 style="margin-bottom: 4px;">New AI Readiness Enquiry</h2>
          <p style="color: #555; margin-top: 0;">Submitted: ${submittedAt}</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

          <h3>Business Details</h3>
          <p><strong>Name:</strong> ${clean(body.name)}</p>
          <p><strong>Business:</strong> ${clean(body.businessName)}</p>
          <p><strong>Email:</strong> ${clean(body.email)}</p>
          <p><strong>Website:</strong> ${clean(body.website)}</p>
          <p><strong>Industry:</strong> ${clean(body.industry)}</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

          <h3>AI Usage</h3>
          <p><strong>Currently uses AI:</strong> ${clean(body.currentlyUsesAI)}</p>
          <p><strong>Where AI is being used:</strong> ${formatList(body.aiUses)}</p>
          <p><strong>AI chatbot:</strong> ${clean(body.hasChatbot)}</p>
          <p><strong>Staff use AI tools:</strong> ${clean(body.staffUseAI)}</p>
          <p><strong>Customer/patient/staff/client data entered into AI:</strong> ${clean(body.entersSensitiveData)}</p>
          <p><strong>AI influences decisions:</strong> ${clean(body.influencesDecisions)}</p>
          <p><strong>AI policy/tool register:</strong> ${clean(body.hasPolicy)}</p>
          <p><strong>Support needed:</strong> ${formatList(body.supportNeeded)}</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

          <h3>Additional Concerns</h3>
          <p>${clean(body.concerns)}</p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

          <p style="font-size: 13px; color: #666;">
            This enquiry came from the Sitora AI Readiness form and has been saved in Supabase.
          </p>
        </div>
      `,
    });

    await resend.emails.send({
      from: fromEmail,
      to: body.email,
      subject: "Your AI Readiness Review Request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 680px;">
          <h2>Thank you for requesting an AI Readiness Review</h2>

          <p>Hi ${clean(body.name)},</p>

          <p>Thank you for submitting your AI Readiness Review request with Sitora.</p>

          <p>We have received your details and will review the information you provided around your current AI use, website or software tools, data handling, disclosures and governance position.</p>

          <p>The aim of this first review is to help identify where AI may already be used in your business, where potential exposure may exist, and what practical policies, disclosures or governance steps may be worth considering.</p>

          <p>Please note that Sitora is not a law firm and does not provide legal advice. Our role is to help businesses become more organised, prepared and AI-ready.</p>

          <p>Kind regards,<br />Sitora</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "AI readiness enquiry received",
    });
  } catch (error) {
    console.error("AI readiness form error:", error);

    return NextResponse.json(
      { error: "Unable to process enquiry" },
      { status: 500 }
    );
  }
}