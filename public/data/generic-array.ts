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
        text: "Licensing & Transactions",
        href: "/services/licensing-transaction",
      },
      {
        text: "Litigation Support",
        href: "/services/litigation-support",
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
    category: INSIGHTS_TAB_DATA.ARTICLES,
    slug: "slater-matsil-ranked-15th-for-most-us-utility-patents-issues-in-2025",
  },
  {
    title: "Slater Matsil Lawyers Present at Dallas Bar",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "slater-matsil-lawyers-present-at-dallas-bar",
  },
  {
    title:
      "Patexia ranked Slater Matsil #2 in Best Performing Law Firms Overall",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "patexia-ranked-slater-matsil-2-in-best-performing-law-firms-overall",
  },

  {
    title: "Srini Chakravarthi Moderates CLE for Dallas Bar Association",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "srini-chakravarthi-moderates-cle-for-dallas-bar-association",
  },
  {
    title: "Slater Matsil Attorneys Ranked by Patexia",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "slater-matsil-attorneys-ranked-by-patexia",
  },
  {
    title:
      "Srini Chakravarthi Leads Honorable Barbara M.G. Lynn American Inn of Court Sessions",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "srini-chakravarthi-leads-honorable-barbara",
  },
  {
    title:
      "Slater Matsil Recognized as “highly recommended” Prosecution Firm by IAM Patent 1000 Rankings",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "slater-matsil-recognized-as-highly-recommended",
  },
  {
    title:
      "Srini Chakravarthi Organizes CLE session, “Ethical Considerations in Your IP Practice,” for Dallas Bar Association",
    bgColor: COLORS.LIGHT_GREY,
    category: INSIGHTS_TAB_DATA.LINKS,
    slug: "srini-chakravarthi-organizes-cle-session",
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
    description:
      "Engineers-turned-attorneys who understand your inventions at the core",
  },
  {
    img: globalReach,
    title: "Global IP Reach",
    description: "Coordinated Patent strategy across US, Asia, and Europe",
  },
  {
    img: strategicInsight,
    title: "Strategic Insight",
    description: "Legal strategies allgned with your long - term businesses",
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
        title: "Post Grant Challenges",
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
          "We are engineers. We are lawyers. We are businessmen. We are also licensing professionals and IP litigators. Because we see the world from many perspectives, we are able to craft patents that contribute to IP portfolios that achieve your goals.",
      },
      {
        description:
          "Our firsthand experience as engineers and innovators gives you a direct connection to legal professionals who understand complex technologies and quickly grasp technical nuances. Lessons learned from years of licensing and litigating patents inform every aspect of our patent drafting and prosecution practice. This level of precision and depth not only strengthens the application itself — it also fortifies its defendability in the event of infringement. Our patent prosecution services include",
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
              "Supporting Claim Construction Development, Briefing, Hearing",
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
];
