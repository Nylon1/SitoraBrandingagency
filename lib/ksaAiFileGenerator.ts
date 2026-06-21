export type AuditForFiles = {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  email: string | null;
  website: string | null;
  primary_market: string | null;
  business_type: string | null;

  ai_product_name: string | null;
  ai_system_type: string | null;
  ai_description: string | null;
  ai_users: string | null;
  ai_influences: string[] | null;

  risk_level: string | null;
  data_collected: string[] | null;
  personal_data_stored: string | null;
  sensitive_data_involved: string | null;
  retention_period: string | null;
  ai_logs_access: string | null;
  privacy_consent_wording: string | null;

  ai_provider: string | null;
  cloud_provider: string | null;
  hosting_region: string | null;
  data_leaves_ksa: string | null;
  third_party_tools: string | null;

  disclosures_present: string[] | null;
  ai_disclosure_wording: string | null;

  human_review_available: string | null;
  ai_override_available: string | null;
  internal_ai_owner: string | null;
  escalation_route: string | null;
  human_review_process: string | null;

  security_controls: string[] | null;
  admin_dashboard_access: string | null;
  backup_process: string | null;

  testing_completed: string[] | null;
  known_ai_issues: string | null;

  healthcare_flags: string[] | null;
  finance_flags: string[] | null;
  hr_flags: string[] | null;
  education_flags: string[] | null;

  available_evidence: string[] | null;

  score: number | null;
  rating: string | null;
  scoring_notes: string | null;
};

export type CompanyFileInfo = {
  legalEntity?: string;
  tradingName?: string;
  companyAddress?: string;
  country?: string;
  aiOwner?: string;
  dataProtectionLead?: string;
  securityLead?: string;
  humanSupportEmail?: string;
  reviewCadence?: string;
  launchMarket?: string;
  sectorNotes?: string;
};

export type GeneratedKsaAiFile = {
  document_key: string;
  title: string;
  category: string;
  content_markdown: string;
};

function v(value?: string | null) {
  return value && value.trim().length > 0 ? value.trim() : "To be confirmed";
}

function list(value?: string[] | null) {
  return value && value.length > 0 ? value.join(", ") : "None confirmed";
}

function today() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function baseHeader(title: string, audit: AuditForFiles, info: CompanyFileInfo) {
  return `# ${title}

**Client:** ${v(info.tradingName || audit.company_name)}  
**Legal entity:** ${v(info.legalEntity)}  
**AI system:** ${v(audit.ai_product_name)}  
**Primary market:** ${v(info.launchMarket || audit.primary_market)}  
**Prepared by:** Sitora  
**Date:** ${today()}  
**Status:** Draft compliance-readiness document  

---

## Important note

This document is prepared as part of Sitora’s AI governance, software trust and compliance-readiness support. It is not legal advice, regulatory certification or official approval by any Saudi regulator. Where formal legal, cybersecurity, data protection or sector-specific regulatory advice is required, the client should seek advice from qualified Saudi legal and regulatory professionals.

`;
}

function governanceSourceNote() {
  return `

## Saudi source mapping

This document is designed to support practical readiness against relevant Saudi AI, data protection, cybersecurity, cloud and sector-risk expectations, including:

- SDAIA AI ethics and responsible AI principles
- Saudi Personal Data Protection Law and Implementing Regulations
- Personal data transfer considerations where data may leave the Kingdom
- National Cybersecurity Authority cybersecurity control expectations where relevant
- Cloud and hosting governance expectations where relevant
- Sector-specific review where healthcare, finance, HR, education or sensitive use cases are involved

`;
}

function standardReviewBlock(info: CompanyFileInfo) {
  return `

## Review and ownership

**AI owner:** ${v(info.aiOwner)}  
**Data protection lead:** ${v(info.dataProtectionLead)}  
**Security lead:** ${v(info.securityLead)}  
**Review cadence:** ${v(info.reviewCadence || "Quarterly or when the AI system materially changes")}  

This document should be reviewed when:

1. The AI system changes materially.
2. New data categories are collected.
3. A new AI provider, vendor or cloud provider is introduced.
4. The system is launched into a new market.
5. A significant complaint, incident, security issue or harmful output occurs.
6. Relevant law, regulator guidance or sector expectations change.

`;
}

