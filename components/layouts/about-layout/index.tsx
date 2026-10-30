import AboutHerosection from "./About-Herosection";
import DrivingInnovation from "./Driving-innovation";
import RedefiningPatent from "../../widgets/Redefining-Patent";
import InsightsInnovation from "./Insights-innovation";
import Award from "./Award";
import WhoweServe from "./Who-we-serve";
import IndustriesWeServe from "./Industries-We-Serve";
import InsightsSection from "@/components/widgets/Insights-section";

const AboutLayout = ({ apiData }: { apiData?: any }) => {
  return (
    <div>
      <AboutHerosection apiData={apiData} />
      <DrivingInnovation />
      <RedefiningPatent />
      <InsightsInnovation />
      <Award />
      <WhoweServe />
      <IndustriesWeServe />
      <InsightsSection />
    </div>
  );
};

export default AboutLayout;
