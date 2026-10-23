import { verifyReCaptcha } from "@/utils/recaptcha";
import { NextResponse } from "next/server";

// Mailchimp API credentials from environment variables
const API_KEY = process.env.MAILCHIMP_API_KEY; // e.g. "xxx-us1"
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = API_KEY?.split("-")[1]; // Extract server (e.g., us1)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, date, time, message, recaptchaToken } = body;

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const verification = await verifyReCaptcha(recaptchaToken);
      if (!verification.success) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed", details: verification.message },
          { status: 400 }
        );
      }
    } else {
      // If token is missing, we could reject it in production
      // return NextResponse.json({ error: "Missing reCAPTCHA token" }, { status: 400 });
    }

    if (!API_KEY || !AUDIENCE_ID) {
      console.error("Mailchimp API key or Audience ID missing.");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 },
      );
    }

    const mcResponse = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            NAME: name,
            SERVICE: service?.label || "",
            DATE: date || "",
            TIME: time || "",
            MESSAGE: message,
          },
          tags: ["Appointment Request"],
        }),
      },
    );

    const mcData = await mcResponse.json();

    if (!mcResponse.ok && mcData.title !== "Member Exists") {
      throw new Error(
        mcData.detail || "Failed to add appointment to Mailchimp",
      );
    }

    const MANDRILL_API_KEY = process.env.MAILCHIMP_MANDRILL_API;

    if (MANDRILL_API_KEY) {
      const mandrillUrl = "https://mandrillapp.com/api/1.0/messages/send.json";

      const adminEmail = process.env.ADMIN_EMAIL || "info@slatermatsil.com";
      const fromEmail = process.env.FROM_EMAIL || "info@slatermatsil.com";
      const ccEmail = process.env.CC_EMAIL || "kunal.sharma@digixito.com";

      const adminPayload = {
        key: MANDRILL_API_KEY,
        message: {
          from_email: fromEmail,
          from_name: "Slater Matsil Website",
          to: [
            { email: adminEmail, type: "to" },
            ...(ccEmail ? [{ email: ccEmail, type: "cc" }] : []),
          ],
          preserve_recipients: true,
          subject: "New Appointment Request",
          html: `
            <h2>New Appointment Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service?.label || "N/A"}</p>
            <p><strong>Date:</strong> ${date || "N/A"}</p>
            <p><strong>Time:</strong> ${time || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p>${message || "N/A"}</p>
          `,
        },
      };

      const userPayload = {
        key: MANDRILL_API_KEY,
        message: {
          from_email: fromEmail,
          from_name: "Slater Matsil",
          to: [{ email: email, type: "to" }],
          subject: "Thank you for your appointment request",
          html: `
            <h2>Thank you for contacting us, ${name}!</h2>
            <p>We have received your appointment request for <strong>${service?.label || "our services"}</strong> on <strong>${date || "a TBD date"}</strong> at <strong>${time || "a TBD time"}</strong>.</p>
            <p>Our team will review your request and get back to you shortly to confirm.</p>
            <br />
            <p>Best regards,</p>
            <p>The Slater Matsil Team</p>
          `,
        },
      };

      try {
        const [adminRes, userRes] = await Promise.all([
          fetch(mandrillUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminPayload),
          }),
          fetch(mandrillUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPayload),
          }),
        ]);

        const adminData = await adminRes.json();
        const userData = await userRes.json();

        // Mandrill returns an array of recipient statuses.
        // Even if adminRes.ok is true, individual recipients may have failed.
        console.log("Mandrill Admin Response:", adminData);
        console.log("Mandrill User Response:", userData);

        if (!adminRes.ok || !userRes.ok) {
          console.error("Mandrill API Error:", {
            admin: adminData,
            user: userData,
          });
        }
      } catch (emailError: any) {
        console.error("Error sending Mandrill email:", emailError.message);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in appointment API:", error.message);
    return NextResponse.json(
      { error: "Failed to process appointment request" },
      { status: 500 },
    );
  }
}
