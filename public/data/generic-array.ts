import {
  CONTACT_US_CARD_PROPS,
  DATA_LIST_PROPS,
  FOOTER_LIST_DATA,
  INSIGHTS_DATA_PROPS,
  METRICSPROPS,
  SERVICE_FRAMEWORK_CARD_PROPS,
  STRENGTH_CARD_PROPS,
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
import { Email, LocationOnOutlined, Phone } from "@mui/icons-material";

import technicalExpertise from "@/icons/services/technical-expertise.svg";
import globalReach from "@/icons/services/global-ip-reach.svg";
import strategicInsight from "@/icons/services/strategic-insight.svg";
import clientFirstApproach from "@/icons/services/client-first-approach.svg";
import zachary from "@/professionals/transparent/zachary-williams.png";
import ruojian from "@/professionals/transparent/ruojian-zhang.png";
import yumin from "@/professionals/transparent/yumin.png";
import brian from "@/professionals/transparent/brian-carlson.png";
import srini from "@/professionals/transparent/srini.png";
import steven from "@/professionals/transparent/steven-yates.png";
import amitava from "@/professionals/transparent/amitava-chatterjee.png";
import ava from "@/professionals/transparent/ava-chung.png";
import stephen from "@/professionals/transparent/stephen-cortiaus.png";
import patrick from "@/professionals/transparent/patrick-darno.png";
import vijay from "@/professionals/transparent/vijay-desai.png";
import barry from "@/professionals/transparent/barry-dove.png";
import shervin from "@/professionals/transparent/shervin-fatehi.png";
import robert from "@/professionals/transparent/robert-graham.png";
import jeffrey from "@/professionals/transparent/jeffrey-robert.png";
import zhu from "@/professionals/transparent/zhu-he.png";
import elizabeth from "@/professionals/transparent/elizabeth.png";
import jonathan from "@/professionals/transparent/jonathan-insler.png";
import paata from "@/professionals/transparent/patta-kakashvili.png";
import james from "@/professionals/transparent/james-kesterson.png";
import roger from "@/professionals/transparent/roger-knapp.png";
import john from "@/professionals/transparent/john-koetter.png";
import fantai from "@/professionals/transparent/fantai-kong.png";
import michael from "@/professionals/transparent/michael-kucher.png";
import soonshin from "@/professionals/transparent/soonshin.png";
import brian_mair from "@/professionals/transparent/brian-mair.png";
import ira from "@/professionals/transparent/ira-matsil.png";
import joseph from "@/professionals/transparent/joseph-mcmanis.png";
import marc from "@/professionals/transparent/marc-mcwilliams.png";
import peter from "@/professionals/transparent/peter-meza.png";
import benjamin_nise from "@/professionals/transparent/benjamin-nise.png";
import payam from "@/professionals/transparent/payam-rashidi.png";
import rameez from "@/professionals/transparent/rameez-samnakay.png";
import steven_slater from "@/professionals/transparent/steven-slater.png";
import chad from "@/professionals/transparent/chad-terrell.png";
import lizabeth from "@/professionals/transparent/lizabeth-vice.png";
import julian from "@/professionals/transparent/julian-wang.png";
import jonathan_ward from "@/professionals/transparent/jonathan-ward.png";
import chuanming from "@/professionals/transparent/chuanming-wei.png";

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
        text: "Blogs",
        href: "/blogs",
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
        href: "/services/patent-prosecution",
      },
      {
        text: "IP Strategy",
        href: "/services/ip-strategy",
      },
      {
        text: "Portfolio Management",
        href: "/services/portfolio-management",
      },
      {
        text: "Licensing & Transactions",
        href: "/services/licensing-transaction",
      },
      {
        text: "Litigation Support",
        href: "/services/litigation-support",
      },
    ],
  },
  // {
  //   HEADING: "Trust & Credibility",
  //   DATA: [
  //     {
  //       text: "Patent Experts",
  //       href: "/patent-experts",
  //     },
  //     {
  //       text: "IP Network",
  //       href: "/ip-network",
  //     },
  //     {
  //       text: "Success Proof",
  //       href: "/success-proof",
  //     },
  //     {
  //       text: "Worldwide Reach",
  //       href: "/worldwide-reach",
  //     },
  //     {
  //       text: "Who we serve",
  //       href: "/who-we-serve",
  //     },
  //   ],
  // },
];

export const HEADER_DATA: FOOTER_LIST_DATA[] = [
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
        text: "Blogs",
        href: "/blogs",
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
        href: "/services/patent-prosecution",
      },
      {
        text: "IP Strategy",
        href: "/services/ip-strategy",
      },
      {
        text: "Portfolio Management",
        href: "/services/portfolio-management",
      },
      {
        text: "Patent Licensing",
        href: "/services/patent-licensing",
      },
      {
        text: "Patent Litigation",
        href: "/services/patent-litigation",
      },
      {
        text: "Post Grant Challenges",
        href: "/services/post-grant-challenges",
      },
      {
        text: "Adverse Patent Analysis",
        href: "/services/adverse-patent-analysis",
      },
      {
        text: "Trusted Advice Counsel",
        href: "/services/trusted-advice-counsel",
      },
    ],
  },
  {
    HEADING: "Who We Serve",
    DATA: [
      {
        text: "Startups",
        href: "/who-we-serve",
      },
      {
        text: "Universities",
        href: "/who-we-serve",
      },
      {
        text: "Corporates",
        href: "/who-we-serve",
      },
      {
        text: "Government",
        href: "/who-we-serve",
      },
    ],
  },
];

