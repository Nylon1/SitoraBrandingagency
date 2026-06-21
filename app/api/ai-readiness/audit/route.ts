import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

const resend = new Resend(process.env.RESEND_API_KEY);

type AuditAnswers = Record<string, string | string[]>;

function getString(answers: AuditAnswers, key: string) {
  const value = answers[key];
  return typeof value === "string" ? value : "";
}

function calculateRiskLevel(answers: AuditAnswers) {
  let score = 0;

  const sensitiveData = getString(answers, "sensitive_data_ai");
  const personalData = getString(answers, "personal_data_ai");
  const decisionSupport = getString(answers, "ai_decision_support");
  const rightsImpact = getString(answers, "rights_impact");
  const policy = getString(answers, "ai_usage_policy");
  const toolRegister = getString(answers, "tool_register");
  const highRiskUsage = answers.high_risk_usage;

  if (["Yes", "Possibly"].includes(sensitiveData)) score += 4;
  if (["Yes", "Possibly"].includes(personalData)) score += 2;
  if (["Yes", "Possibly"].includes(decisionSupport)) score += 4;
  if (["Yes", "Possibly"].includes(rightsImpact)) score += 4;

  if (["No", "Not sure"].includes(policy)) score += 2;
  if (["No", "Not sure"].includes(toolRegister)) score += 2;

  if (Array.isArray(highRiskUsage)) {
    const seriousAreas = [
      "Recruitment or HR",
      "Healthcare, dental or patient support",
      "Finance, lending, insurance or eligibility",
      "Education or assessment",
      "Employee monitoring",
      "Children or vulnerable people",
      "Biometric identification",
      "Fraud detection or risk scoring",
    ];

    if (highRiskUsage.some((item) => seriousAreas.includes(item))) {
      score += 5;
    }
  }

  if (score >= 10) return "High";
  if (score >= 5) return "Medium";
  return "Low";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers = body.answers as AuditAnswers;

    if (!answers) {
      return NextResponse.json({ error: "Missing answers" }, { status: 400 });
    }

    const businessName = getString(answers, "business_name");
    const contactName = getString(answers, "contact_name");
    const email = getString(answers, "email");
    const website = getString(answers, "website");
    const industry = getString(answers, "industry");

    if (!businessName || !contactName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const riskLevel = calculateRiskLevel(answers);

    const { error } = await supabase.from("ai_readiness_audits").insert({
      business_name: businessName,
      contact_name: contactName,
      email,
      website: website || null,
      industry: industry || null,
      answers,
      risk_level: riskLevel,
      status: "Submitted",
    });

    if (error) {
      console.error("Audit insert error:", error);
      return NextResponse.json(
        { error: "Unable to save audit" },
        { status: 500 }
      );
    }

    const fromEmail =
      process.env.AI_READINESS_FROM_EMAIL || "Sitora <onboarding@resend.dev>";

    const toEmail = process.env.AI_READINESS_TO_EMAIL;

    if (process.env.RESEND_API_KEY && toEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: email,
        subject: `New AI Audit Questionnaire - ${businessName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
            <h2>New AI Audit Questionnaire Submitted</h2>
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Contact:</strong> ${contactName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Website:</strong> ${website || "Not provided"}</p>
            <p><strong>Industry:</strong> ${industry || "Not provided"}</p>
            <p><strong>Calculated risk level:</strong> ${riskLevel}</p>
            <p>The full answer set has been saved in Supabase.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      riskLevel,
    });
  } catch (error) {
    console.error("AI audit route error:", error);

    return NextResponse.json(
      { error: "Unable to process audit questionnaire" },
      { status: 500 }
    );
  }
}