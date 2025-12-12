import {
  DATA_LIST_PROPS,
  FOOTER_LIST_DATA,
  INSIGHTS_DATA_PROPS,
  METRICSPROPS,
  WORK_LIST_PROPS,
} from "@/utils/types";
import aboutCareer from "@/about/career-about.jpg";

import connectWithSlatermatsil from "@/about/contact-about.jpg";
import practiceGroups from "@/about/practice-group.jpg";
import {
  COLORS,
  INSIGHTS_TAB_DATA,
  PROFESSIONAL_TABS_DATA,
  TABS,
  WHO_WE_SERVE_PAGE_TAB_DATA,
} from "@/utils/enum";

export const SERVICES_AREAS_DATA = [
  {
    category: "Strategy",
    subCategories: [
      {
        label: "Portfolio Development",
      },
      {
        label: "Patent Mining",
      },
      {
        label: "Process Definition",
      },
      {
        label: "IP Landscape Analysis",
      },
    ],
  },
  {
    category: "Tactics",
    subCategories: [
      {
        label: "Patent Drafting",
      },
      {
        label: "Patent Prosecution",
      },
      {
        label: "TM Registration",
      },
      {
        label: "International Fillings",
      },
    ],
  },
  {
    category: "Assertions",
    subCategories: [
      {
        label: "Valuation",
      },
      {
        label: "Licensing",
      },
      {
        label: "Litigation",
      },
      {
        label: "Competitive Analysis",
      },
    ],
  },
  {
    category: "Defenses",
    subCategories: [
      {
        label: "Post Grant Challenges",
      },
      {
        label: "Licensing",
      },
      {
        label: "Litigation",
      },
      {
        label: "Opinions",
      },
    ],
  },
];

export const FOOTER_DATA: FOOTER_LIST_DATA[] = [
  {
    HEADING: "Quick Navigation",
    DATA: [
      {
        text: "Home",
        href: "/",
      },
      {
        text: "About Us",
        href: "/about-us",
      },
      {
        text: "Professionals",
        href: "/firm-professionals",
      },
      {
        text: "Services",
        href: "/services",
      },
      {
        text: "Careers",
        href: "/careers",
      },
      {
        text: "Insights",
        href: "/insights",
      },
      {
        text: "Contact",
        href: "/contact-us",
      },
    ],
  },
  {
    HEADING: "Practice Areas",
    DATA: [
      {
        text: "Patent Prosecution",
        href: "/patent-prosecution",
      },
      {
        text: "IP Strategy",
        href: "/ip-strategy",
      },
      {
        text: "Portfolio Management",
        href: "/portfolio-management",
      },
      {
        text: "Licensing & Transactions",
        href: "/licensing-transaction",
      },
      {
        text: "Litigation Support",
        href: "/litigation-support",
      },
    ],
  },
  {
    HEADING: "Trust & Credibility",
    DATA: [
      {
        text: "Patent Experts",
        href: "/patent-experts",
      },
      {
        text: "IP Network",
        href: "/ip-network",
      },
      {
        text: "Success Proof",
        href: "/success-proof",
      },
      {
        text: "Worldwide Reach",
        href: "/worldwide-reach",
      },
      {
        text: "Who we serve",
        href: "/who-we-serve",
      },
    ],
  },
];

export const METRICS_DATA: METRICSPROPS[] = [
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
];

export const INDUSTRIES_DATA: DATA_LIST_PROPS[] = [
  {
    dataList: [
      {
        label: "Automotive",
      },
      {
        label: "Banking/Finance",
      },
      {
        label: "Computers",
      },
      {
        label: "Consumer Electronics",
      },
      {
        label: "Defense",
      },
      {
        label: "Electronic Circuits",
      },
    ],
  },
  {
    dataList: [
      {
        label: "Energy",
      },
      {
        label: "hardware",
      },
      {
        label: "Medical",
      },
      {
        label: "MicroProcessors",
      },
      {
        label: "nanotechnology",
      },
      {
        label: "oil and gas",
      },
    ],
  },
  {
    dataList: [
      {
        label: "optics",
      },
      {
        label: "Power Electronics",
      },
      {
        label: "Robotics",
      },
      {
        label: "Semiconductors",
      },
      {
        label: "Software",
      },
      {
        label: "telecommunications",
      },
    ],
  },
];