export const METRICS_DATA: METRICSPROPS[] = [
  {
    title: "U.S. PATENTS ISSUED",
    count: "25,030+",
  },
  {
    title: "COUNTRIES WE SERVE",
    count: "6",
  },
  {
    title: "PATENTS ISSUED TO FIRM PERSONNEL",
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
    label: TABS.WHO_WE_SERVE,
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
  {
    title: PROFESSIONAL_TABS_DATA.ASSOCIATIONS,
  },
];

export const CAREER_WORK_LIST_DATA: WORK_LIST_PROPS[] = [
  {
    title:
      "Work directly on cutting-edge technologies, including semiconductors, electronics, software, and telecommunications",
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
    title: "Steven Slater Recognized by Chambers USA as Top Attorney",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-chambers-usa-2025",
  },
  {
    title: "Srini Chakravarthi recognized by Chamber USA as Top Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-chambers-usa-2025",
  },
  {
    title: "Ira Matsil recognized by Chamber USA as Top Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-chambers-usa-2025",
  },
  {
    title:
      "Slater Matsil recognized by Chambers USA as 2024-2025 Top Intellectual Property Law Firm",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-chambers-usa-2025",
  },
  {
    title: "Ira Matsil recognized The Best Lawyers in America",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-best-lawyers-america",
  },
  {
    title: "Steve Slater recognized The Best Lawyers in America",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steve-slater-best-lawyers-america",
  },
  {
    title: "Ira Matsil selected as Strategy 300 Global Leader",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-strategy-300-global-leader",
  },
  {
    title:
      "Slater Matsil ranked 15th for Most U.S. Utility Patents Issues in 2025",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-ranked-15th-for-most-us-utility-patents-issues-in-2025",
  },

  {
    title:
      "Patexia ranked Slater Matsil #2 in Best Performing Law Firms Overall, #5 in the Overall Best Performing Law Firms in High-Tech Sector and #11 in Most Active Law Firms in High Tech in 2025.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-ranked-slater-matsil-2-in-best-performing-law-firms-overall",
  },

  {
    title: "Srini Chakravarthi Moderates CLE for Dallas Bar Association",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-moderates-cle-for-dallas-bar-association",
  },
  {
    title: "Slater Matsil Attorneys Ranked by Patexia",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-attorneys-ranked-by-patexia",
  },
  {
    title:
      "Srini Chakravarthi Leads Honorable Barbara M.G. Lynn American Inn of Court Sessions",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-leads-honorable-barbara",
  },
  {
    title:
      "Slater Matsil Recognized as “highly recommended” Prosecution Firm by IAM Patent 1000 Rankings",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-recognized-as-highly-recommended",
  },

  {
    title:
      "Patexia ranked Slater Matsil #2 in Best Performing Law Firms Overall, #5 in the Overall Best Performing Law Firms in High-Tech Sector and #11 in Most Active Law Firms in High Tech in 2025.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-ranked-slater-matsil-2025-rankings",
  },
  {
    title:
      "Slater Matsil Attorney John Koetter's Latest Publication by Dallas Bar Association",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "john-koetter-latest-publication-dallas-bar",
  },
  {
    title: "Slater Matsil Lawyers Present at Dallas Bar",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "slater-matsil-lawyers-present-at-dallas-bar",
  },
  {
    title:
      "On October 24, 2024, Srini Chakravarthi took part in the Dallas Bar Association’s CLE meeting by moderating a session on IP and Ethics.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-organizes-cle-session",
  },
  {
    title:
      "Patexia ranked Roger Knapp #1 in Best Performing Attorneys in High-Tech in 2025. Ruojian Zhang was ranked #4 and Roger Knapp was ranked #5 in Best Performing Attorneys Overall for the same time period. Also, in 2025 Ira Matsil, Brian Mair and Stephen Cortiaus ranked in both the Top 100 Best Performing Attorneys Overall and the Best Performing Attorneys in High-Tech in 2025.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-ranked-roger-knapp-2025-rankings",
  },
  {
    title:
      "Patexia ranked Ira Matsil, Brian Mair and Stephen Cortiaus in both the Top 100 Best Performing Attorneys Overall and the Best Performing Attorneys in High-Tech in 2025.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-ranked-matsil-mair-cortiaus-2025",
  },
  {
    title:
      "Ira Matsil ranked by Strategy 300 - IAM 2025 in IP management consultancy, licensing",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-strategy-300-iam-2025",
  },
  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater, Ira Matsil, Srini Chakravarthi and Michael Kucher were recognized individually by the 2025 IAM Patent 1000 Rankings.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "iam-patent-1000-rankings-2025",
  },
  {
    title:
      "Srini Chakravarthi recently concluded a three-part series as co-organizer of the Community Project Outreach for the Honorable Barbara M.G. Lynn American Inn of Court.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-community-project-outreach",
  },
  {
    title:
      "Slater Matsil has been named as a Tier 1 firm in Litigation – Patent and a Tier 2 firm in Patent Law (Dallas/Fort Worth) by U.S. News – Best Lawyers® “Best Law Firm” in 2023, 2024, and 2025.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "best-lawyers-best-law-firm-2023-2025",
  },

  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater, Ira Matsil, Srini Chakravarthi, and Michael Kucher were recognized individually by 2024 IAM Patent 1000 Rankings.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "iam-patent-1000-rankings-2024",
  },
  {
    title:
      "Patexia has ranked Ruojian Zhang number 1 in Overall High-Tech Performance, and number 3 in Overall Best Performance in 2024. Roger Knapp was ranked number 2 in Overall High-Tech Performance and number 4 in Overall Best Performance the same period.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-attorney-rankings-2024",
  },
  {
    title:
      "Patexia ranked Slater Matsil number 2 in Best Performing Law Firm Overall, number 8 in the Overall High-Tech Sector and number 11 in Most Active Law Firms in High-Tech in 2024.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-law-firm-rankings-2024",
  },
  {
    title:
      "Patexia ranked Slater Matsil attorneys Ira Matsil as Top 20 and Brian Mair as Top 50 Best Performing Attorneys Overall in Patent Prosecution. Stephen Cortiaus and Brian Mair were ranked as Top 50 in Overall High-Tech Performance in 2024.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-prosecution-rankings-2024",
  },
  {
    title:
      "John Koetter was appointed to be Co-Chair of the Publications Committee of the Dallas Bar Association for 2024.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "john-koetter-publications-committee-2024",
  },
  {
    title:
      "Srini Chakravarthi was appointed to the Council of the Dallas Bar Association, IP Section. Srini will also be Co-Chair of the CLE Committee of the IP Section.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-dba-ip-council-2024",
  },
  {
    title:
      "Srini Chakravarthi has been appointed as Adjunct Professor of Law at Texas A&M Law School, where he taught a course on Patent Law (Spring 2024).",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-adjunct-professor-tamu",
  },
  {
    title:
      "Srini Chakravarthi was Organizer / MC of moderated session on “Strategies for Drafting Claims and Ethics in Patent Prosecution,” North Dallas DBA IP Section CLE, Wednesday, April 12, 2023.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-dba-cle-2023",
  },
  {
    title:
      "Srini Chakravarthi was selected to join The Honorable Barbara M.G. Lynn American Inn of Court as a Barrister.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-inn-of-court-barrister",
  },
  {
    title:
      "The Harrity Analytics Team ranked Slater Matsil as 17th for most U.S. utility patents issued in 2023.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "harrity-analytics-ranking-2023",
  },
  {
    title:
      "Ira Matsil was included in the 2024 edition of the Best Lawyers in America ® for Litigation - Patent in Dallas, Texas",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-best-lawyers-2024",
  },
  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater, Ira Matsil, Srini Chakravarthi, Benjamin Nise, and Michael Kucher were recognized individually by 2023 IAM Patent 1000 Rankings.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "iam-patent-1000-rankings-2023",
  },
  {
    title:
      "Ira Matsil Recognized by Chambers USA 2021 - 2023 as a Top Intellectual Property Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-chambers-usa-2021-2023",
  },
  {
    title:
      "Srini Chakravarthi Recognized by Chambers USA 2023 as a Top Intellectual Property Attorney",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-chambers-usa-2023",
  },
  {
    title:
      "Patexia has ranked Roger Knapp number 1 and Ruojian Zhang number 2 as Top 100 Best Performing Attorneys in High Tech in 2023. Also, Ruojian Zhang was ranked number 1 and Roger Knapp was ranked number 3 as Top 100 Best Performing Attorneys Overall in 2023.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-attorney-rankings-2023",
  },
  {
    title:
      "Patexia ranked Slater Matsil attorneys Brian A. Mair and Ira Matsil as 2023 Top 50 Best Performing Attorneys Overall in Patent Prosecution",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-top-50-attorneys-2023",
  },
  {
    title:
      "Patexia ranked Slater Matsil attorneys Stephen Cortiaus, John Koetter, and Yumin Zhang as 2023 Top 100 Best Performing Attorneys Overall in Patent Prosecution",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-top-100-attorneys-2023",
  },
  {
    title:
      "Patexia ranked Slater Matsil attorney Brian A. Mair as a 2023 Top 50 Best Performing Attorneys in High-Tech",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-high-tech-top-50-2023",
  },
  {
    title:
      "Patexia ranked Slater Matsil number 2 in Best Performing Law Firm Overall, number 8 in the Overall High-Tech Sector and number 11 in Most Active Law Firms in High-Tech for the period from January 1, 2019 to December 31, 2023.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-firm-rankings-2023",
  },
  {
    title:
      "The Harrity Analytics Team ranked Slater Matsil as 18th for most U.S. utility patents issued in 2022.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "harrity-analytics-ranking-2022",
  },
  {
    title:
      "Slater Matsil was named by IE 100 Awards as the 2023 winner of the U.S. Patent Prosecution Adviser of the Year for China – USA.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ie-100-awards-2023",
  },
  {
    title:
      "Elizabeth Iglesias and Ben Nise gave a presentation for the DBA IP Section CLE regarding “Patent Prosecution Practice Tips for Emerging Technologies” on Thursday, May 26, 2022.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "dba-cle-iglesias-nise-2022",
  },
  {
    title:
      "Srini Chakravarthi conducted a moderated session on “Strategies in Developing a Global Patent Portfolio and Ethical Considerations in Patent Prosecution” for the North Dallas DBA IP Section CLE on Thursday, May 19, 2022.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "dba-cle-srini-2022",
  },
  {
    title:
      "Srini Chakravarthi delivered a presentation regarding Engineering a Patent Portfolio – Augmenting R&D Value with Patent Protection on December 9, 2022 at the UTD Colloquium Lecture Series, Department of Materials Science & Engineering.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "utd-colloquium-srini-2022",
  },
  {
    title:
      "Steven Slater was named U.S. News – Best Lawyers® 2023 Litigation – Patent “Lawyer of the Year” in Dallas/Fort Worth.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-lawyer-of-the-year-2023",
  },
  {
    title:
      "Steven Slater was included in the 2020 - 2024 editions of the Best Lawyers in America® for Litigation – Patent and Patent Law in Dallas, Texas.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-best-lawyers-2020-2024",
  },
  {
    title: "Ira Matsil was featured in IAM Global Leaders 2022.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-iam-global-leaders-2022",
  },
  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater, Ira Matsil, Srini Chakravarthi, and Michael Kucher were recognized individually by 2022 IAM Patent 1000 Rankings.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-iam-patent-1000-2022",
  },
  {
    title: "Steven Slater was featured in IAM Global Leaders 2022.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-iam-global-leaders-2022",
  },
  {
    title:
      "Ira Matsil Recognized by Chambers USA 2022 as a Top Intellectual Property Attorney",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-chambers-usa-2022",
  },
  {
    title:
      "Slater Matsil ranked as one of the nation’s leading IP and Patent Law Firms by Chambers USA 2022",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-chambers-usa-2022",
  },
  {
    title:
      "Patexia has ranked Roger Knapp number 1 and Ruojian Zhang number 2 as Top 100 Best Performing Attorneys in High-Tech in 2022",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-high-tech-attorneys-2022",
  },
  {
    title:
      "Patexia ranked Slater Matsil #2 Best Performing Patent Firms Overall in 2022. Patexia also ranked Slater Matsil #7 Best Performing Patent Law Firms in High Tech in 2022.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-patexia-rankings-2022",
  },
  {
    title:
      "Slater Matsil ranked first in Juristat's 2021 Top Patent Firms list in Semiconductors, Electrical and Optical Systems and Components.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-juristat-semiconductors-2021",
  },
  {
    title:
      "Answering Un-asked Questions: Patent Disclosures for Analog, Mixed-Signal, and RF Circuit Design by Benjamin E. Nise",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "benjamin-nise-patent-disclosures-article",
  },
  {
    title:
      "U.S. News ranked Slater Matsil as a Best Law Firm in Tier 1 for Patent Litigation and as Tier 2 firm for Patent Law in 2022.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-best-law-firm-2022",
  },
  {
    title:
      "Patexia ranked Slater Matsil #4 Best Performing Patent Firm in 2021. Patexia also ranked Slater Matsil #9 Most active Law Firm in High Tech in 2021.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-patexia-rankings-2021",
  },
  {
    title: "Ira Matsil Recognized by Chambers USA 2021",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-chambers-usa-2021",
  },
  {
    title:
      "Slater Matsil is pleased to announce that Chambers USA 2021 has ranked the firm as one of the nation’s leading IP and Patent Law Firms.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-chambers-usa-2021",
  },
  {
    title:
      "Slater Matsil ranked as a firm, Ira Matsil, Steven Slater, Srini Chakravarthi, and Michael Kucher recognized individually by the 2021 IAM Patent 1000 rankings",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-iam-patent-1000-2021",
  },
  {
    title:
      "John Koetter has been selected as a Rising Star 2021 by Super Lawyers",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "john-koetter-rising-star-2021",
  },
  {
    title: "Slater Matsil announced new partners",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "slater-matsil-new-partners-announcement",
  },
  {
    title:
      "Slater Matsil is pleased to announce that Chambers USA 2020 has ranked the firm as one of the nation’s leading IP and Patent Law Firms.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-chambers-usa-2020",
  },
  {
    title:
      "Slater Matsil ranked first in Juristat's Top 25 growing Patent firms in the last decade.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-juristat-growing-firms-2020",
  },
  {
    title:
      "Srini Chakravarthi delivered a presentation on Building and Monetizing the “Perfect” Patent Portfolio on November 19, 2020 at the 2020 ACP MetroCon.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "srini-chakravarthi-metrocon-2020",
  },
  {
    title:
      "D Magazine named Steven H. Slater as “Best Lawyers in Dallas 2020, 2018, 2017, 2016, 2015” in the Intellectual Property Category",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-d-magazine-best-lawyers",
  },
  {
    title:
      "Patexia named Slater Matsil the Best Performing #2 Patent Firm Overall in 2020. Patexia also ranked Slater Matsil #9 of the 2020 Top 100 Most Active Law Firms in High Tech.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-firm-rankings-2020",
  },
  {
    title:
      "Steven H. Slater has been honored as a Texas Super Lawyer from 2009-2021",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-super-lawyer-honors",
  },
  {
    title:
      "Ira S. Matsil has been honored as a Texas Super Lawyer from 2012-2025",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-super-lawyer-honors",
  },
  {
    title:
      "Slater Matsil ranked fourth in Juristat's 2020 Top Patent Firms list in Semiconductors, Electrical and Optical Systems and Components.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-semiconductors-2020",
  },
  {
    title:
      "Slater Matsil ranked as a firm, Ira Matsil, Steven Slater and Srini Chakravarthi recognized individually by the 2020 IAM Patent 1000 rankings",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "iam-patent-1000-rankings-2020",
  },
  {
    title:
      "Slater Matsil ranked sixth in Juristat's 2019 Top Patent Firms list in Semiconductors, Electrical and Optical Systems and Components.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-semiconductors-2019",
  },
  {
    title: "Slater Matsil named Top Patent Law Firm",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "dallas-business-journal-top-firm-2019",
  },
  {
    title:
      "D Magazine named Ira S. Matsil among “Best Lawyers in Dallas 2019, 2018, 2017, 2015” in the Intellectual Property Category.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-d-magazine-best-lawyers",
  },
  {
    title:
      "Mandy Barsilai Fernandez has been named winner of the 2019 Don M. Smart Directed Research Award by the SMU Dedman School of Law.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "mandy-fernandez-research-award-2019",
  },
  {
    title:
      "John Koetter has been selected to join the Honorable Barbara M.G. Lynn American Inn of Court",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "john-koetter-rising-star-2021",
  },
  {
    title:
      "Patexia named Slater Matsil the Best Performing Patent Firm Overall in 2019. Patexia also ranked Slater Matsil #10 of the 2019 Top 100 Most Active Law Firms in High Tech.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patexia-firm-rankings-2019",
  },
  {
    title:
      "Slater Matsil ranked as a firm and Steven Slater recognized individually by the 2018 IAM Patent 1000 rankings (7th annual edition)",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "iam-patent-1000-rankings-2018",
  },
  {
    title:
      "John Koetter and Steve Slater presented “Practice Tips for Raising or Surviving Section 102 and 103 Challenges” to the Intellectual Property Section of the Dallas Bar Association on May 25, 2018",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "koetter-slater-dba-presentation-2018",
  },
  {
    title:
      "Slater Matsil ranked third in Juristat's 2018 Top 100 Patent Firms list",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-top-100-firms-2018",
  },
  {
    title:
      "IPWatchdog named Slater Matsil as a Top Patent Firm for 2017 based on the total number of U.S. utility patents that issued in 2017.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ipwatchdog-top-patent-firm-2017",
  },
  {
    title:
      "A renewed focus on patent quality – implications for patent owners. By Ira S. Matsil and Srini Chakravarthi.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "patent-quality-article-2018",
  },
  {
    title:
      "IPWatchdog named Slater Matsil as a Top Patent Firm for 2016 based on the total number of U.S. utility patents that issued in 2016.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ipwatchdog-top-patent-firm-2016",
  },
  {
    title:
      "Corporate Vision named Slater Matsil, LLP as Best in Patent Procurement 2016 - Southern USA",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "corporate-vision-best-procurement-2016",
  },
  {
    title:
      "Corporate Vision named Slater Matsil, LLP as Best Tech-Focused IP Law Firm - Southern USA and Best in Patent Procurement 2016 - Southern USA",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "corporate-vision-tech-focused-firm-2016",
  },
  {
    title:
      "Ocean Tomo ranked Slater Matsil first in both Information Technology and Overall, All Industries in 2016 Top 10 Patent Law Firm in the U.S.",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ocean-tomo-top-quality-rankings-2016",
  },
  {
    title:
      "Slater Matsil ranked second in Juristat's 2017 Top 100 Patent Firms list",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-top-100-rankings-2017",
  },
  {
    title:
      "Slater Matsil ranked by Juristat's 2016 as the second highest growth rate among IP Today's Top Patent Firms",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-growth-rate-rankings-2016",
  },
  {
    title: "Slater Matsil named Top Patent Law Firm",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "slater-matsil-top-patent-law-firm",
  },
  {
    title:
      "Slater Matsil recognized by Juristat as one of the 2015 Top 10 Patent Law Firms that Lose the Fewest Independent Claims",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "juristat-fewest-claims-lost-2015",
  },
  {
    title:
      "Ocean Tomo ranked Slater Matsil as a 2015 Top 10 Patent Law Firm in the U.S.",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ocean-tomo-top-10-firm-2015",
  },
  {
    title:
      "Slater Matsil recognized as a 2013 Go-To Law Firm for Patent Prosecution",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "go-to-law-firm-2013",
  },
  {
    title:
      "Slater Matsil ranked in the top 100 Patent Law Firms by IP Today from 2009-2014",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ip-today-top-100-firms",
  },
  {
    title: "Slater Matsil named as a Top 100 IP Firm by PatentBuddy",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patentbuddy-top-100-ip-firm",
  },
  {
    title: "PatentBuddy named Slater Matsil partners as Top Patent Prosecutors",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "patentbuddy-top-prosecutors-2011",
  },
  {
    title: "Ira S. Matsil presented at the 53rd Annual IP Law Program",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-indefiniteness-presentation-2015",
  },
  {
    title: "Ira S. Matsil served as session moderator at CAILAW",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-session-moderator-2013",
  },
  {
    title:
      "Ira S. Matsil served as director of IP Section of the Dallas Bar Association",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-dba-director-2013",
  },
  {
    title:
      "Steven H. Slater served as a panelist at the 49th Annual IP Law Program",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-panelist-2011",
  },
  {
    title:
      "Steven H. Slater served as a panelist at the Dallas Bar Association IP Section meeting",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "steven-slater-dba-panelist-2011",
  },
  {
    title:
      "Ira S. Matsil served as panelist at the State Bar of Texas Annual Meeting",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ira-matsil-state-bar-panelist-2010",
  },
  {
    title:
      "Ocean Tomo ranked Slater Matsil as a 2014 Top 10 Patent Law Firm in the U.S.",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.NEWS,
    slug: "ocean-tomo-top-10-firm-2014",
  },
  {
    title: "The European Patent Office (EPO)",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "european-patent-office-info",
  },
  {
    title: "The American Intellectual Property Law Association (AIPLA)",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "aipla-info",
  },
  {
    title: "The International Trademark Association (INTA)",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "inta-info",
  },
  {
    title: "China National Intellectual Property Administration (CNIPA)",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "cnipa-info",
  },
  {
    title: "The World Intellectual Property Organization (WIPO)",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "wipo-info",
  },
  {
    title: "The United States Patent & Trademark Office (USPTO)",
    bgColor: COLORS.PRIMARY_BLUE,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "uspto-info",
  },
  {
    title: "The Japanese Patent Office (JPO)",
    bgColor: COLORS.PRIMARY_LIGHT_GREEN,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "jpo-info",
  },
  {
    title: "The Canadian Intellectual Property Office (CIPO)",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "cipo-info",
  },
];

