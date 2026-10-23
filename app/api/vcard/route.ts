import vCardsJS from "vcards-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const createVCard = typeof vCardsJS === "function" ? vCardsJS : (vCardsJS as any).default;
    if (typeof createVCard !== "function") {
      throw new Error("vCardsJS is not executable");
    }

    const vCard = createVCard();
    vCard.firstName = body.firstName || "";
    vCard.lastName = body.lastName || "";
    vCard.organization = body.organization || "Slater Matsil";
    vCard.title = body.title || body.jobTitle || "";
    vCard.workEmail = body.email || "";
    vCard.email = body.email || "";
    vCard.workPhone = body.phone || "";

    if (body.address) {
      vCard.workAddress.street = body.address.street || "";
      vCard.workAddress.city = body.address.city || "";
      vCard.workAddress.stateProvince = body.address.state || "";
      vCard.workAddress.postalCode = body.address.postalCode || "";
      vCard.workAddress.countryRegion = body.address.countryRegion || "USA";
    }

    const filename = `${body.firstName || "Contact"}_${body.lastName || "Card"}.vcf`.replace(/\s+/g, "_");

    return new Response(vCard.getFormattedString(), {
      status: 200,
      headers: {
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error generating vCard:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Failed to generate vCard" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

