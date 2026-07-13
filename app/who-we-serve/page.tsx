import type { Metadata } from "next";
import WhoWeServelayout from "@/components/layouts/who-we-serve-layout";

export const metadata: Metadata = {
  title: "Slater Matsil | Who We Serve",
  description: "We represent large multinational companies, emerging businesses, and academic institutions in securing and leveraging intellectual property.",
};

const Whoweserve = () => {
  return (
    <div>
      <WhoWeServelayout />
    </div>
  );
};

export default Whoweserve;
