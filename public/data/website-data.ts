import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import lightLogo from "@/public/images/home/slater-matsil-logo-light.png";
import serviceAreas1 from "@/public/images/home/practice_areas/practice_areas1.svg";
import serviceAreas2 from "@/public/images/home/practice_areas/practice_areas2.svg";
import serviceAreas3 from "@/public/images/home/practice_areas/practice_areas3.svg";
import serviceAreas4 from "@/public/images/home/practice_areas/practice_areas4.svg";
import serviceAreas5 from "@/public/images/home/practice_areas/practice_areas5.svg";
import serviceAreas6 from "@/public/images/home/practice_areas/practice_areas6.svg";
import whoWeServeLeftSectionHeroImage from "@/public/images/home/slater-matsil.jpg";
import smallLogo from "@/public/images/home/slater-matsil-white.png";
import bigLogo from "@/public/images/home/slater-matsil-logo-light.png";
import whoWeServeRightSectionHeroImage from "@/public/images/home/who_serve_shape.png";
import { LinkedIn } from "@mui/icons-material";
import { FOOTER_DATA } from "./generic-array";
import { FaLinkedinIn } from "react-icons/fa";
import footerLogo from "@/logo/big-logo.png";
import aboutHero from "@/about/heroImage.jpg";
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
        {
          img: serviceAreas2,
          title: "POST GRANT CHALLENGES",
          description:
            "Patent assertions are seldom made lightly and are never received casually. Post grant challenges should be considered an almost inevitable response to an assertion of patent infringement. ",
          serialNumber: "02",
        },
        {
          img: serviceAreas3,
          title: "PATENT LITIGATION",
          description:
            "Multinational enterprises and the global economy add even more layers of complexity to patent infringement cases — yet Slater Matsil simplifies the experience for the clients we represent and the legal firms we assist. ",
          serialNumber: "03",
        },
        {
          img: serviceAreas4,
          title: "PATENT LICENSING",
          description:
            "A strong patent licensing program taps into the financial potential of your existing innovations. This not only creates the potential for substantial revenue streams over many years — it can also help fund an ongoing legacy of invention. ",
          serialNumber: "04",
        },
        {
          img: serviceAreas5,
          title: "ADVERSE PATENT ANALYSIS",
          description:
            "Adverse patent assertions have become an inevitable occurrence in today’s business environment. Some of our clients receive multiple adverse assertions in any given week.",
          serialNumber: "05",
        },
        {
          img: serviceAreas6,
          title: "TRUSTED ADVICE  COUNSEL",
          description:
            'Slater Matsil wears proudly the mantle of "strategic partner" bestowed by our clients. ',
          serialNumber: "06",
        },
      ],
    },
    who_we_serve: {
      leftSection: {
        heroImage: whoWeServeLeftSectionHeroImage.src,
        small_logo: smallLogo,
        startingYear: "since 1999",
        servicesLabel: "Global intellectual property services",
        big_logo: bigLogo,
      },
      rightSection: {
        heading: "Who we serve",
        description:
          "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world. ",
        section_data: [
          {
            label: "large Corporations",
          },
          {
            label: "Small Companies / Start-ups",
          },
          {
            label: "U.S Law Firm",
          },
          {
            label: "International Law Firm",
          },
        ],
        ctaButton: {
          text: "Meet Our Team",
          href: "/",
        },
        endline: "“Partnering with you to transform your vision into reality.”",
        bgImage: whoWeServeRightSectionHeroImage.src,
      },
    },
    insights_section: {
      sectionTitle: "Insights",
      heading: "Recently published Insights.",
      description: "Have Look at our Latest publication at slatermatsil.com",
      insights_data: [
        {
          heading:
            "Ira Matsil recognized by Chambers USA 2021-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
        {
          heading:
            "Steven Slater recognized by Chambers USA 2024-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
        {
          heading:
            "Srini Chakravarthi recognized by Chambers USA 2023-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
      ],
    },
    footerData: {
      footer_links: FOOTER_DATA,
      social_links: [
        {
          icon: FaLinkedinIn,
        },
      ],
      privacy_pages: [
        {
          title: "Terms",
          href: "/",
        },
        {
          title: "Privacy",
          href: "/",
        },
        {
          title: "Cookies",
          href: "/",
        },
        {
          title: "Disclaimer",
          href: "/",
        },
      ],
      logo: footerLogo,
      copyRightText:
        "© 2016 - 2025 Slater Matsil, LLP | Dallas, TX | Disclaimer | All Rights Reserved",
    },
  },
  aboutPage: {
    heroSection: {
      sectionTitle: "About Slatermatsil",
      heading: "The innovations that differentiate you in your market.",
      description:
        "At Slater Matsil, we know what is required to invent something groundbreaking — and we know what it takes to guard and defend your company’s intellectual capital.",
      img: aboutHero,
    },
  },
};
