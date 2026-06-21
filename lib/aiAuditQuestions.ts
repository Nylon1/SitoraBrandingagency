export type AuditQuestion = {
  id: string;
  question: string;
  type: "text" | "textarea" | "select" | "multiselect";
  options?: string[];
};

export type AuditSection = {
  title: string;
  description: string;
  questions: AuditQuestion[];
};

export const aiAuditSections: AuditSection[] = [
  {
    title: "Business Information",
    description: "Basic information about the business and its operating context.",
    questions: [
      { id: "business_name", question: "What is your business name?", type: "text" },
      { id: "contact_name", question: "Who is the main contact for this assessment?", type: "text" },
      { id: "email", question: "What is your email address?", type: "text" },
      { id: "website", question: "What is your website?", type: "text" },
      { id: "industry", question: "What sector or industry do you operate in?", type: "text" },
      {
        id: "countries_served",
        question: "Which countries or regions do you operate in or serve customers in?",
        type: "multiselect",
        options: ["UK", "EU", "USA", "Middle East", "International", "Not sure"],
      },
      {
        id: "customer_type",
        question: "Who do you work with?",
        type: "multiselect",
        options: ["Consumers", "Businesses", "Patients", "Candidates", "Students", "Employees", "Clients", "Members of the public"],
      },
      {
        id: "compliance_owner",
        question: "Who is responsible for technology, compliance or data protection in your business?",
        type: "text",
      },
    ],
  },
  {
    title: "Current AI Usage",
    description: "Identify where AI is currently being used across the business.",
    questions: [
      {
        id: "currently_uses_ai",
        question: "Are you currently using AI in your business?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Planning to"],
      },
      {
        id: "ai_usage_areas",
        question: "Where is AI currently being used?",
        type: "multiselect",
        options: [
          "Website chatbot",
          "CRM",
          "Customer service",
          "Marketing/content",
          "Recruitment/HR",
          "Healthcare/patient support",
          "Finance/eligibility",
          "Internal admin",
          "Software/SaaS product",
          "Analytics/prediction",
          "Not sure",
        ],
      },
      {
        id: "staff_ai_tools",
        question: "Do staff use tools such as ChatGPT, Copilot, Gemini, Claude or similar?",
        type: "select",
        options: ["Yes", "No", "Some staff may use it", "Not sure"],
      },
      {
        id: "ai_generated_content",
        question: "Do you use AI for blogs, social media, emails, adverts or website content?",
        type: "select",
        options: ["Yes", "No", "Sometimes", "Not sure"],
      },
      {
        id: "ai_customer_service",
        question: "Do you use AI for customer service or answering enquiries?",
        type: "select",
        options: ["Yes", "No", "Planning to", "Not sure"],
      },
      {
        id: "ai_decision_support",
        question: "Does AI make, recommend, rank, approve, reject or influence decisions?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
    ],
  },
  {
    title: "AI Tools and Suppliers",
    description: "Understand which AI tools are being used and whether suppliers have been checked.",
    questions: [
      {
        id: "tools_used",
        question: "Which AI tools or platforms do you currently use?",
        type: "textarea",
      },
      {
        id: "approved_tools",
        question: "Do you have a list of approved AI tools?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "banned_tools",
        question: "Do you have a list of banned or restricted AI tools?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "supplier_terms_checked",
        question: "Have you reviewed the AI supplier’s privacy policy, terms and data processing conditions?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
      {
        id: "data_training",
        question: "Do you know whether your business data is used to train the AI model?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Not applicable"],
      },
      {
        id: "new_tool_approval",
        question: "Do you have a process for approving new AI tools before staff use them?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
    ],
  },
  {
    title: "Data Protection and Privacy",
    description: "Check whether personal or sensitive data is being entered into AI tools.",
    questions: [
      {
        id: "personal_data_ai",
        question: "Do you enter personal data into AI tools?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "sensitive_data_ai",
        question: "Do you enter sensitive data into AI tools?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "data_types",
        question: "What types of data may be entered into AI tools?",
        type: "multiselect",
        options: [
          "Customer data",
          "Patient data",
          "Employee data",
          "Candidate data",
          "Financial data",
          "Health data",
          "Children’s data",
          "Legal documents",
          "Complaints",
          "Internal confidential data",
          "Not sure",
        ],
      },
      {
        id: "privacy_policy_ai",
        question: "Does your privacy policy explain how AI tools are used?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
      {
        id: "dpia_completed",
        question: "Have you carried out a Data Protection Impact Assessment for any AI use?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "data_deletion_process",
        question: "Do you have a process for deleting AI-related data when needed?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
    ],
  },
  {
    title: "Transparency and Disclosures",
    description: "Check whether customers, staff and users are told when AI is involved.",
    questions: [
      {
        id: "customers_told_ai",
        question: "Are customers or users told when they are interacting with AI?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
      {
        id: "chatbot_disclosure",
        question: "Does your chatbot clearly say it is AI or automated?",
        type: "select",
        options: ["Yes", "No", "No chatbot", "Not sure"],
      },
      {
        id: "human_route",
        question: "Do users have a clear route to speak to a human?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
      {
        id: "ai_content_disclosure",
        question: "Do you disclose AI-generated content, images, audio or video where required?",
        type: "select",
        options: ["Yes", "No", "Sometimes", "Not sure"],
      },
      {
        id: "ai_claims_accuracy",
        question: "Are your website or marketing claims about AI accurate and explainable?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
    ],
  },
  {
    title: "Human Oversight and Decision-Making",
    description: "Check whether AI outputs are reviewed and whether humans can override decisions.",
    questions: [
      {
        id: "human_review",
        question: "Is there human review before AI-influenced decisions are finalised?",
        type: "select",
        options: ["Yes", "No", "Sometimes", "Not sure"],
      },
      {
        id: "human_override",
        question: "Can a human override an AI-assisted decision?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Not applicable"],
      },
      {
        id: "ai_output_checked",
        question: "Are AI outputs checked for accuracy before being sent to customers or used internally?",
        type: "select",
        options: ["Yes", "No", "Sometimes", "Not sure"],
      },
      {
        id: "decision_records",
        question: "Do you keep records of when AI influenced a decision?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Not applicable"],
      },
      {
        id: "explain_decision",
        question: "Could you explain an AI-assisted decision if challenged?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Not applicable"],
      },
    ],
  },
  {
    title: "High-Risk Areas",
    description: "Identify whether AI is being used in areas that may need stronger controls.",
    questions: [
      {
        id: "high_risk_usage",
        question: "Do you use AI in any of these areas?",
        type: "multiselect",
        options: [
          "Recruitment or HR",
          "Healthcare, dental or patient support",
          "Finance, lending, insurance or eligibility",
          "Education or assessment",
          "Legal-style advice or complaints",
          "Employee monitoring",
          "Children or vulnerable people",
          "Biometric identification",
          "Fraud detection or risk scoring",
          "None of these",
          "Not sure",
        ],
      },
      {
        id: "rights_impact",
        question: "Could AI affect someone’s rights, money, job, health, safety or access to services?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
    ],
  },
  {
    title: "Policies and Governance",
    description: "Check whether the business has the right AI governance documents and processes.",
    questions: [
      {
        id: "ai_usage_policy",
        question: "Do you have an AI usage policy?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "staff_ai_policy",
        question: "Do you have a staff AI policy?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "tool_register",
        question: "Do you have an AI tool register?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "risk_register",
        question: "Do you have an AI risk register?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "supplier_checklist",
        question: "Do you have an AI supplier checklist?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "incident_response",
        question: "Do you have an AI incident response process?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "management_oversight",
        question: "Is there director, board or management oversight of AI use?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
    ],
  },
  {
    title: "Security and Risk",
    description: "Check whether AI could expose confidential or sensitive business information.",
    questions: [
      {
        id: "confidential_data_ai",
        question: "Do staff enter trade secrets, contracts, pricing, customer data or internal documents into AI tools?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "access_controls",
        question: "Do AI tools have login protection and access controls?",
        type: "select",
        options: ["Yes", "No", "Some do", "Not sure"],
      },
      {
        id: "former_staff_access",
        question: "Can former staff still access any AI tools or shared AI accounts?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "ai_logs",
        question: "Do you have audit logs showing who used AI tools and when?",
        type: "select",
        options: ["Yes", "No", "Some tools", "Not sure"],
      },
      {
        id: "hallucination_process",
        question: "Do you have a process for checking and correcting AI hallucinations or errors?",
        type: "select",
        options: ["Yes", "No", "Informal only", "Not sure"],
      },
    ],
  },
  {
    title: "Bias, Fairness and Accuracy",
    description: "Check whether AI outputs could be biased, unfair or inaccurate.",
    questions: [
      {
        id: "protected_characteristics",
        question: "Could your AI tools treat people differently based on age, gender, race, disability, religion or other protected characteristics?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "bias_testing",
        question: "Have you tested AI outputs for bias?",
        type: "select",
        options: ["Yes", "No", "Partially", "Not sure"],
      },
      {
        id: "accuracy_testing",
        question: "Do you check whether AI outputs are accurate?",
        type: "select",
        options: ["Yes", "No", "Sometimes", "Not sure"],
      },
      {
        id: "challenge_outcomes",
        question: "Can users, customers, candidates or staff challenge AI-assisted outcomes?",
        type: "select",
        options: ["Yes", "No", "Not sure", "Not applicable"],
      },
    ],
  },
  {
    title: "Incidents and Complaints",
    description: "Understand whether AI has already caused issues or complaints.",
    questions: [
      {
        id: "previous_ai_issue",
        question: "Has AI ever produced incorrect, harmful, biased or misleading content in your business?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "ai_complaints",
        question: "Has anyone complained about your use of AI?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
      {
        id: "complaint_process",
        question: "Do you have a process for investigating AI-related complaints?",
        type: "select",
        options: ["Yes", "No", "In progress", "Not sure"],
      },
      {
        id: "incident_records",
        question: "Do you keep records of AI-related complaints or incidents?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
    ],
  },
  {
    title: "Future AI Plans",
    description: "Identify upcoming AI use so governance can be prepared early.",
    questions: [
      {
        id: "future_ai_tools",
        question: "Are you planning to introduce more AI tools in the next 12 months?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "future_ai_areas",
        question: "Where are you planning to use AI next?",
        type: "multiselect",
        options: [
          "Website chatbot",
          "Customer service",
          "Recruitment",
          "Healthcare/admin workflows",
          "Finance/eligibility",
          "Internal admin",
          "Marketing",
          "Software product",
          "Not sure",
        ],
      },
      {
        id: "sell_ai_services",
        question: "Are you planning to sell AI services or AI software to clients?",
        type: "select",
        options: ["Yes", "No", "Possibly", "Not sure"],
      },
      {
        id: "support_needed_detail",
        question: "What support do you need from Sitora?",
        type: "textarea",
      },
    ],
  },
];