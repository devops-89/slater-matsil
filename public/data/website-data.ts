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
import {
  CAREER_WORK_LIST_DATA,
  FOOTER_DATA,
  INDUSTRIES_DATA,
  METRICS_DATA,
} from "./generic-array";
import { FaLinkedinIn } from "react-icons/fa";
import footerLogo from "@/logo/big-logo.png";
import aboutHero from "@/about/heroImage.jpg";
import drivingInnovationEverywhere from "@/about/driving-vector.png";
import globe from "@/about/globe.png";
import award1 from "@/about/award-1.png";
import award2 from "@/about/award-2.png";
import award3 from "@/about/award-3.png";
import award4 from "@/about/award-4.png";
import award5 from "@/about/award-5.png";
import award6 from "@/about/award-6.png";
import professionalsHeroImage from "@/professionals/hero_section.png";
import professional1 from "@/professionals/Williams_Zachary_Thumb.jpg";
import professional2 from "@/professionals/brian_c_thumb.jpg";
import professional3 from "@/professionals/ruojian.jpg";
import professional4 from "@/professionals/yumin_thumb.jpg";
import professional5 from "@/professionals/steven-yates.jpg";
import professional6 from "@/professionals/srini_thumb.jpg";
import careerHeroBackgroundImage from "@/career/CAREERS.png";
import careerHeroImage from "@/career/hero-image.png";
import caree_work_with_us_section_img from "@/career/work-with-us.jpg";
import { CAREER_OPEN_ROLES_TAB_DATA } from "@/utils/enum";
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
        subTitle: "Pro Experiences",
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
      metricsData: METRICS_DATA,
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
    drivingInnovationEverywhere: {
      heading: "Driving innovation everywhere",
      description:
        "Slater Matsil is a collaboration of technology-minded individuals who practice intellectual property law. We understand that IP rights are, first and foremost, working assets that must support and advance our clients' business objectives. We maintain this client-centric perspective, whether we are discussing technology with inventors in the design room, developing IP strategies with management in the board room, or advocating for our clients' rights in the courtroom.",
      img: drivingInnovationEverywhere,
    },
    REDEFINING_PATENT_SUCCESS: {
      heading1: "“Redefining Patent Success With",
      heading2: "Precision and Global Reach.”",
      description:
        "Slater Matsil partners with the world's leading innovators to protect their most valuable intellectual property. Our firm successfully prosecuted over 1,650 patents in 2024 for our top clients alone companies representing nearly $36 billion in annual R&D investment. These clients entrust us with securing patent protection for breakthrough innovations worth approximately $4.8 billion in research and development.",
      metrics_data: METRICS_DATA,
    },
    innovationInsights: {
      heading: "Where Insight Meets Innovation In Every Patent Strategy.",
      description:
        "We’re engineers focused on making things work. We’re attorneys driven to defend innovation. Above all, we’re proven professionals who draw upon our firsthand experience spanning diverse industries to deliver quality, accuracy, and a meticulous level of detail in our work product.",
    },
    AWARDSPROPS: {
      img: globe,
      heading1: "Distinction Defined By",
      heading2: "Dedication And Results.",
      awards_img: [
        {
          img: award1,
        },
        {
          img: award2,
        },
        {
          img: award3,
        },
        {
          img: award4,
        },
        {
          img: award5,
        },
        {
          img: award6,
        },
      ],
    },
    industriesWeServe: {
      heading1: "Industries",
      heading2: "we Serve.",
      description:
        "We collaborate with a wide range of industries, delivering innovative and reliable solutions that drive efficiency, scalability, and growth.",
      section_data: INDUSTRIES_DATA,
    },
  },
  firm_professionals: {
    professionals_hero_section: {
      heading: "Patent professionals who share your perspective",
      description1:
        "When you work with Slater Matsil, you collaborate with a uniquely skilled team of engineering, technical, and legal specialists.",

      img: professionalsHeroImage,

      descriptions: [
        {
          label:
            "Our attorneys and other professionals have significant engineering experience. Many have earned advanced technical degrees and hold patents of their own.",
        },
        {
          label:
            "We have a thorough understanding of what it takes to translate your inventive concepts and ideas into meticulously crafted, highly defendable IP rights. Just as importantly, we know how to leverage those IP rights into business assets that will advance your business objectives.",
        },
        {
          label:
            "Many have significant experience as engineers and managers in technology companies (including joint MBA-Engineering degree holders).",
        },
      ],
    },
    PROFESSIONAL_LIST_PROPS: [
      {
        img: professional1,
        name: "Williams Zachary, Ph.D",
        designation: "Technical Advisor",
        slug: "zachary-williams",
      },
      {
        img: professional2,
        name: "Brian A. Carlson",
        designation: "Attorney at Law",
        slug: "brian-carlson",
      },
      {
        img: professional3,
        name: "RuoJian Zhang",
        designation: "Distinguished Patent Agent",
        slug: "ruojian-zhang",
      },
      {
        img: professional4,
        name: "Yumin Jeff Zhang, Ph.D",
        designation: "Distinguished Patent Agent",
        slug: "yumin-jeff-zhang",
      },
      {
        img: professional5,
        name: "Steven Yates",
        designation: "Attorney at Law",
        slug: "steven-yates",
      },
      {
        img: professional6,
        name: "Srini Chakravarthi, Ph.D",
        designation: "Attorney at Law",
        slug: "srini-chakravarthi",
      },
    ],
  },
  careerPage: {
    career_hero_section: {
      title: "Your Journey Starts Here",
      description:
        "At Slater Matsil, we work at the intersection of technology and law to protect the world’s most ambitious ideas. Our team is built with engineers, inventors, legal strategists, and IP specialists who turn complex innovations into powerful intellectual property. We serve global technology leaders, high-growth startups, and visionary founders — and we’re always looking for exceptional minds to join us.",
      bgImage: careerHeroBackgroundImage.src,
      heroImage: careerHeroImage,
    },
    career_work_with_us: {
      firstTitle: "Why Work",
      secondTitle: "With Us",
      shortDescription: "Where Your Talent Meets Purpose",
      work_list_data: CAREER_WORK_LIST_DATA,
      section_img: caree_work_with_us_section_img,
    },
    career_open_roles: {
      title: "Open Roles / Opportunities",
      shortDescription: "Opportunities for Problem-Solvers and Innovators",
      description:
        "Slater Matsil is a global intellectual property law firm headquartered in Dallas. A career at Slater Matsil is as fun and rewarding as it is challenging. You won't find our name at the top of a downtown skyscraper, and that's by design — we know how difficult it can be to launch or elevate your career in an oversized firm that won't let you do the job you're driven to do. If you're a patent professional or technical advisor who believes that your workplace should be as stimulating as your workshop, we want to hear from you.",
      tabSectionData: {
        tabData: [
          {
            title: CAREER_OPEN_ROLES_TAB_DATA.ATTORNEY,
          },
          {
            title: CAREER_OPEN_ROLES_TAB_DATA.TECHNICAL_ADVISOR,
          },
        ],
        tabContentData: [
          {
            title: "Attorney",
            description:
              "Slater Matsil, a firm based in Dallas concentrates in intellectual property law, seeks patent attorneys with strong legal and technical skills to join its growing practice.  ",
          },
          {
            description:
              "This position involves representing foreign and domestic clients in all aspects of patent law. Depending upon your qualifications and desires and the firm’s needs, career opportunities may include significant patent preparation and prosecution work, client advice and counseling, and IP licensing and litigation activities. We actively encourage professional growth and career development. As such, attorneys are given frequent and meaningful client contact, have substantial interaction with firm management, and are supported in their efforts to develop new client relationships and business opportunities. Compensation exceeds market rates for highly skilled and motivated individuals.",
          },
          {
            description:
              "Ideal candidates should have a J.D. degree (top 10 percent of law school class), plus engineering experience or an advanced technical degree in the electrical, telecommunications, semiconductor, mechanical, chemical, material sciences, physics, or computer science fields, and two to five years of patent law experience. Strong candidates without engineering experience or an advanced engineering degree will be considered. Current membership in good standing of any U.S. state bar and eligibility to practice patent law before the U.S. Patent and Trademark Office are required. ",
          },
        ],
      },
    },
  },
};
