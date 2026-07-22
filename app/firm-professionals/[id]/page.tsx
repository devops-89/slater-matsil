import type { Metadata } from "next";
import ProfessionalDetailsLayout from "@/components/layouts/professionals-details-layout/Index";
import { Box } from "@mui/material";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

async function getProfessionalData(idStr: string) {
  try {
    const res = await fetch(`http://3.92.74.11/api/users/${idStr}`, { next: { revalidate: 60 } }).catch(() => null);
    if (!res) return null;
    let userObj = await res.json();
    while (userObj && userObj.data && !userObj.id && !userObj.fullName) {
      userObj = userObj.data;
    }
    if (userObj && userObj.user && !userObj.id && !userObj.fullName) {
      userObj = userObj.user;
    }
    return userObj && (userObj.id || userObj.fullName) ? userObj : null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const idStr = resolvedParams.id || (resolvedParams as any).slug;
  if (!idStr) return { title: "Professional Details | Slater Matsil" };

  const professional = await getProfessionalData(idStr);

  if (!professional) {
    return {
      title: "Professional Details | Slater Matsil",
      description: "Meet our intellectual property legal professionals.",
    };
  }

  const name = professional.fullName || professional.name;
  const title = professional.professionalProfiles?.[0]?.jobTitle || "IP Legal Professional";
  return {
    title: `${name} | Slater Matsil`,
    description: `Meet ${name}, ${title} at Slater Matsil, specializing in intellectual property law, patents, and strategic counseling.`,
  };
}

const ProfessionalDetails = async ({ params }: Props) => {
  const resolvedParams = await params;
  const idStr = resolvedParams.id || (resolvedParams as any).slug;
  const apiData = idStr ? await getProfessionalData(idStr) : null;
  
  // We'll need to map this in the layout
  return (
    <Box>
      <Box>
        <ProfessionalDetailsLayout initialRawData={apiData} />
      </Box>
    </Box>
  );
};

export default ProfessionalDetails;
