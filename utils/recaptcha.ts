export async function verifyReCaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not defined");
    return { success: false, message: "Server configuration error" };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      return { success: true };
    } else {
      return {
        success: false,
        message: "Failed reCAPTCHA verification",
        errors: data["error-codes"],
      };
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false, message: "Internal verification error" };
  }
}
