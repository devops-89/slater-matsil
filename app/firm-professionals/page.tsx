import type { Metadata } from "next";
import ProfessionalsLayout from "@/components/layouts/professionals-layout/Index";

export const metadata: Metadata = {
  title: "Slater Matsil | Professionals",
  description: "Browse the biographies and expertise of our intellectual property attorneys, patent agents, and specialists.",
};

const FirmProfessionals = () => {
  return (
    <div>
      <ProfessionalsLayout />
    </div>
  );
};

export default FirmProfessionals;