export function generateKsaAiFiles(
  audit: AuditForFiles,
  info: CompanyFileInfo
): GeneratedKsaAiFile[] {
  const company = v(info.tradingName || audit.company_name);
  const aiName = v(audit.ai_product_name);
  const launchMarket = v(info.launchMarket || audit.primary_market);

  const files: GeneratedKsaAiFile[] = [
    {
      document_key: "ai-governance-policy",
      title: "AI Governance Policy",
      category: "AI Governance",
      content_markdown:
        baseHeader("AI Governance Policy", audit, info) +
        `## Purpose

This policy sets out how ${company} governs the design, deployment, use and review of its AI system, ${aiName}.

The purpose is to ensure that AI is used responsibly, transparently, safely and with appropriate human accountability.

## Scope

This policy applies to:

- The AI system known as ${aiName}
- Internal staff who configure, manage or review the AI system
- Vendors and AI providers involved in the system
- User-facing AI outputs, recommendations, automated responses or decision-support features
- Data processed through the AI system

## AI system summary

**AI system type:** ${v(audit.ai_system_type)}  
**Description:** ${v(audit.ai_description)}  
**Users:** ${v(audit.ai_users)}  
**AI influences:** ${list(audit.ai_influences)}  
**Current Sitora score:** ${audit.score ?? "To be confirmed"} / 90  
**Current rating:** ${v(audit.rating)}  

## Governance principles

${company} should manage AI in line with the following principles:

1. Clear purpose and business justification
2. Human accountability
3. User transparency
4. Data protection and minimisation
5. Sensitive data caution
6. Fairness and bias awareness
7. Security and access control
8. Testing and monitoring
9. Incident response and escalation
10. Regular review

## AI ownership

The AI system must have a named internal owner. The owner is responsible for:

- Maintaining the AI system register
- Reviewing AI risks
- Ensuring user-facing AI notices remain accurate
- Coordinating testing and incident response
- Reviewing vendor and cloud changes
- Escalating high-risk issues

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-system-register",
      title: "AI System Register",
      category: "AI Governance",
      content_markdown:
        baseHeader("AI System Register", audit, info) +
        `## AI system record

| Field | Details |
|---|---|
| AI system name | ${aiName} |
| Business owner | ${v(info.aiOwner || audit.internal_ai_owner)} |
| Legal entity | ${v(info.legalEntity)} |
| Trading name | ${company} |
| Website | ${v(audit.website)} |
| Primary market | ${launchMarket} |
| Business type | ${v(audit.business_type)} |
| AI system type | ${v(audit.ai_system_type)} |
| AI users | ${v(audit.ai_users)} |
| AI provider | ${v(audit.ai_provider)} |
| Cloud provider | ${v(audit.cloud_provider)} |
| Hosting region | ${v(audit.hosting_region)} |
| Data leaves KSA | ${v(audit.data_leaves_ksa)} |
| Risk level | ${v(audit.risk_level)} |
| Sensitive data involved | ${v(audit.sensitive_data_involved)} |
| Human review available | ${v(audit.human_review_available)} |
| AI override available | ${v(audit.ai_override_available)} |

## AI purpose

${v(audit.ai_description)}

## AI influence areas

${list(audit.ai_influences)}

## Review notes

${v(audit.scoring_notes)}

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-risk-assessment",
      title: "AI Risk Assessment",
      category: "AI Governance",
      content_markdown:
        baseHeader("AI Risk Assessment", audit, info) +
        `## Initial risk profile

**Risk level submitted:** ${v(audit.risk_level)}  
**Sitora score:** ${audit.score ?? "To be confirmed"} / 90  
**Sitora rating:** ${v(audit.rating)}  
**Sensitive data involved:** ${v(audit.sensitive_data_involved)}  
**Data leaves KSA:** ${v(audit.data_leaves_ksa)}  

## Key risk areas

| Risk area | Current position | Action required |
|---|---|---|
| Purpose clarity | ${v(audit.ai_description)} | Confirm purpose, limits and prohibited uses |
| Data protection | ${list(audit.data_collected)} | Confirm personal data inventory and retention |
| Sensitive data | ${v(audit.sensitive_data_involved)} | Confirm whether special safeguards are needed |
| Cross-border transfer | ${v(audit.data_leaves_ksa)} | Review AI provider and hosting region |
| Human oversight | ${v(audit.human_review_available)} | Confirm review and escalation workflow |
| Testing | ${list(audit.testing_completed)} | Complete safety and failure testing |
| Cybersecurity | ${list(audit.security_controls)} | Confirm admin, API key and access controls |
| Sector risk | Healthcare: ${list(audit.healthcare_flags)} / Finance: ${list(audit.finance_flags)} / HR: ${list(audit.hr_flags)} / Education: ${list(audit.education_flags)} | Seek specialist review where required |

## Risk conclusion

Based on the current intake, ${company} should treat ${aiName} as requiring structured AI governance and compliance-readiness work before being positioned as fully ready for Saudi/GCC deployment or enterprise buyers.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-data-flow-map",
      title: "AI Data Flow Map",
      category: "Data Protection",
      content_markdown:
        baseHeader("AI Data Flow Map", audit, info) +
        `## Purpose

This document maps the expected movement of data through ${aiName}.

## Data categories collected

${list(audit.data_collected)}

## Current data flow

1. User enters or uploads information into the AI system.
2. Information may be processed by the application backend.
3. Information may be sent to the AI provider: ${v(audit.ai_provider)}.
4. Data may be hosted or stored using: ${v(audit.cloud_provider)}.
5. Hosting region currently identified as: ${v(audit.hosting_region)}.
6. Data leaves KSA: ${v(audit.data_leaves_ksa)}.
7. AI logs access: ${v(audit.ai_logs_access)}.
8. Retention period: ${v(audit.retention_period)}.

## Data flow risks to confirm

- Whether prompts are stored
- Whether AI outputs are stored
- Whether uploaded files are stored
- Whether logs contain personal data
- Whether the AI provider uses submitted data for model training
- Whether backups are stored outside the target market
- Whether subcontractors or subprocessors are involved

## Required actions

1. Produce a visual data flow diagram.
2. Confirm all systems and vendors involved.
3. Confirm whether data leaves Saudi Arabia.
4. Confirm retention periods.
5. Confirm access controls.
6. Confirm whether sensitive data is processed.
7. Confirm user-facing privacy wording.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "personal-data-inventory",
      title: "Personal Data Inventory",
      category: "Data Protection",
      content_markdown:
        baseHeader("Personal Data Inventory", audit, info) +
        `## Personal data overview

**Personal data stored:** ${v(audit.personal_data_stored)}  
**Data collected:** ${list(audit.data_collected)}  
**Sensitive data involved:** ${v(audit.sensitive_data_involved)}  
**Retention period:** ${v(audit.retention_period)}  

## Inventory table

| Data type | Collected? | Purpose | Stored? | Retention | Access |
|---|---|---|---|---|---|
| Name | To confirm | User identification / enquiry handling | ${v(audit.personal_data_stored)} | ${v(audit.retention_period)} | ${v(audit.ai_logs_access)} |
| Email | To confirm | Communication | ${v(audit.personal_data_stored)} | ${v(audit.retention_period)} | ${v(audit.ai_logs_access)} |
| Phone | To confirm | Support or follow-up | ${v(audit.personal_data_stored)} | ${v(audit.retention_period)} | ${v(audit.ai_logs_access)} |
| Uploaded files | To confirm | AI processing / review | To confirm | To confirm | To confirm |
| AI prompts | To confirm | AI response generation | To confirm | To confirm | To confirm |
| AI outputs | To confirm | Service delivery / record keeping | To confirm | To confirm | To confirm |
| Sensitive data | ${v(audit.sensitive_data_involved)} | To confirm | To confirm | To confirm | Restricted access required |

## Required controls

- Data minimisation
- Clear privacy notice
- Clear retention schedule
- Access restrictions
- Vendor review
- Cross-border review where relevant
- Data subject rights process

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "privacy-notice-ai-addendum",
      title: "Privacy Notice AI Addendum",
      category: "Data Protection",
      content_markdown:
        baseHeader("Privacy Notice AI Addendum", audit, info) +
        `## Suggested website/privacy wording

${company} uses AI-supported technology as part of ${aiName}. This may help us process information, generate responses, support users, review enquiries, improve workflows or provide digital assistance.

Where personal data is submitted into the AI system, we aim to process it only for clear and legitimate business purposes connected to the service being provided.

## What information may be processed

The AI system may process:

${list(audit.data_collected)}

## How AI may be used

AI may be used to:

- Assist with user enquiries
- Generate draft responses
- Support internal review
- Identify relevant information
- Improve service workflows
- Provide decision-support where applicable

AI should not be treated as a replacement for professional human judgement where the matter is sensitive, high-risk, clinical, financial, legal, employment-related or otherwise significant.

## Human support

Users may request human support by contacting:

${v(info.humanSupportEmail || audit.email)}

## Data sharing and vendors

The system may involve AI, cloud or software providers, including:

- AI provider: ${v(audit.ai_provider)}
- Cloud provider: ${v(audit.cloud_provider)}
- Third-party tools: ${v(audit.third_party_tools)}

## Cross-border processing

Data leaves KSA: ${v(audit.data_leaves_ksa)}.

Where personal data may be transferred outside Saudi Arabia or another target market, this should be reviewed and documented before launch.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "cross-border-transfer-summary",
      title: "Cross-Border Transfer Summary",
      category: "Vendor & Cross-Border",
      content_markdown:
        baseHeader("Cross-Border Transfer Summary", audit, info) +
        `## Current position

**Data leaves KSA:** ${v(audit.data_leaves_ksa)}  
**AI provider:** ${v(audit.ai_provider)}  
**Cloud provider:** ${v(audit.cloud_provider)}  
**Hosting region:** ${v(audit.hosting_region)}  
**Third-party tools:** ${v(audit.third_party_tools)}  

## Transfer points to confirm

The client should confirm whether the following leave Saudi Arabia or the target launch market:

- User prompts
- Uploaded files
- Chat logs
- AI outputs
- Personal data
- Sensitive data
- Analytics events
- Backups
- Admin logs
- Support tickets
- Email notifications

## Required review

1. Identify every AI and cloud provider.
2. Confirm hosting and processing regions.
3. Review provider terms.
4. Confirm whether submitted data is used for training.
5. Confirm subprocessor lists.
6. Document transfer safeguards.
7. Seek specialist advice where sensitive data or regulated sectors are involved.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-vendor-register",
      title: "AI Vendor Register",
      category: "Vendor & Cross-Border",
      content_markdown:
        baseHeader("AI Vendor Register", audit, info) +
        `## Vendor register

| Vendor | Role | Data processed | Region | Training on data? | Contract/DPA reviewed? |
|---|---|---|---|---|---|
| ${v(audit.ai_provider)} | AI provider | Prompts, outputs, possible user data | To confirm | To confirm | To confirm |
| ${v(audit.cloud_provider)} | Cloud / hosting | Application data, logs, backups | ${v(audit.hosting_region)} | Not applicable / to confirm | To confirm |
| ${v(audit.third_party_tools)} | Third-party tools | To confirm | To confirm | To confirm | To confirm |

## Vendor review checklist

- Vendor legal name
- Service description
- Data processed
- Hosting region
- Subprocessors
- Security documentation
- Data retention terms
- Data deletion rights
- Training-on-data settings
- Breach notification terms
- Support process
- Contract or DPA status

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-disclosure-wording",
      title: "AI Disclosure Wording",
      category: "Transparency & UX",
      content_markdown:
        baseHeader("AI Disclosure Wording", audit, info) +
        `## Suggested short disclosure

This service uses AI-supported technology to help provide faster and more useful responses. AI may assist with understanding information, generating draft responses or supporting internal review.

## Suggested fuller disclosure

${company} uses AI-supported tools within ${aiName}. AI may help process information, generate responses, summarise details or support internal workflows. AI outputs may not always be complete, accurate or suitable for every situation.

Where a matter is important, sensitive, clinical, financial, legal, employment-related or safety-related, users should request human review before relying on an AI-supported response.

## Human support wording

If you would prefer human support, or if your enquiry is sensitive or urgent, please contact:

${v(info.humanSupportEmail || audit.email)}

## Existing disclosure wording supplied

${v(audit.ai_disclosure_wording)}

## Recommended UI placements

- AI assistant intro message
- Form consent area
- Results / output screen
- Confirmation page
- Terms of use
- Privacy notice
- Help / FAQ page

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "human-oversight-workflow",
      title: "Human Oversight Workflow",
      category: "Human Oversight",
      content_markdown:
        baseHeader("Human Oversight Workflow", audit, info) +
        `## Current position

**Human review available:** ${v(audit.human_review_available)}  
**AI override available:** ${v(audit.ai_override_available)}  
**Internal AI owner:** ${v(info.aiOwner || audit.internal_ai_owner)}  
**Escalation route:** ${v(audit.escalation_route)}  

## Human oversight rule

AI outputs should be reviewed by a human where:

1. The matter involves health, finance, legal, employment, children or safety.
2. The user requests human help.
3. The AI expresses uncertainty.
4. The AI output could affect a user’s rights, access, eligibility or serious decision.
5. The AI output contains a warning, harmful suggestion or inconsistent information.
6. The output could create reputational, financial or legal risk.

## Workflow

1. User interacts with AI system.
2. AI generates response or recommendation.
3. System identifies whether human review is required.
4. High-risk outputs are routed to the responsible reviewer.
5. Reviewer approves, edits, rejects or escalates.
6. Decision is logged.
7. Repeated issues are added to the AI issue register.

## Escalation

Human support contact: ${v(info.humanSupportEmail || audit.email)}

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "ai-testing-plan",
      title: "AI Safety Testing Plan",
      category: "Testing & Safety",
      content_markdown:
        baseHeader("AI Safety Testing Plan", audit, info) +
        `## Current testing evidence

${list(audit.testing_completed)}

## Known AI issues

${v(audit.known_ai_issues)}

## Required testing areas

The AI system should be tested for:

1. Normal user requests
2. Wrong-answer risk
3. Hallucination risk
4. Prompt injection
5. Sensitive-topic handling
6. Bias and fairness
7. Harmful or unsafe outputs
8. Privacy leakage
9. Overconfident advice
10. Sector-specific unsafe claims

## Test log template

| Test ID | Scenario | Input | Expected behaviour | Actual output | Pass/Fail | Fix required |
|---|---|---|---|---|---|---|
| T001 | Normal request | To test | To define | To record | To confirm | To confirm |
| T002 | Prompt injection | To test | Refuse unsafe instruction | To record | To confirm | To confirm |
| T003 | Hallucination | To test | Avoid unsupported claims | To record | To confirm | To confirm |
| T004 | Sensitive topic | To test | Escalate / disclose limits | To record | To confirm | To confirm |
| T005 | Bias/fairness | To test | Avoid unfair outcome | To record | To confirm | To confirm |

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "incident-response-plan",
      title: "AI Incident Response Plan",
      category: "Incident Response",
      content_markdown:
        baseHeader("AI Incident Response Plan", audit, info) +
        `## Purpose

This plan explains how ${company} should respond to AI-related incidents involving ${aiName}.

## Examples of AI incidents

- Personal data exposed through AI output
- Prompt injection attack
- Harmful or unsafe AI advice
- Discriminatory or biased AI result
- User complaint about AI decision
- Incorrect medical, financial, legal or safety-related output
- Unauthorised access to AI logs
- API key exposure
- Vendor or cloud breach
- Repeated hallucinations

## Response process

1. Identify the issue.
2. Record the date, time, user impact and system area.
3. Preserve evidence.
4. Escalate to the AI owner.
5. Pause affected AI function if needed.
6. Assess whether personal data or sensitive data was involved.
7. Notify legal, security or data protection advisers where required.
8. Communicate with affected users if appropriate.
9. Fix the issue.
10. Update testing logs and governance documents.

## Incident owner

AI owner: ${v(info.aiOwner || audit.internal_ai_owner)}  
Security lead: ${v(info.securityLead)}  
Data protection lead: ${v(info.dataProtectionLead)}  

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "cybersecurity-access-checklist",
      title: "Cybersecurity & Access Checklist",
      category: "Cybersecurity",
      content_markdown:
        baseHeader("Cybersecurity & Access Checklist", audit, info) +
        `## Current security controls

${list(audit.security_controls)}

## Admin access position

${v(audit.admin_dashboard_access)}

## Backup process

${v(audit.backup_process)}

## Checklist

| Control | Status | Notes |
|---|---|---|
| MFA enabled for admin users | To confirm | Required for admin access |
| Role-based access | To confirm | Limit access by job role |
| API keys protected | To confirm | Never expose keys in frontend or public repos |
| Audit logs enabled | To confirm | Record sensitive actions |
| Backups configured | To confirm | Confirm backup frequency and region |
| Production/test separation | To confirm | Avoid test data leakage |
| Vendor security reviewed | To confirm | Review AI/cloud provider evidence |
| Incident response process | To confirm | Link to incident response plan |
| Access review schedule | To confirm | Review at least quarterly |
| Leaver process | To confirm | Remove access promptly |

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "responsible-ai-website-page",
      title: "Responsible AI Website Page",
      category: "Website & App Wording",
      content_markdown:
        baseHeader("Responsible AI Website Page", audit, info) +
        `# How We Use AI Responsibly

At ${company}, we use AI-supported technology to improve our service, support users and make our workflows more efficient.

## What our AI system does

${v(audit.ai_description)}

## What AI may help with

AI may help us:

- Understand user enquiries
- Generate draft responses
- Support internal review
- Improve workflow speed
- Provide helpful guidance
- Identify information that may need human attention

## What AI does not replace

AI does not replace human judgement where a matter is sensitive, urgent, professional, clinical, financial, legal, employment-related or safety-related.

## Human support

Users can request human support by contacting:

${v(info.humanSupportEmail || audit.email)}

## Data and privacy

We aim to handle personal data responsibly and explain where AI may be involved. Please read our Privacy Notice for more information.

## Our AI governance approach

We aim to review:

- AI purpose
- Data protection
- Vendor use
- Cross-border transfer risks
- User transparency
- Human oversight
- Safety testing
- Cybersecurity
- Incident response

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "terms-ai-clause",
      title: "Terms of Use AI Clause",
      category: "Website & App Wording",
      content_markdown:
        baseHeader("Terms of Use AI Clause", audit, info) +
        `## Suggested Terms of Use clause

Our service may use AI-supported technology to help process information, generate responses, support internal workflows or improve user experience.

AI-generated or AI-assisted outputs may not always be complete, accurate or suitable for every situation. Users should not rely on AI-supported outputs as a substitute for professional advice where the matter involves health, finance, legal rights, employment, safety, children, urgent issues or other sensitive circumstances.

We may review, edit, reject or escalate AI-generated outputs where human oversight is required.

Users must not attempt to misuse the AI system, extract confidential information, bypass safety controls, upload unlawful content or use the system in a way that harms others.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },

    {
      document_key: "investor-ai-trust-summary",
      title: "Investor / Enterprise AI Trust Summary",
      category: "Commercial Trust Assets",
      content_markdown:
        baseHeader("Investor / Enterprise AI Trust Summary", audit, info) +
        `## AI trust overview

${company} has undertaken a Sitora AI Trust review for ${aiName}.

The review considers governance, data protection, transparency, human oversight, AI testing, cybersecurity, vendor risk and Saudi/GCC market readiness.

## Current score

**Score:** ${audit.score ?? "To be confirmed"} / 90  
**Rating:** ${v(audit.rating)}  

## AI system

${v(audit.ai_description)}

## Governance work completed / in progress

- AI system register
- AI risk assessment
- Data flow review
- Personal data inventory
- AI transparency wording
- Human oversight workflow
- Vendor and cross-border review
- AI safety testing plan
- Incident response planning
- Cybersecurity checklist

## Key message for investors or enterprise clients

${company} is actively building an AI governance and compliance-readiness framework around ${aiName}. This is intended to support responsible use, user trust, enterprise readiness and market expansion.

## Important limitation

This summary does not represent legal certification or formal regulatory approval. Specialist legal, cybersecurity or sector-specific review may still be required.

${standardReviewBlock(info)}
${governanceSourceNote()}`,
    },
  ];

  return files;
}