export const CONTACT_US_CARD_DATA: CONTACT_US_CARD_PROPS[] = [
  {
    heading: "Address",
    value: "17304 Preston Rd, Suite 900, Dallas, TX 75252",
    Icon: LocationOnOutlined,
  },
  {
    heading: "Phone number",
    value: "972.732.1001",
    Icon: Phone,
  },
  {
    heading: "Email Address",
    value: "info@slatermatsil.com",
    Icon: Email,
  },
];

export const STRENGTH_CARD_DATA: STRENGTH_CARD_PROPS[] = [
  {
    img: technicalExpertise,
    title: "Technical Expertise",
    description: "Engineers-turned-attorneys who understand your inventions.",
  },
  {
    img: globalReach,
    title: "Global IP Reach",
    description: "Coordinated Patent strategy across US, Asia, and Europe",
  },
  {
    img: strategicInsight,
    title: "Strategic Insight",
    description: "Legal strategies allgned with your long-term businesses",
  },
  {
    img: clientFirstApproach,
    title: "Client-First Approach",
    description: "Decades of trusted partnership and responsive service",
  },
];

export const SERVICE_FRAMEWORK_CARD_DATA: SERVICE_FRAMEWORK_CARD_PROPS[] = [
  {
    heading: "Technical Expertise",
    data: [
      {
        title: "Portfolio Development",
      },
      {
        title: "Patent Mining",
      },
      {
        title: "Process Definition",
      },
      {
        title: "IP Landscape Analysis",
      },
    ],
  },
  {
    heading: "Tactics",
    data: [
      {
        title: "Patent Drafting",
      },
      {
        title: "Patent Prosecution",
      },
      {
        title: "TM Registration",
      },
      {
        title: "International Fillings",
      },
    ],
  },
  {
    heading: "Assertions",
    data: [
      {
        title: "Valuation",
      },
      {
        title: "Licensing",
      },
      {
        title: "Litigation",
      },
      {
        title: "Competitive Analysis",
      },
    ],
  },
  {
    heading: "Defenses",
    data: [
      {
        title: "Post-Grant Challenges",
      },
      {
        title: "Licensing",
      },
      {
        title: "Litigation",
      },
      {
        title: "Opinions",
      },
    ],
  },
];

