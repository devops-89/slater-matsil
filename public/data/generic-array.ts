import { DATA_LIST_PROPS, FOOTER_LIST_DATA, METRICSPROPS } from "@/utils/types";
import career_home_Image from "@/about/img1.png";
import { TABS } from "@/utils/enum";

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
    HEADING: "Firm",
    DATA: [
      {
        text: "About Us",
        href: "/about-us",
      },
      {
        text: "Who We Serve",
      },
      {
        text: "Practice Groups",
      },
      {
        text: "Firm Leadership",
      },
    ],
  },
  {
    HEADING: "Professionals",
    DATA: [],
  },
  {
    HEADING: "Services",
    DATA: [],
  },
  {
    HEADING: "Careers",
    DATA: [],
  },
  {
    HEADING: "Insights",
    DATA: [],
  },
  {
    HEADING: "Contact",
    DATA: [],
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
    img: career_home_Image,
    title: "Career",
  },
  {
    img: career_home_Image,
    title: "Connect with Slatermatsil",
  },
  {
    img: career_home_Image,
    title: "Sustainability",
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
