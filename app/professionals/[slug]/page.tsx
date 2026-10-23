import type { Metadata } from "next";
import ProfessionalDetailsLayout from "@/components/layouts/professionals-details-layout/Index";
import { generateSlug, generateProfessionalSlug } from "@/utils/generateSlug";
import { formatProfessionalDisplayName } from "@/utils/mappers/firmProfessionalsMapper";
import { Box } from "@mui/material";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug?: string; id?: string }> | { slug?: string; id?: string };
};

async function getProfessionalData(idOrSlug: string) {
  try {
    if (!idOrSlug) return null;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // 1. If it's a numeric ID, fetch directly by ID
    const isNumeric = !isNaN(Number(idOrSlug)) && idOrSlug.trim() !== "";
    if (isNumeric) {
      const res = await fetch(`${backendUrl}/api/users/${idOrSlug}`, {
        next: { revalidate: 60 },
      }).catch(() => null);
      if (res) {
        let userObj = await res.json();
        while (userObj && userObj.data && !userObj.id && !userObj.fullName) {
          userObj = userObj.data;
        }
        if (userObj && userObj.user && !userObj.id && !userObj.fullName) {
          userObj = userObj.user;
        }
        if (userObj && (userObj.id || userObj.fullName)) return userObj;
      }
    }

    // 2. If it's a slug, find the matching user and fetch full profile by their ID
    const listRes = await fetch(
      `${backendUrl}/api/users/all?role=PROFESSIONAL&limit=1000`,
      { next: { revalidate: 60 } }
    ).catch(() => null);

    if (listRes) {
      const listData = await listRes.json();
      const users =
        listData?.data?.users ||
        listData?.data?.data?.users ||
        [];

      const targetSlug = idOrSlug.toLowerCase().trim();

      const matchedUser = users.find((u: any) => {
        const profSlug = generateProfessionalSlug(u);
        const fullNameSlug = generateSlug(u.fullName || "");
        const rawSlug = (u.slug || "").toLowerCase().trim();
        return (
          profSlug === targetSlug ||
          fullNameSlug === targetSlug ||
          rawSlug === targetSlug ||
          (u.id && u.id.toString() === targetSlug)
        );
      });

      if (matchedUser?.id) {
        const fullRes = await fetch(
          `${backendUrl}/api/users/${matchedUser.id}`,
          { next: { revalidate: 60 } }
        ).catch(() => null);

        if (fullRes) {
          let userObj = await fullRes.json();
          while (userObj && userObj.data && !userObj.id && !userObj.fullName) {
            userObj = userObj.data;
          }
          if (userObj && userObj.user && !userObj.id && !userObj.fullName) {
            userObj = userObj.user;
          }
          if (userObj && (userObj.id || userObj.fullName)) return userObj;
        }

        return matchedUser;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const idOrSlug = resolvedParams.slug || resolvedParams.id;
  if (!idOrSlug) return { title: "Professional Details | Slater Matsil" };

  const professional = await getProfessionalData(idOrSlug);

  if (!professional) {
    return {
      title: "Professional Details | Slater Matsil",
      description: "Meet our intellectual property legal professionals.",
    };
  }

  const name =
    formatProfessionalDisplayName(professional) ||
    professional.fullName ||
    professional.name;
  const title =
    professional.professionalProfiles?.[0]?.jobTitle || "IP Legal Professional";
  return {
    title: `${name} | Slater Matsil`,
    description: `Meet ${name}, ${title} at Slater Matsil, specializing in intellectual property law, patents, and strategic counseling.`,
  };
}

const ProfessionalDetails = async ({ params }: Props) => {
  const resolvedParams = await params;
  const idOrSlug = resolvedParams.slug || resolvedParams.id;
  const apiData = idOrSlug ? await getProfessionalData(idOrSlug) : null;

  return (
    <div>
      <div>
        <ProfessionalDetailsLayout initialRawData={apiData} />
      </div>
    </div>
  );
};

export default ProfessionalDetails;
