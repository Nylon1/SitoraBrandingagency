import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { calculateKsaAiTrustScore } from "@/lib/ksaAiTrustScoring";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.RECEPTIONIST_FROM_EMAIL || "Sitora <hello@sitora.co.uk>";
const sitoraAuditEmail = process.env.SITORA_AUDIT_EMAIL || "hello@sitora.co.uk";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(Boolean).map(String);
}

function cleanText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const trustScore = calculateKsaAiTrustScore(body);

    const intake = {
      company_name: cleanText(body.companyName),
      contact_name: cleanText(body.contactName),
      email: cleanText(body.email),
      website: cleanText(body.website),
      primary_market: cleanText(body.primaryMarket),
      business_type: cleanText(body.businessType),

      ai_product_name: cleanText(body.aiProductName),
      ai_system_type: cleanText(body.aiSystemType),
      ai_description: cleanText(body.aiDescription),
      ai_users: cleanText(body.aiUsers),
      ai_influences: cleanArray(body.aiInfluences),

      risk_level: cleanText(body.riskLevel),

      data_collected: cleanArray(body.dataCollected),
      personal_data_stored: cleanText(body.personalDataStored),
      sensitive_data_involved: cleanText(body.sensitiveDataInvolved),
      retention_period: cleanText(body.retentionPeriod),
      ai_logs_access: cleanText(body.aiLogsAccess),
      privacy_consent_wording: cleanText(body.privacyConsentWording),

      ai_provider: cleanText(body.aiProvider),
      cloud_provider: cleanText(body.cloudProvider),
      hosting_region: cleanText(body.hostingRegion),
      data_leaves_ksa: cleanText(body.dataLeavesKsa),
      third_party_tools: cleanText(body.thirdPartyTools),

      disclosures_present: cleanArray(body.disclosuresPresent),
      ai_disclosure_wording: cleanText(body.aiDisclosureWording),

      human_review_available: cleanText(body.humanReviewAvailable),
      ai_override_available: cleanText(body.aiOverrideAvailable),
      internal_ai_owner: cleanText(body.internalAiOwner),
      escalation_route: cleanText(body.escalationRoute),
      human_review_process: cleanText(body.humanReviewProcess),

      security_controls: cleanArray(body.securityControls),
      admin_dashboard_access: cleanText(body.adminDashboardAccess),
      backup_process: cleanText(body.backupProcess),

      testing_completed: cleanArray(body.testingCompleted),
      known_ai_issues: cleanText(body.knownAiIssues),
specialist_saudi_flags: cleanArray(body.specialistSaudiFlags),
      healthcare_flags: cleanArray(body.healthcareFlags),
      finance_flags: cleanArray(body.financeFlags),
      hr_flags: cleanArray(body.hrFlags),
      education_flags: cleanArray(body.educationFlags),

      available_evidence: cleanArray(body.availableEvidence),

      score: trustScore.score,
      rating: trustScore.rating,
      score_type: trustScore.score_type,
      scoring_notes: trustScore.scoring_notes,

      ai_purpose_score: trustScore.domainScores.ai_purpose_score,
      risk_classification_score: trustScore.domainScores.risk_classification_score,
      data_flow_score: trustScore.domainScores.data_flow_score,
      personal_data_score: trustScore.domainScores.personal_data_score,
      sensitive_data_score: trustScore.domainScores.sensitive_data_score,
      cross_border_score: trustScore.domainScores.cross_border_score,
      transparency_score: trustScore.domainScores.transparency_score,
      human_oversight_score: trustScore.domainScores.human_oversight_score,
      output_safety_score: trustScore.domainScores.output_safety_score,
      bias_fairness_score: trustScore.domainScores.bias_fairness_score,
      vendor_governance_score: trustScore.domainScores.vendor_governance_score,
      cybersecurity_score: trustScore.domainScores.cybersecurity_score,
      cloud_hosting_score: trustScore.domainScores.cloud_hosting_score,
      incident_response_score: trustScore.domainScores.incident_response_score,
      documentation_score: trustScore.domainScores.documentation_score,
      review_monitoring_score: trustScore.domainScores.review_monitoring_score,
      user_journey_score: trustScore.domainScores.user_journey_score,
      sector_readiness_score: trustScore.domainScores.sector_readiness_score,

      status: "new",
    };

    if (!intake.company_name || !intake.contact_name || !intake.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name, contact name and email are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("ksa_ai_audit_intakes")
      .insert(intake)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Could not save audit intake.",
        },
        { status: 500 }
      );
    }

    if (resend) {
      await Promise.allSettled([
        resend.emails.send({
          from: fromEmail,
          to: sitoraAuditEmail,
          subject: `New KSA AI Trust Audit Intake — ${intake.company_name}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
              <h2>New KSA AI Trust Audit Intake</h2>

              <p><strong>Company:</strong> ${intake.company_name}</p>
              <p><strong>Contact:</strong> ${intake.contact_name}</p>
              <p><strong>Email:</strong> ${intake.email}</p>
              <p><strong>Website:</strong> ${intake.website || "Not provided"}</p>
              <p><strong>Primary Market:</strong> ${intake.primary_market}</p>
              <p><strong>Business Type:</strong> ${intake.business_type}</p>

              <hr />

              <p><strong>AI Product:</strong> ${intake.ai_product_name || "Not provided"}</p>
              <p><strong>AI System Type:</strong> ${intake.ai_system_type}</p>
              <p><strong>Risk Level:</strong> ${intake.risk_level}</p>
              <p><strong>Initial KSA AI Trust Rating:</strong> ${trustScore.rating}</p>
              <p><strong>Initial KSA AI Trust Score:</strong> ${trustScore.score} / 90</p>
              <p><strong>Score Type:</strong> Initial estimate based on intake answers</p>

              <hr />

              <p><strong>Scoring Notes:</strong></p>
              <p>${trustScore.scoring_notes || "No automatic notes generated."}</p>

              <hr />

              <p><strong>AI Description:</strong></p>
              <p>${intake.ai_description || "Not provided"}</p>

              <p><strong>AI Users:</strong></p>
              <p>${intake.ai_users || "Not provided"}</p>

              <p><strong>AI Influences:</strong> ${
                intake.ai_influences.join(", ") || "None selected"
              }</p>

              <hr />

              <p><strong>Data Collected:</strong> ${
                intake.data_collected.join(", ") || "None selected"
              }</p>
              <p><strong>Personal Data Stored:</strong> ${intake.personal_data_stored}</p>
              <p><strong>Sensitive Data:</strong> ${intake.sensitive_data_involved}</p>
              <p><strong>Retention Period:</strong> ${
                intake.retention_period || "Not provided"
              }</p>
              <p><strong>AI Logs Access:</strong> ${
                intake.ai_logs_access || "Not provided"
              }</p>

              <hr />

              <p><strong>Data Leaves KSA:</strong> ${intake.data_leaves_ksa}</p>
              <p><strong>AI Provider:</strong> ${intake.ai_provider || "Not provided"}</p>
              <p><strong>Cloud Provider:</strong> ${
                intake.cloud_provider || "Not provided"
              }</p>
              <p><strong>Hosting Region:</strong> ${
                intake.hosting_region || "Not provided"
              }</p>

              <hr />

              <p><strong>Human Review:</strong> ${intake.human_review_available}</p>
              <p><strong>AI Override:</strong> ${intake.ai_override_available}</p>
              <p><strong>Internal AI Owner:</strong> ${
                intake.internal_ai_owner || "Not provided"
              }</p>
              <p><strong>Escalation Route:</strong> ${
                intake.escalation_route || "Not provided"
              }</p>

              <hr />

              <p><strong>Security Controls:</strong> ${
                intake.security_controls.join(", ") || "None selected"
              }</p>
              <p><strong>Testing Completed:</strong> ${
                intake.testing_completed.join(", ") || "None selected"
              }</p>

              <hr />

              <p><strong>Available Evidence:</strong> ${
                intake.available_evidence.join(", ") || "None selected"
              }</p>
              <p><strong>Supabase Record ID:</strong> ${data.id}</p>
            </div>
          `,
        }),

        resend.emails.send({
          from: fromEmail,
          to: intake.email,
          subject: "Your Sitora AI Trust Audit Intake Has Been Received",
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111;">
              <h2>Thank you, ${intake.contact_name}</h2>

              <p>Your KSA AI Trust Audit intake for <strong>${intake.company_name}</strong> has been received.</p>

              <p>Sitora will review the information you provided and assess the AI system across key areas including:</p>

              <ul>
                <li>AI purpose and risk level</li>
                <li>Data protection and sensitive data handling</li>
                <li>Cross-border data transfer exposure</li>
                <li>User transparency and human oversight</li>
                <li>Cybersecurity, cloud and vendor risk</li>
                <li>Sector-specific regulatory flags</li>
              </ul>

              <p><strong>Initial KSA AI Trust Rating:</strong> ${trustScore.rating}</p>
              <p><strong>Initial KSA AI Trust Score:</strong> ${trustScore.score} / 90</p>

              <p>This is an initial estimate based on the information submitted. A reviewed score may change after Sitora examines the evidence.</p>

              <p>This review is designed to support AI governance and compliance-readiness. It does not constitute legal advice or regulatory certification.</p>

              <p>Regards,<br /><strong>Sitora</strong></p>
            </div>
          `,
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      message: "Audit intake submitted successfully.",
      id: data.id,
      score: trustScore.score,
      rating: trustScore.rating,
    });
  } catch (error) {
    console.error("KSA AI audit intake error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting the audit intake.",
      },
      { status: 500 }
    );
  }
}