export const SERVICES_DETAILS = [
  {
    slug: "ip-strategy",
    title: "IP Strategy",
    data: [
      {
        description:
          "Not every innovation needs a patent. Some are better protected as trade secrets. Some need both. The companies that get the most out of their intellectual property are the ones that ask the right questions before they start filing, and keep asking them as the business evolves.",
      },
      {
        description:
          "Slater Matsil works with clients to determine what kind of protection makes sense for each innovation, brand, and competitive advantage. Patents, trade secrets, trademarks, copyrights. Each has its strengths and its costs. A single product might call for a utility patent on the core technology, a design patent on its appearance, trade secret protection for the manufacturing know-how, a trademark on the brand, and copyright on the software. The options add up fast, and no company has an unlimited budget. Pursuing everything is not a strategy. Pursuing the right things is. We help clients make those calls, weighing the value of each form of protection against its cost and the realistic likelihood that it will matter down the road.",
      },
      {
        description:
          "For companies competing in global markets, those decisions multiply. An innovation worth patenting in the United States may also warrant protection in Europe, Asia, or elsewhere, but not necessarily everywhere. Each jurisdiction adds cost, complexity, and ongoing maintenance obligations. We work with clients to identify the markets that matter most to their business and build filing strategies accordingly. Through our established relationships with foreign associates in virtually every jurisdiction, we coordinate international filings and manage global portfolios so that protection is where it needs to be.",
      },
      {
        description:
          "Getting the protection right is the first step. Knowing what to do with it once you have it is where real value gets created. An issued patent sitting in a drawer is not a strategy. We counsel clients on enforcement, licensing, cross-licensing, monetization, and when it makes sense to let a right go. For clients raising capital, pursuing acquisitions, or entering new markets, we help position IP assets to support those objectives.",
      },
      {
        description:
          "We have been doing this long enough to know that the best IP strategy is the one that serves the business, not the one that produces the most filings. Our clients expect us to tell them when to invest and when to hold back. That is the kind of counsel we provide.",
      },
    ],
  },
  {
    slug: "portfolio-management",
    title: "IP Portfolio Management",
    data: [
      {
        description:
          "A patent collecting dust is a cost, not an asset. The same is true for any intellectual property right that is not actively managed with purpose. Slater Matsil helps clients build IP portfolios that work, and then makes sure they keep working.",
      },
      {
        description:
          "We sit down with engineering teams early and often. We want to know what is being developed, what is on the roadmap, and where the competitive pressure is coming from. That is how filing decisions get made well. Not by reacting to a finished product, but by identifying protectable innovations as they take shape. We help clients set up invention disclosure processes that actually get used, and we prioritize filings based on what matters to the business, not just what is novel.",
      },
      {
        description:
          "Building the portfolio is only half the job. Portfolios that grow without discipline become expensive and unwieldy. We conduct regular reviews with our clients to take a hard look at what they own. Which assets are core? Which are candidates for licensing or sale? Which are no longer worth the maintenance fees? These are not easy conversations, but they are necessary ones, and our clients count on us to have them. For companies going through acquisitions, fundraising, or partnership discussions, these reviews become portfolio assessments that give decision-makers a clear and honest picture of what the IP covers, where it is strong, and where there are gaps or risks.",
      },
      {
        description:
          "We manage portfolios that span patents, trademarks, trade secrets, and copyrights, coordinating with foreign associates to maintain protection across the jurisdictions that matter to each client. The goal is always the same: every right in the portfolio should earn its place.",
      },
    ],
  },
  {
    slug: "patent-prosecution",
    title: "Patent Prosecution",
    data: [
      {
        description:
          "We are engineers. We are lawyers. We are businessmen. We are also Licensing experts and IP litigators. Because we see the world from many perspectives, we are able to craft patents contribute to IP portfolios that achieve your goals.",
      },
      {
        description:
          "Our firsthand experience as engineers and innovators gives you a direct connection to legal professionals who understand complex technologies and quickly grasp technical nuances. Lessons learned from years of licensing and litigating patents inform every aspect of our patent drafting and prosecution practice. This level of precision and depth not only strengthens the application itself — it also fortifies its defendability in the event of infringement. Our patent prosecution services include:",
        dataList: [
          {
            label: "Patent Portfolio Management",
          },
          {
            label:
              "Patent Preparation and Prosecution before the United States Patent and Trademark Office",
          },
          {
            label: "International Patent Applications",
          },
          {
            label: "Reexaminations and Reissues",
          },
          {
            label: "Appeals",
          },
        ],
      },
    ],
  },
  {
    slug: "post-grant-challenges",
    title: "POST GRANT CHALLENGES",
    data: [
      {
        description:
          "Patent assertions are seldom made lightly and are never received casually. Post grant challenges should be considered an almost inevitable response to an assertion of patent infringement.",
      },
      {
        description: `Slater Matsil is intimately familiar with the procedures and strategies necessary to successfully navigate the numerous procedural challenges to patents  under the America Invents Act (AIA). Slater Matsil was one of the first firms to file for an Inter Partes Review; for instance, when that procedure became available in 2013 under AIA. Slater Matsil has litigation and prosecution experience, both of which are vital to maximizing the chances for a successful outcome to a post grant challenge.


        Our experience in litigation and prosecution provides us with the insight necessary to successfully defend and attack patents in any one of the available post grant procedures. Our post grant services include:
          `,
        dataList: [
          {
            label: "Inter Partes Review (IPR)",
          },
          {
            label: "Covered Business Method (CBM)",
          },
          {
            label: "Post Grant Review (PGR) ",
          },
          {
            label: "Derivation Proceeding",
          },
          {
            label:
              "Coordinating Post Grant Challenges with Litigation Activities ",
          },
        ],
      },
    ],
  },
  {
    slug: "patent-litigation",
    title: "PATENT LITIGATION/LITIGATION SUPPORT",
    data: [
      {
        description:
          "Multinational enterprises and the global economy add even more layers of complexity to patent infringement cases — yet Slater Matsil simplifies the experience for the clients we represent and the legal firms we assist. ",
      },
      {
        description:
          "Slater Matsil regularly collaborates with leading law firms throughout the United States, providing knowledgeable patent counsel and firsthand technical insights for complex litigation. We've worked side by side with trial counsel on discovery and pretrial preparation. We've played key roles in Markman hearings, providing valuable perspectives on patent language and interpretation. We've also offered expert testimony on a broad range of processes and technologies. ",
      },
      {
        description:
          "Equipped with global patent experience and engineering acumen, Slater Matsil delivers patent litigation and litigation support services with skill and confidence. Our litigation and support services include: ",
        dataList: [
          {
            label: "Pre-Filing Diligence",
          },
          {
            label: "Prior Art Searching",
          },
          {
            label: "Infringement and Invalidity Contentions ",
          },
          {
            label: "Liaising with Expert Witnesses",
          },
          {
            label:
              "Supporting Claim Construction Development, Briefing, Hearings",
          },
          {
            label:
              "Technology-Specific Discovery (technical documents, prosecution history review, expert depositions) ",
          },
        ],
      },
    ],
  },
  {
    slug: "patent-licensing",
    title: "PATENT LICENSING",
    data: [
      {
        description:
          "A strong patent licensing program taps into the financial potential of your existing innovations. This not only creates the potential for substantial revenue streams over many years — it can also help fund an ongoing legacy of invention.",
      },
      {
        description:
          "Slater Matsil works with technological pioneers to formulate and implement licensing programs tailored specifically for their needs. We also have extensive experience negotiating, developing, and drafting sophisticated patent licensing and cross-licensing arrangements, technology transfers, and alliance agreements for both domestic and international clients. We believe that an effective IP licensing program can provide as much economic benefit as a litigation program, but oftentimes more expediently, with less risk, less disruption to business operations and management, and significantly less cost to the company. While not all IP disputes can be resolved without litigation, we have frequently assisted clients in structuring negotiated resolutions that address the needs of both the patent holding party and the responding party, at times even leading to discussions for future cooperative efforts between the parties. Our patent licensing services include:",

        dataList: [
          {
            label: "Portfolio Evaluations",
          },
          {
            label: "Patent Analysis and Enforcement",
          },
          {
            label: "Patent Infringement and Validity Studies",
          },
          {
            label: "License Drafting and Negotiation",
          },
        ],
      },
    ],
  },
  {
    slug: "adverse-patent-analysis",
    title: "ADVERSE PATENT ANALYSIS",
    data: [
      {
        description:
          "Adverse patent assertions have become an inevitable occurrence in today’s business environment. Some of our clients receive multiple adverse assertions in any given week. Effectively responding to an adverse patent requires at least as much strategic thought and attention as the patent holder puts into the assertion. Responding to an adverse patent does not, however, necessarily mean being on the defensive. In fact, we adhere to the standard that the best defense against a patent assertion is a rigorous and thorough offense.",
      },
      {
        description:
          "At Slater Matsil, we are familiar with the panoply of tools and strategies available for responding to an adverse patent assertion, and we employ a multi-pronged approach. The asserted patent must be evaluated for its merits and vulnerabilities — testing validity with prior art searches, challenging infringement with in-depth technical analysis, and probing the prosecution history for claim limiting statements and deficiencies. Due diligence must likewise be performed on the asserting entity itself — understanding the different motivations of a competitor versus a non-practicing entity or the like, and exploring the business pressures and sensitivities confronting the asserting entity. Additionally, care must be taken to fully understand the unique concerns and goals of the client — evaluating tolerance for risk, understanding how a patent assertion can influence a company’s shareholders, customers, vendors, and other stakeholders, and recognizing when a strategic advantage, such as a technical alliance, an acquisition opportunity, a cross license, or the like can develop from a patent assertion. Lastly, we recognize that maintaining effective and timely communications with management and decision makers within the corporate structure of our client is an essential part of ensuring the client obtains the outcome that best suits its needs.",
      },
      {
        description:
          "While patent litigation is typically easily quantified in terms of success (damages awarded, settlement payments, etc.), the success of responding to a patent assertion is often difficult to quantify. At Slater Matsil, we have a solid track record of saving our clients the costs of litigation when disputes are settled pre-litigation and avoiding the payment of license fees altogether when asserted patents are invalidated or otherwise defeated pre-litigation. With decades of collective experience in license negotiations and assertion responses, we have delivered substantial savings (totaling hundreds of millions of dollars) in litigation costs and license fees to our clients. Our adverse patent assertions services include:",
        dataList: [
          {
            label: "Prior Art Searches",
          },
          {
            label: "Infringement/Non-infringement Analysis",
          },
          {
            label: "Design Around Feasibility Studies",
          },
          {
            label: "Counter Assertions",
          },
          {
            label: "Risk Analysis",
          },
          {
            label: "License Negotiations",
          },
          {
            label: "Contract Drafting",
          },
          {
            label: "Opinion Letters",
          },
        ],
      },
    ],
  },
  {
    slug: "trusted-advice-counsel",
    title: "TRUSTED ADVICE AND COUNSEL",
    data: [
      {
        description:
          'Slater Matsil wears proudly the mantle of "strategic partner" bestowed by our clients.',
      },
      {
        description:
          "There is a reason Slater Matsil has been supporting many of its clients for 15 years or more. There is a reason many of our new clients come through word-of-mouth referrals, oftentimes from current clients. That reason is the relationships we develop with our clients. Relationships that foster trust. Relationships that engender confidence in our services. Relationships that allow us to understand the broader context of our clients' needs and to appreciate the long-term consequences of today's decisions. Not just opinions, but trusted advice and counsel. ",
      },
      {
        description:
          "Our clients need well-supported and thoughtful answers. They expect comprehensive advice. They demand direct and unvarnished counsel. We deliver. If we know the answer, we'll tell you. If we don't know the answer, we'll find out. If you don't like our answer, we'll discuss it with you and either defend it or identify another solution. Like many of our clients, we are businessmen, technologists, entrepreneurs, and managers. We understand the support you need. Your goals. Our experience. Mutual success.",
      },
      {
        description:
          "No matter where your offices are located, or where you conduct business, Slater Matsil delivers trusted advice and counsel in all matters relating to intellectual property. ",
      },
    ],
  },
  {
    slug: "trademarks",
    title: "Trademarks",
    data: [
      {
        description:
          "Product names. Logos. Domain names. When it comes to the trademarks that identify your business and products and help reinforce brand value, you need a trademark advocate with the experience to protect your interests across the nation and around the world.",
      },
      {
        description:
          "At every stage of creation, registration, and renewal, the trademark professionals of Slater Matsil deliver exceptional counsel to preserve the integrity of your brand. Our trademark practice includes: ",
        dataList: [
          {
            label: "Trademark Strategy and Counseling",
          },
          {
            label:
              "Trademark Preparation and Prosecution before the United States Patent and Trademark Office ",
          },
          {
            label: "Trademark Protection Programs ",
          },
          {
            label: "Trademark Infringement Assessments",
          },
          {
            label: "Trademark Licensing",
          },
          {
            label: "Trademark Assignment Agreements",
          },
        ],
      },
    ],
  },
];

