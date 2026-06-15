import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { generatePitchDeckSvgs } from "@/lib/generatePitchDeckSvg";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendApiKey = process.env.RESEND_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const generatedSvgs = generatePitchDeckSvgs(data);

    const { data: inserted, error } = await supabase
      .from("pitch_deck_submissions")
      .insert({
        ...data,
        status: "new",
        generated_svg: generatedSvgs,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    await resend.emails.send({
      from: process.env.SITORA_FROM_EMAIL!,
      to: process.env.SITORA_ADMIN_EMAIL!,
      subject: `New Pitch Deck Submission — ${data.business_name || "Unknown Business"}`,
      html: `
        <h1>New Sitora DeckStudio Submission</h1>
        <p><strong>Business:</strong> ${data.business_name || ""}</p>
        <p><strong>Founder:</strong> ${data.founder_name || ""}</p>
        <p><strong>Email:</strong> ${data.email || ""}</p>
        <p><strong>Industry:</strong> ${data.industry || ""}</p>
        <p><strong>Funding Needed:</strong> ${data.funding_needed || ""}</p>
        <p>A generated SVG deck draft has been saved to the submission record.</p>
      `,
    });

    if (data.email) {
      await resend.emails.send({
        from: process.env.SITORA_FROM_EMAIL!,
        to: data.email,
        subject: "Your Sitora Pitch Deck Brief Has Been Received",
        html: `
          <h1>Your pitch deck brief has been received</h1>
          <p>Thank you for submitting your information to Sitora DeckStudio.</p>
          <p>Your draft deck has been generated and sent to the Sitora team for review.</p>
          <p>We will review the structure, refine the positioning and prepare the final version for delivery.</p>
          <p><strong>Sitora</strong></p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      id: inserted.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}