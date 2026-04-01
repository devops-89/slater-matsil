import { NextResponse } from "next/server";

// Mailchimp API credentials from environment variables
const API_KEY = process.env.MAILCHIMP_API_KEY; // e.g. "xxx-us1"
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = API_KEY?.split("-")[1]; // Extract server (e.g., us1)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, date, time, message } = body;

    if (!API_KEY || !AUDIENCE_ID) {
      console.error("Mailchimp API key or Audience ID missing.");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    // 1. Add Appointment Request to Mailchimp Audience (as a tag or custom field)
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
      }
    );

    const mcData = await mcResponse.json();

    if (!mcResponse.ok && mcData.title !== "Member Exists") {
      throw new Error(mcData.detail || "Failed to add appointment to Mailchimp");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in appointment API:", error.message);
    return NextResponse.json(
      { error: "Failed to process appointment request" },
      { status: 500 }
    );
  }
}
