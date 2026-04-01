import { NextResponse } from "next/server";

// Mailchimp API credentials from environment variables
const API_KEY = process.env.MAILCHIMP_API_KEY; // e.g. "xxx-us1"
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = API_KEY?.split("-")[1]; // Extract server (e.g., us1)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, company, message } = body;

    if (!API_KEY || !AUDIENCE_ID) {
      console.error("Mailchimp API key or Audience ID missing.");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    // 1. Add User to Mailchimp Audience (Marketing)
    // This can trigger an automated "Welcome" or "Thank You" email in Mailchimp
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
            FNAME: firstName,
            LNAME: lastName,
            PHONE: phoneNumber,
            COMPANY: company,
            MESSAGE: message, // Assuming you have a custom merge tag "MESSAGE" (text)
          },
        }),
      }
    );

    const mcData = await mcResponse.json();

    if (!mcResponse.ok && mcData.title !== "Member Exists") {
      throw new Error(mcData.detail || "Failed to add member to Mailchimp");
    }

    // Note: To send a *custom* data-filled email to an admin, normally you'd use
    // Mailchimp Transactional (Mandrill). If you don't have it, we recommend
    // using the Audience's "New Subscriber Notification" in Mailchimp settings.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in contact API:", error.message);
    return NextResponse.json(
      { error: "Failed to process contact request" },
      { status: 500 }
    );
  }
}
