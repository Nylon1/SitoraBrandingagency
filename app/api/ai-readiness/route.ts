import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AIReadinessPayload;

    if (!body.name || !body.businessName || !body.email || !body.industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from:
        process.env.AI_READINESS_FROM_EMAIL ||
        "Sitora <noreply@sitora.co.uk>",
      to: process.env.AI_READINESS_TO_EMAIL || "hello@sitora.co.uk",
      subject: `New AI Readiness Enquiry - ${body.businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New AI Readiness Enquiry</h2>

          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Business:</strong> ${body.businessName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Website:</strong> ${body.website || "Not provided"}</p>
          <p><strong>Industry:</strong> ${body.industry}</p>

          <hr />

          <p><strong>Currently uses AI:</strong> ${body.currentlyUsesAI || "Not provided"}</p>
          <p><strong>Where AI is being used:</strong> ${formatList(body.aiUses)}</p>
          <p><strong>AI chatbot:</strong> ${body.hasChatbot || "Not provided"}</p>
          <p><strong>Staff use AI tools:</strong> ${body.staffUseAI || "Not provided"}</p>
          <p><strong>Customer/patient/staff/client data entered into AI:</strong> ${body.entersSensitiveData || "Not provided"}</p>
          <p><strong>AI influences decisions:</strong> ${body.influencesDecisions || "Not provided"}</p>
          <p><strong>AI policy/tool register:</strong> ${body.hasPolicy || "Not provided"}</p>
          <p><strong>Support needed:</strong> ${formatList(body.supportNeeded)}</p>

          <hr />

          <p><strong>Concerns:</strong></p>
          <p>${body.concerns || "None provided"}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from:
        process.env.AI_READINESS_FROM_EMAIL ||
        "Sitora <noreply@sitora.co.uk>",
      to: body.email,
      subject: "Your AI Readiness Review Request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Thank you for requesting an AI Readiness Review</h2>

          <p>Hi ${body.name},</p>

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