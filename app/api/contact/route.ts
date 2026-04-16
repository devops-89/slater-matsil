import { NextResponse } from "next/server";

// ENV VARIABLES
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const MANDRILL_API_KEY = process.env.MAILCHIMP_MANDRILL_API!;

const SERVER_PREFIX = MAILCHIMP_API_KEY?.split("-")[1];

export async function POST(req: Request) {
  console.log("🚀 API HIT");

  try {
    const body = await req.json();

    const { firstName, lastName, email, phoneNumber, company, message } = body;

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // =========================
    // 1. MAILCHIMP (Audience Add)
    // =========================
    try {
      const mcRes = await fetch(
        `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `apikey ${MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
              PHONE: phoneNumber,
              COMPANY: company,
            },
          }),
        },
      );

      const mcData = await mcRes.json();
      console.log("📩 Mailchimp:", mcData);
    } catch (err) {
      console.error("❌ Mailchimp error:", err);
    }

    // =========================
    // 2. MANDRILL EMAIL SEND
    // =========================

    if (!MANDRILL_API_KEY) {
      console.error("❌ Missing Mandrill API key");
      return NextResponse.json(
        { error: "Email config missing" },
        { status: 500 },
      );
    }

    console.log("✅ Mandrill block executing");

    const mandrillUrl = "https://mandrillapp.com/api/1.0/messages/send.json";

    const fromEmail = process.env.FROM_EMAIL || "info@yourdomain.com";
    const adminEmail = process.env.ADMIN_EMAIL || "your@email.com";

    try {
      // 👉 ADMIN EMAIL
      const adminRes = await fetch(mandrillUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: MANDRILL_API_KEY,
          message: {
            from_email: fromEmail,
            from_name: "Website Contact",
            to: [{ email: adminEmail, type: "to" }],
            subject: "New Contact Form Submission",
            html: `
              <h2>New Lead</h2>
              <p><b>Name:</b> ${firstName} ${lastName}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Phone:</b> ${phoneNumber || "N/A"}</p>
              <p><b>Company:</b> ${company || "N/A"}</p>
              <p><b>Message:</b></p>
              <p>${message || "N/A"}</p>
            `,
          },
        }),
      });

      const adminData = await adminRes.json();

      // 👉 USER EMAIL
      const userRes = await fetch(mandrillUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: MANDRILL_API_KEY,
          message: {
            from_email: fromEmail,
            from_name: "Your Company",
            to: [{ email: email, type: "to" }],
            subject: "We received your message",
            html: `
              <h2>Hi ${firstName},</h2>
              <p>Thanks for contacting us.</p>
              <p>We will get back to you shortly.</p>
              <br/>
              <p>Best regards,<br/>Team</p>
            `,
          },
        }),
      });

      const userData = await userRes.json();

      console.log("📧 Admin:", adminData);
      console.log("📧 User:", userData);

      // Check admin email delivery (critical)
      if (adminData[0]?.status !== "sent") {
        console.error("❌ Admin email not delivered:", adminData);
      } else {
        console.log("✅ Admin email sent successfully");
      }

      // Check user email delivery (non-critical — may fail in Mandrill sandbox/test mode)
      if (userData[0]?.status !== "sent") {
        const reason = userData[0]?.reject_reason;
        if (reason === "recipient-domain-mismatch") {
          console.warn(
            "⚠️ User email rejected: Mandrill is in sandbox/test mode and only delivers to your verified domain (@slatermatsil.com). ",
            "To send to external addresses, activate your Mandrill account at: https://mandrillapp.com"
          );
        } else {
          console.error("❌ User email not delivered:", userData);
        }
      } else {
        console.log("✅ User confirmation email sent successfully");
      }
    } catch (err) {
      console.error("❌ Mandrill error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ API ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