export const CAREER_HOME_DATA = [
  {
    img: aboutCareer,
    title: "Career",
    href: "/careers",
  },
  {
    img: connectWithSlatermatsil,
    title: "Connect with Slatermatsil",
    href: "/contact-us",
  },
  {
    img: practiceGroups,
    title: "Practice Groups",
    href: "/practice-groups",
  },
];

export const TABS_DATA = [
  {
    label: TABS.FIRM,
  },
  {
    label: TABS.PROFESSIONALS,
  },
];

export const PROFESSIONAL_DETAILS_TAB_DATA = [
  {
    title: PROFESSIONAL_TABS_DATA.BIO,
  },
  {
    title: PROFESSIONAL_TABS_DATA.EDUCATION,
  },
  {
    title: PROFESSIONAL_TABS_DATA.ADMISSIONS_HONORS,
  },
  {
    title: PROFESSIONAL_TABS_DATA.ARTICLES_PRESENTATIONS,
  },
];

export const CAREER_WORK_LIST_DATA: WORK_LIST_PROPS[] = [
  {
    title:
      "Work directly on cutting-edge technologies including semiconductors, electronics, software, and telecommunications",
  },
  {
    title:
      "Collaborate with attorneys and technical advisors who understand engineering at a granular level",
  },
  {
    title:
      "Gain exposure to global IP strategies and cross-border innovation portfolios",
  },
  {
    title:
      "Be part of a firm that values curiosity, technical depth, ownership, and legal excellence",
  },

  {
    title:
      "Opportunities to grow into Patent Agent, Technical Advisor, or IP Attorney roles",
  },
];

export const WHO_WE_SERVE_TAB_DATA = [
  {
    label: WHO_WE_SERVE_PAGE_TAB_DATA.LARGE_CORPORATIONS,
  },
  {
    label: WHO_WE_SERVE_PAGE_TAB_DATA.SMALL_COMPANIES,
  },
  {
    label: WHO_WE_SERVE_PAGE_TAB_DATA.US_LAW_FIRMS,
  },
  {
    label: WHO_WE_SERVE_PAGE_TAB_DATA.INTERNATIONAL_LAW_FIRMS,
  },
];

export const INSIGHTS_CARD_DATA: INSIGHTS_DATA_PROPS[] = [
  {
    title:
      "Steven Slater recognized by Chambers USA 2024 - 2025 as a Top Intellectual Property Attorney",
    bgColor: COLORS.PRIMARY_BLUE,
  },
  {
    title:
      "Ira Matsil recognized by Chambers USA 2021 - 2025 as a Top Intellectual Property Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
  },
  {
    title:
      "Ira Matsil recognized by Chambers USA 2021 - 2025 as a Top Intellectual Property Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
  },
  {
    title:
      "Ira Matsil was recognized in the 2021- 2-26 editions of the U.S. News - Best Lawyers in America For Patent Litigation in Dallas, texas,",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
  },
  {
    title:
      "Steven Slater was recognized in the 2020 - 2026 editions of the best lawyers in America for Patent Litigation and patent Law in Dallas, Texas.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
  },
  {
    title:
      "Ira Matsil had been selected for the 2025 IAM Strategy 300: The World’s IP Strategies as a Strategy 300 Global Leader.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
  },
  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater, Ira Matsil, Srini Chakravarthi, and Michael Kucher were recognized individually by 2022 IAM Patent 1000 Rankings.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.ARTICLES,
  },
  {
    title: "Ira Matsil was featured in IAM Global Leaders 2022.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.LINKS,
  },
  {
    title:
      "John Koetter has been selected as a Rising Star 2021 by Super Lawyers (a Thomson Reuters Service).",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
  },
];
