import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, url } = await req.json();
    
    // Basic validation
    if (!email || !url) {
      return NextResponse.json(
        { error: "Email and URL are required" }, 
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" }, 
        { status: 400 }
      );
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" }, 
        { status: 400 }
      );
    }

    // TODO: Integrate with email service (Resend example below)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Send acknowledgment email
    await resend.emails.send({
      from: 'TriggerBy AI <audit@triggerby.ai>',
      to: email,
      subject: 'Your AI Audit is Being Processed',
      html: `
        <h2>Thanks for requesting your AI audit!</h2>
        <p>We're analyzing your store: <strong>${url}</strong></p>
        <p>You'll receive your detailed diagnostic report within 30 minutes.</p>
        <p>Best regards,<br>The TriggerBy Team</p>
      `,
    });
    */

    // TODO: Queue background analysis job
    // This could integrate with a job queue, database, or external service
    console.log(`Audit requested for ${email} - Store: ${url}`);

    return NextResponse.json({ 
      ok: true, 
      message: "Audit request received successfully" 
    });

  } catch (error) {
    console.error('Audit API error:', error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}