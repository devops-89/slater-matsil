import vCardsJS from "vcards-js";

export async function POST(req: Request) {
  const body = await req.json();

  const vCard = vCardsJS();
  vCard.firstName = body.firstName || "";
  vCard.lastName = body.lastName || "";
  vCard.email = body.email || "";
  vCard.workPhone = body.phone || "";

  vCard.homeAddress.street = body.address?.street || "";
  vCard.homeAddress.city = body.address?.city || "";
  vCard.homeAddress.stateProvince = body.address?.state || "";
  vCard.homeAddress.postalCode = body.address?.postalCode || "";
  vCard.homeAddress.countryRegion = body.address?.countryRegion || "";

  return new Response(vCard.getFormattedString(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename=${body.firstName}_${body.lastName}.vcf`,
    },
  });
}
