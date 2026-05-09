import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  website?: string;
  projectType?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  message?: string;
};

function clean(value?: string) {
  return value?.trim() || "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    const name = clean(body.name);
    const business = clean(body.business);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const website = clean(body.website);
    const projectType = clean(body.projectType);
    const goal = clean(body.goal);
    const budget = clean(body.budget);
    const timeline = clean(body.timeline);
    const message = clean(body.message);

    if (!body.name || !body.business || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Please complete the required fields." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@sitora.co.uk";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Sitora <onboarding@resend.dev>";

    const html = `
      <div style="font-family: Arial, sans-serif; background:#05070d; color:#ffffff; padding:32px;">
        <div style="max-width:720px; margin:0 auto; background:#0b111d; border:1px solid rgba(255,255,255,0.12); border-radius:24px; overflow:hidden;">
          <div style="padding:28px; background:linear-gradient(135deg, rgba(216,182,109,0.22), rgba(255,255,255,0.04));">
            <p style="margin:0; color:#d8b66d; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:bold;">
              New Sitora Project Brief
            </p>
            <h1 style="margin:12px 0 0; font-size:28px; line-height:1.2;">
              ${escapeHtml(business)}
            </h1>
          </div>

          <div style="padding:28px;">
            <h2 style="font-size:18px; margin:0 0 16px; color:#d8b66d;">Contact Details</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Business:</strong> ${escapeHtml(business)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Current website:</strong> ${escapeHtml(website)}</p>

            <hr style="border:none; border-top:1px solid rgba(255,255,255,0.12); margin:24px 0;" />

            <h2 style="font-size:18px; margin:0 0 16px; color:#d8b66d;">Project Details</h2>
            <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
            <p><strong>Main goal:</strong> ${escapeHtml(goal)}</p>
            <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
            <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>

            <hr style="border:none; border-top:1px solid rgba(255,255,255,0.12); margin:24px 0;" />

            <h2 style="font-size:18px; margin:0 0 16px; color:#d8b66d;">Message</h2>
            <p style="white-space:pre-line; line-height:1.7;">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;

    const text = `
New Sitora Project Brief

Name: ${name}
Business: ${business}
Email: ${email}
Phone: ${phone}
Current website: ${website}

Project type: ${projectType}
Main goal: ${goal}
Budget: ${budget}
Timeline: ${timeline}

Message:
${message}
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Sitora Project Brief - ${business}`,
      html,
      text,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}