export const professionalsListData = [
  {
    img: zachary,
    name: "Williams Zachary, Ph.D",
    designation: "Technical Advisor",
    slug: "zachary-williams",
  },
  {
    img: brian,
    name: "Brian A. Carlson",
    designation: "Attorney at Law",
    slug: "brian-carlson",
  },
  {
    img: ruojian,
    name: "RuoJian Zhang",
    designation: "Distinguished Patent Agent",
    slug: "ruojian-zhang",
  },
  {
    img: yumin,
    name: "Yumin Jeff Zhang, Ph.D",
    designation: "Distinguished Patent Agent",
    slug: "yumin-jeff-zhang",
  },
  {
    img: steven,
    name: "Steven Yates",
    designation: "Attorney at Law",
    slug: "steven-yates",
  },
  {
    img: srini,
    name: "Srini Chakravarthi, Ph.D",
    designation: "Attorney at Law",
    slug: "srini-chakravarthi",
  },
  {
    img: amitava,
    name: "Amitava Chatterjee",
    designation: "Technical Advisor",
    slug: "amitava-chatterjee",
  },
  {
    img: ava,
    name: "Ava Chung",
    designation: "Attorney at Law",
    slug: "ava-chung",
  },
  {
    img: stephen,
    name: "Stephen A. Cortiaus",
    designation: "Attorney At Law",
    slug: "stephen-cortiaus",
  },
  {
    img: patrick,
    name: "Patrick Darno",
    designation: "Attorney At Law",
    slug: "patrick-darno",
  },
  {
    img: vijay,
    name: "Vijay D. Desai",
    designation: "Attorney at Law",
    slug: "vijay-desai",
  },
  {
    img: barry,
    name: "Barry Dove",
    designation: "Attorney at Law",
    slug: "barry-dove",
  },
  {
    img: shervin,
    name: "Shervin Fatehi, Ph.D",
    designation: "Technical Advisor",
    slug: "shervin-fatehi",
  },
  {
    img: robert,
    name: "Robert G. Graham",
    designation: "Attorney at Law",
    slug: "robert-graham",
  },
  {
    img: jeffrey,
    name: "Jeffrey Robert Guinn",
    designation: "Attorney at Law",
    slug: "jeffrey-robert",
  },
  {
    img: zhu,
    name: "Zhu He",
    designation: "Attorney at Law",
    slug: "zhu-he",
  },
  {
    img: elizabeth,
    name: "Elizabeth D. Iglesias",
    designation: "Attorney at Law",
    slug: "elizabeth-iglesias",
  },
  {
    img: jonathan,
    name: "Jonathan Insler, Ph.D.",
    designation: "Patent Agent",
    slug: "jonathan-insler",
  },
  {
    img: paata,
    name: "Paata Kakashvili, Ph.D.",
    designation: "Patent Agent",
    slug: "paata-kakashvili",
  },
  {
    img: james,
    name: "James C. Kesterson",
    designation: "Attorney at Law",
    slug: "james-kesterson",
  },
  {
    img: roger,
    name: "Roger C. Knapp",
    designation: "Attorney at Law",
    slug: "roger-knapp",
  },
  {
    img: john,
    name: "John D. Koetter",
    designation: "Attorney at Law",
    slug: "john-koetter",
  },
  {
    img: fantai,
    name: "Fantai Kong, Ph.D.",
    designation: "Technical Advisor",
    slug: "fantai-kong",
  },
  {
    img: michael,
    name: "Michael Kucher",
    designation: "Attorney at Law",
    slug: "michael-kucher",
  },
  {
    img: soonshin,
    name: "Soonshin D. Kwon, Ph.D.",
    designation: "Technical Advisor",
    slug: "soonshin-kwon",
  },
  {
    img: brian_mair,
    name: "Brian A. Mair",
    designation: "Attorney at Law",
    slug: "brian-mair",
  },
  {
    img: ira,
    name: "Ira S. Matsil",
    designation: "Attorney at Law",
    slug: "ira-matsil",
  },
  {
    img: joseph,
    name: "Joseph E. McManis, Ph.D.",
    designation: "Patent Agent",
    slug: "joseph-mcmanis",
  },
  {
    img: marc,
    name: "Marc McWilliams, Ph.D.",
    designation: "Attorney at Law",
    slug: "marc-mcwilliams",
  },
  {
    img: peter,
    name: "Peter J. Meza",
    designation: "Attorney at Law",
    slug: "peter-meza",
  },
  {
    img: benjamin_nise,
    name: "Benjamin E. Nise",
    designation: "Attorney at Law",
    slug: "benjamin-nise",
  },
  {
    img: payam,
    name: "Payam Rashidi",
    designation: "Attorney at Law",
    slug: "payam-rashidi",
  },
  {
    img: rameez,
    name: "Rameez Samnakay, Ph.D.",
    designation: "Patent Agent",
    slug: "rameez-samnakay",
  },
  {
    img: steven_slater,
    name: "Steven H. Slater",
    designation: "Attorney at Law",
    slug: "steven-slater",
  },
  {
    img: chad,
    name: "Chad Terrell",
    designation: "Attorney at Law",
    slug: "chad-terrell",
  },
  {
    img: lizabeth,
    name: "Lizabeth Vice",
    designation: "Attorney at Law",
    slug: "lizabeth-vice",
  },
  {
    img: julian,
    name: "Julian Wang, Ph.D.",
    designation: "Technical Advisor",
    slug: "julian-wang",
  },
  {
    img: jonathan_ward,
    name: "Jonathan Ward",
    designation: "Attorney at Law",
    slug: "jonathan-ward",
  },
  {
    img: chuanming,
    name: "Chuanming Wei, Ph.D.",
    designation: "Attorney at Law",
    slug: "chuanming-wei",
  },
];
