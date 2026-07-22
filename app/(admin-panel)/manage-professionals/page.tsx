import FirmProfessionalsAdminLayout from "@/components/layouts/admin-layout/FirmProfessionalsAdminLayout";
import axios from "axios";

export const revalidate = 60;

export default async function ManageProfessionalsPage() {
  let initialProfessionals = [];
  try {
    const res = await axios.get("http://3.92.74.11/api/users/all?role=PROFESSIONAL&limit=1000");
    initialProfessionals = res.data?.data?.users || res.data?.data?.data?.users || [];
  } catch (error) {
    console.error("Failed to fetch SSR professionals", error);
  }

  return <FirmProfessionalsAdminLayout initialProfessionals={initialProfessionals} />;
}
