import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import lightLogo from "@/public/images/home/slater-matsil-logo-light.png";
import serviceAreas1 from "@/public/images/home/practice_areas/practice_areas1.svg";
export const WEBSITE_DATA: HOMEPAGE_DATA_PROPS = {
  title: "Slater Matsil",
  homepage: {
    heroSection: {
      heading: "A unique team of patent professionals",
      subHeading: "Safegaurding innovation through legal insight.",
      videoHeading: {
        title: "Watch",
        subTitle: "Thats how we make it work?",
      },
    },
    aboutSection: {
      sectionTitle: "About Slatermatsil",
      heading: "Fluent in technology. proven in law.",
      description:
        "Slater Matsil is a collaboration of technology-minded individuals who practice intellectual property law. We understand that IP rights are, first and foremost, working assets that must support and advance our clients' business objectives. We maintain this client-centric perspective, whether we are discussing technology with inventors in the design room, developing IP strategies with management in the board room, or advocating for our clients' rights in the courtroom.",
      ctaButton: {
        text: "More About",
        link: "/about",
      },
      experience: {
        years: "18",
        title: "Years of",
        subTitle: "Pro Expoeriences",
      },
    },
    our_metrics: {
      sectionTitle: "Our Metrics",
      heading: {
        title: "Our firm is globally connected. Internationally",
        subTitle: "respected.",
      },
      description:
        "At Slater Matsil, we know what is required to invent something groundbreaking and we know what it takes to guard and defend your company’s intellectual capital.",
      ctaButton: "Let's Talk Now",
      metricsData: [
        {
          title: "U.S. PATENTS ISSUED",
          count: "24,180+",
        },
        {
          title: "COUNTRIES WE SERVE",
          count: "6",
        },
        {
          title: "PATENTS ISSUED TO FIRM PERSONNELS",
          count: "200+",
        },
        {
          title: "NO. OF PATENT PROFESSIONALS WITH ADV. TECHNICAL DEGREES",
          count: "50%",
        },
      ],
    },
    service_area: {
      sectionTitle: "Service Area",
      heading: "A range of Practice Areas",
      img: lightLogo,
      section_Data: [
        {
          img: serviceAreas1,
          title: "PATENT PROSECUTION",
          description:
            "We are engineers. We are lawyers. We are businessmen. We are also licensing professionals and IP litigators. Because we see the world from many perspectives, we are able to craft patents that contribute to IP portfolios that achieve your goals. ",
          serialNumber: "01",
        },
      ],
    },
  },
};
