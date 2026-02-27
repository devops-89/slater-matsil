import { INSIGHTS_DETAIL_PROPS } from "@/utils/types";
import steven from "@/professionals/transparent/steven-slater.png";
import ira from "@/professionals/transparent/ira-matsil.png";
import john from "@/professionals/transparent/john-koetter.png";
import stevenBadge from "@/insights/Screenshot 2025-11-18 113225 1.png";
import srini from "@/professionals/transparent/srini.png";
import zachary from "@/professionals/transparent/zachary-williams.png";
import brian from "@/professionals/transparent/brian-carlson.png";
import ruojian from "@/professionals/transparent/ruojian-zhang.png";
import yumin from "@/professionals/transparent/yumin.png";
import amitava from "@/professionals/transparent/amitava-chatterjee.png";
import roger from "@/professionals/transparent/roger-knapp.png";
import stephen from "@/professionals/transparent/stephen-cortiaus.png";
const commonContact = {
  firm: "SlaterMatsil, LLP",
  firmUrl: "www.slatermatsil.com",
  email: "info@slatermatsil.com",
  phone: "972 732 1001",
  shareLabel: "Share",
};

const baseSections = (
  name: string,
  customRegion?: string,
): INSIGHTS_DETAIL_PROPS["contentSections"] => ({
  aboutProvidedBy: "Provided by",
  aboutProvidedByName: name,
  region: customRegion || "USA",
  practiceAreas: {
    heading: "Practice Areas",
    content: `${name} provides strategic counsel in patent prosecution, portfolio development, and IP enforcement, working closely with innovators to align legal strategy with business objectives.`,
  },
  professionalMemberships: {
    heading: "Professional Memberships",
    content: `${name} is admitted before the United States Patent and Trademark Office and is an active member of leading IP and bar associations.`,
  },
  career: {
    heading: "Career",
    content: `${name} has represented technology clients across industries, guiding patent portfolios, licensing programs, and complex IP matters in the United States and abroad.`,
  },
  personal: {
    heading: "Personal",
    content: `${name} frequently speaks and writes on intellectual property topics and is recognized for mentoring clients and colleagues on IP strategy and innovation.`,
  },
});

const stevenSections = (): INSIGHTS_DETAIL_PROPS["contentSections"] => ({
  aboutProvidedBy: "Provided by",
  aboutProvidedByName: "Steven Slater",
  region: "USA",
  practiceAreas: {
    heading: "Practice Areas",
    content:
      "Steve Slater, one of the firm's founders, brings a holistic, strategy-centered approach to patent procurement and enforcement. Drawing upon a diverse experience base, as an in-house patent professional, as a commercial litigator handling complex business matters, as a patent litigator representing both corporate defendants and patent owners, and as a patent attorney who has drafted and prosecuted to issuance hundreds of patents, Steve is involved in all aspects of developing a comprehensive, valuable patent portfolio. He works closely with innovators to encourage and develop invention disclosures, with clients' management and in-house counsel to craft prosecution strategies and corporate \"best practices\" for managing IP, and with licensing and litigation counsel to exploit and commercialize his clients' patents and other intellectual property. Steve has prosecuted patent applications and/or enforced patents in numerous arts, including semiconductor devices and processes, processor hardware and systems, aviation, and software, including artificial intelligence and telecommunication protocols.",
  },
  professionalMemberships: {
    heading: "Professional Memberships",
    content:
      "State Bar of Texas; United States Patent and Trademark Office; admitted to practice before all federal district courts in Texas and the Fifth Circuit Court of Appeals.",
  },
  career: {
    heading: "Career",
    content:
      "Steve began his professional career as a product engineer at one of the leading semiconductor companies in the U.S., where he also worked as a patent engineer while attending law school. as an attorney, steve gained experience in complex business litigation for several years before returning to the practice of intellectual property law in 1997, where he was outside licensing counsel for an early innovator in personal computers. steve co-founded slater matsil, ll.p. in 1999 where he has maintained a robust practice in patent prep and prosecution, ip licensing and litigation, and providing strategic portfolio management guidance to clients in the u.s., europe, and asia. during this time, steve has negotiated several multi-million dollar ip licenses and cross-licenses involving hundreds of patents.",
  },
  personal: {
    heading: "Personal",
    content:
      "Steve graduated with a degree in electrical engineering from the University of South Florida in 1985 and received his Juris Doctor cum laude from Southern Methodist University's Dedman School of Law in 1992. Steve was an Associate Managing Editor of the SMU Law Review, an Order of the Coif law school graduate, and a member of the American Inns of Court. In addition, Steve has been a frequent guest speaker for the Dallas Bar Association, the Texas State Bar, the Licensing Executive Society, the Center for American and International Law, and other organizations.",
  },
  chambersReview: {
    heading: "Chambers Review",
    content:
      "Steve Slater is a highly regarded practitioner who is known for his deep expertise in patent prosecution and portfolio management. One source notes: 'Steven has a deep understanding of our business and their business, and he is extremely responsive and helpful.'",
  },
  strengths: {
    heading: "Strengths",
    content:
      "Steve is very responsive and thoughtful in his advice. He has been a great partner in our IP endeavors.",
  },
});

const iraSections = (): INSIGHTS_DETAIL_PROPS["contentSections"] => ({
  aboutProvidedBy: "Provided by",
  aboutProvidedByName: "Ira Matsil",
  region: "USA",
  practiceAreas: {
    heading: "Practice Areas",
    content:
      "Ira Matsil represents leading domestic and international technology companies in the complex technical aspects of patent portfolio management and strategy. Ira is best known for helping global technology companies build patent portfolios that achieve business objectives. His technical and legal strengths combine to provide high-quality, enforceable patents. Ira’s practice also includes patent licensing, patent litigation support and patent opinion work, including infringement and validity matters.",
  },
  professionalMemberships: {
    heading: "Professional Memberships",
    content: "State Bar of Texas. United States Patent and Trademark Office.",
  },
  career: {
    heading: "Career",
    content:
      "Before becoming an attorney, Ira worked at a Fortune 500 technology company as a lead engineer and program manager. His patent experience spans over 30 years, the first seven of which were in-house. Technical strengths include electronic circuits, semiconductors, telecommunications, optics, and computer hardware and software.",
  },
  personal: {
    heading: "Personal",
    content:
      "B.S., electrical engineering, the University of Texas at Austin; M.S., electrical engineering from The University of Texas at Arlington; J.D., Southern Methodist University's Dedman School of Law, magna cum laude.",
  },
  chambersReview: {
    heading: "Chambers Review",
    content:
      "Ira Matsil is widely recognised for his patent prosecution and portfolio management work.",
  },
  strengths: {
    heading: "Strengths",
    content:
      "Ira is always a pleasure to work with. He is very responsive and knowledgeable, coupled with very good responsiveness and excellence in both his legal and technical expertise.",
  },
});

const sriniSections = (): INSIGHTS_DETAIL_PROPS["contentSections"] => ({
  aboutProvidedBy: "Provided by",
  aboutProvidedByName: "Srini Chakravarthi",
  region: "USA",
  practiceAreas: {
    heading: "Practice Areas",
    content:
      "Srini Chakravarthi is a partner at Slater Matsil, LLP, and a seasoned patent attorney with over 17 years of experience in Intellectual Property law. He leverages his extensive background in engineering and research to provide well-rounded guidance to his clients. Srini's expertise spans all aspects of patent portfolio development and management, including strategy, procurement, licensing, and litigation support. He also advises on opinion letters, post-grant proceedings, due diligence, and infringement and invalidity analyses for licensing and litigation purposes.",
  },
  professionalMemberships: {
    heading: "Professional Memberships",
    content:
      "State Bar of Texas; United States Patent and Trademark Office; The Honorable Barbara M.G. Lynn American Inn of Court (Barrister, 2023-Present); Dallas Bar Association, Intellectual Property Section (Council Member). He is a frequent speaker / organizer of CLE events for the Dallas Bar IP Section where he is the CLE Committee Co-Chair (2024-present).",
  },
  career: {
    heading: "Career",
    content:
      "With a diverse technical background encompassing computational science, materials science, and electrical engineering, Srini brings a unique perspective to his legal practice. Prior to his legal career, he spent over a decade working in industrial research, developing industry-leading technologies. This experience allows him to quickly grasp clients' complex technologies and align them effectively with their legal and business objectives. In addition to his legal practice, Srini has been appointed as an Adjunct Professor of Law at Texas A&M Law School, where he has taught courses on Patent Law (Spring 2024, Spring 2025).",
  },
  personal: {
    heading: "Personal",
    content:
      "B.S., Indian Institute of Technology; Ph.D., Boston University; J.D., Southern Methodist University. Srini is a named inventor on 25 issued U.S. patents and has authored numerous highly cited research articles.",
  },
  chambersReview: {
    heading: "Chambers Review",
    content:
      "Srini Chakravarthi focuses on patent portfolio management, portfolio strategy and procurement. He represents clients in the semiconductor, automotive and biotechnology industries.",
  },
  strengths: {
    heading: "Strengths",
    content:
      '"Srini is a very experienced, knowledgeable lawyer, who is excellent both in legal and technical expertise." — Intellectual Property respondent, Chambers Guide to the USA',
  },
});

export const INSIGHTS_DETAILS_DATA: INSIGHTS_DETAIL_PROPS[] = [
  {
    slug: "john-koetter-latest-publication-dallas-bar",
    hero: {
      name: "John Koetter",
      band: "Slater Matsil Attorney",
      guide: "Dallas Bar Association Publication",
      yearsRanked: "2025 Publication",
      profileImage: john,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Slater Matsil Attorney",
      aboutProvidedByName: "John Koetter",
      region: "USA",
      practiceAreas: {
        heading: "Latest Publication",
        content:
          "Slater Matsil partner John Koetter's insights on IPR were recently published in the February 2026 edition of the Dallas Bar Association's Headnotes, in their Intellectual Property/Science & Technology Law focus issue. \n\nJohn's article, 'Shifting Strategies for Patent Challenges,' examines the dramatic decline in IPR institution rates at the USPTO — from a historical average of 67% down to single digits — and what it means for companies facing patent disputes. \n\nThe piece explores alternative strategies, including the renewed viability of ex parte reexamination, and offers practical guidance for counsel navigating this shifting landscape.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "slater-matsil-chambers-usa-2025",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Ranked Firm : Intellectual Property – Texas",
      guide: "USA Guide 2025",
      yearsRanked: "1 Department · 3 Ranked Lawyers",
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Firm Overview",
        content:
          "Slater Matsil is best known as one of the top patent prosecution firms in the US, consistently ranking amongst the most productive practices in the country. Slater Matsil was ranked in Best Performing Law Firms Overall, Overall Best Performing Law Firms in High-Tech and Most Active Law Firms in High-Tech by Patexia in 2025. In addition, PatentBots named Slater Matsil in the top 10 for patent quality and the Harrity Analytics Team named the Firm as a Top Patent Firm based on the total number of US utility patents that issued in 2024. The Firm has obtained over 23,000 US patents for clients, including some of the most patent-prolific companies in the world. Slater Matsil's team includes patent and trademark attorneys, patent agents, and technical advisors. Many of the Firm's patent attorneys are also experienced trial lawyers who handle cases in the US Federal Courts, before the Patent Trial and Appeal Board of the US Patent and Trademark Office, and before the United States International Trade Commission, often in partnership with other firms. Slater Matsil's clients include some of the world's largest electronics and telecommunications companies and numerous up-and-coming start-up ventures.",
      },
      professionalMemberships: {
        heading: "Firm Details",
        content:
          "Managing Partner: Ira S. Matsil | Senior Partners: Steven H. Slater, Ira S. Matsil, Srini Chakravarthi | Number of partners: 12 | Number of billing professionals: 26 attorneys, 6 patent agents, and 6 technical advisors | Languages: Arabic, Bangla, English, Farsi, French (Canadian), French (European), Georgian, German, Gujarati, Hindi, Italian, Kiswahili, Korean, Mandarin, Romanian, Russian, Spanish, Tamil, Urdu | Office: 17304 Preston Road, Suite 900, Dallas, TX 75252 | Tel: 972.732.1001 | Email: info@slatermatsil.com",
      },
      career: {
        heading: "Patent Prosecution",
        content:
          "Drafting and prosecuting patent applications is the core of Slater Matsil's practice. The Firm manages a significant portion of US filings for some of the world's most prolific patent filers, including several clients that are amongst the top 20 US filers. In 2024, Slater Matsil filed over 3,200 patent applications and had almost 2,000 patents issued on behalf of its clients. The Firm's focus on quality as well as quantity is also recognized frequently by industry groups — recognized by Patexia as a \"Best Performing Patent Firm\" in 2025; PatentBots as a Top 10 Large Firm in 2025 Patent Quality; U.S. News – Best Lawyers® named Slater Matsil as a Tier 1 firm in Litigation – Patent and a Tier 2 Firm in Patent Law (Dallas/Fort Worth) in 2023–2025; and ranked first in Juristat's 2024 \"Top Patent Firms in Semiconductors, Electrical and Optical Systems, and Components.\" Key Clients: Taiwan Semiconductor Manufacturing Co., Huawei Technologies, ST Microelectronics, Inc.",
      },
      personal: {
        heading: "Patent Litigation & Post Grant Challenges",
        content:
          'The Firm offers a wide spectrum of expertise in IP litigation, often as a team member of a multi-firm effort. In post grant challenges, Slater Matsil represents both patent owners and petitioners, with dozens of post-grant challenges being successfully concluded on behalf of our clients. By combining extensive familiarity with Patent Office proceedings with strong litigation skill-sets, the Firm continues to rack up an impressive record of victories for its clients. The Firm\'s IP litigation team is nationally recognized — U.S. News ranked Slater Matsil in 2023–2025 as a "Best Law Firm in Tier 1 for Patent Litigation." Key Clients: Taiwan Semiconductor Manufacturing Co., Ltd. (TSMC), SMA Solar Technology AG.',
      },
      chambersReview: {
        heading: "Asia Pacific Practice Group",
        content:
          "Slater Matsil's Asia Pacific Practice Group recognizes the importance of a comprehensive IP strategy for companies seeking to enter or grow in the US market. In addition to traditional IP services, the Firm also provides practical, culturally-sensitive advice to companies seeking to navigate the complex landscape of business practices and intellectual property law in the United States. This practice group offers fluency in Mandarin, Bangla, Farsi, Gujarati, Hindi, Tamil, and Urdu. Slater Matsil was named the 2024 US Patent Prosecution Adviser of the Year for China – USA by IE 100 Awards. Key Clients: Huawei Technologies, Hyundai Motor Group, Tokyo Electron Limited.",
      },
      strengths: {
        heading: "Chambers USA Rankings",
        content:
          'USA Guide 2025 | Texas | Intellectual Property | 1 Department · 3 Ranked Lawyers. Slater Matsil recognizes that technical expertise is as important as legal prowess when it comes to effective patent drafting and prosecution. The Firm practices its motto, "Fluent in Technology, Proven in Law" every day — with thirteen of the Firms\' practitioners having an advanced technical degree. In fact, many Firm practitioners are inventors in their own rights, with over 125 patents issued to members of the Firm.',
      },
    },
  },
  {
    slug: "steven-slater-chambers-usa-2025",
    hero: {
      name: "Steven Slater",
      band: "Band 5 : Intellectual Property",
      guide: "USA Guide 2025",
      yearsRanked: "2 years Ranked",
      profileImage: steven,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: stevenSections(),
  },
  {
    slug: "ira-matsil-chambers-usa-2025",
    hero: {
      name: "Ira Matsil",
      band: "Band 4 : Intellectual Property",
      guide: "USA Guide 2025",
      yearsRanked: "5 years Ranked",
      profileImage: ira,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: iraSections(),
  },
  {
    slug: "ira-matsil-chambers-usa-2025-2",
    hero: {
      name: "Ira Matsil",
      band: "Band 4 : Intellectual Property",
      guide: "USA Guide 2025",
      yearsRanked: "5 years Ranked",
      profileImage: ira,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: iraSections(),
  },

  {
    slug: "slater-matsil-iam-patent-1000-2022",
    hero: {
      name: "Slater Matsil Team",
      band: "IAM Patent 1000 Ranked Firm",
      guide: "IAM Patent 1000 – 2022",
      yearsRanked: "Firm and individual rankings",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: baseSections("Slater Matsil Team"),
  },
  {
    slug: "ira-matsil-iam-global-leaders-2022",
    hero: {
      name: "Ira Matsil",
      band: "IAM Global Leaders",
      guide: "IAM Global Leaders – 2022",
      yearsRanked: "Featured Global Leader",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: baseSections("Ira Matsil"),
  },
  {
    slug: "john-koetter-rising-star-2021",
    hero: {
      name: "John Koetter",
      band: "Rising Star – Super Lawyers",
      guide: "Super Lawyers Rising Stars 2021",
      yearsRanked: "Rising Star 2021",
      profileImage: john,
    },
    contact: commonContact,
    contentSections: baseSections("John Koetter"),
  },
  {
    slug: "srini-chakravarthi-chambers-usa-2025",
    hero: {
      name: "Srini Chakravarthi",
      band: "Band 4 : Intellectual Property",
      guide: "USA Guide 2025",
      yearsRanked: "3 years Ranked",
      profileImage: srini,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: sriniSections(),
  },
  {
    slug: "ira-matsil-best-lawyers-america",
    hero: {
      name: "Ira Matsil",
      band: "U.S. News – Best Lawyers in America",
      guide: "Patent Litigation – Dallas, TX",
      yearsRanked: "Recognized since 2021",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Recognition",
        content:
          "Since 2021, Ira S. Matsil has been recognized by U.S. News – Best Lawyers in America for Patent Litigation in Dallas, TX. This recognition reflects his decades of expertise and his commitment to protecting client innovations at the highest level.",
      },
      professionalMemberships: {
        heading: "About U.S. News – Best Lawyers",
        content:
          "Best Lawyers is one of the oldest and most respected peer-review publications in the legal profession. A lawyer must be selected by their peers to receive this recognition, making it one of the most prestigious accolades in the industry.",
      },
      career: {
        heading: "More Information",
        content:
          "For more details about Ira Matsil's recognition and practice areas, please visit the U.S. News – Best Lawyers website or contact Slater Matsil, LLP directly.",
      },
      personal: {
        heading: "Contact",
        content:
          "Slater Matsil, LLP | 17304 Preston Rd, Suite 900, Dallas, TX 75252 | Tel: 972.732.1001 | Email: info@slatermatsil.com",
      },
    },
  },
  {
    slug: "steve-slater-best-lawyers-america",
    hero: {
      name: "Steve Slater",
      band: "U.S. News – Best Lawyers in America",
      guide: "Patent Litigation – Dallas, TX",
      yearsRanked: "Recognized since 2020",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Recognition",
        content:
          "Since 2020, Steve H. Slater has been recognized by U.S. News – Best Lawyers in America for Patent Litigation in Dallas, TX. This recognition underscores his extensive expertise in patent law and his dedication to delivering outstanding results for clients.",
      },
      professionalMemberships: {
        heading: "About U.S. News – Best Lawyers",
        content:
          "Best Lawyers is one of the oldest and most respected peer-review publications in the legal profession. A lawyer must be selected by their peers to receive this recognition, making it one of the most prestigious accolades in the industry.",
      },
      career: {
        heading: "More Information",
        content:
          "For more details about Steve Slater's recognition and practice areas, please visit the U.S. News – Best Lawyers website or contact Slater Matsil, LLP directly.",
      },
      personal: {
        heading: "Contact",
        content:
          "Slater Matsil, LLP | 17304 Preston Rd, Suite 900, Dallas, TX 75252 | Tel: 972.732.1001 | Email: info@slatermatsil.com",
      },
    },
  },
  {
    slug: "ira-matsil-strategy-300-global-leader",
    hero: {
      name: "Ira Matsil",
      band: "IAM Strategy 300: The World's Leading IP Strategists",
      guide: "IAM Strategy 300 – 2025",
      yearsRanked: "Strategy 300 Global Leader",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Recognition",
        content:
          "Ira Matsil has been selected for the 2025 IAM Strategy 300: The World's Leading IP Strategist as a Strategy 300 Global Leader. This prestigious recognition identifies the world's foremost IP strategists who provide the best‐in-class advice to companies looking to maximize the value of their IP assets.",
      },
      professionalMemberships: {
        heading: "About IAM Strategy 300",
        content:
          "The IAM Strategy 300 identifies the world's leading IP strategists across private practice and in-house. researchers spoke with hundreds of IP professionals around the world to identify those individuals who are providing the best strategic advice to companies and organizations looking to build, commercialize, and defend IP assets.",
      },
      career: {
        heading: "More Information",
        content:
          "For more details about Ira Matsil's recognition and strategic IP work, please visit the IAM Strategy 300 website or contact Slater Matsil, LLP directly.",
      },
      personal: {
        heading: "Contact",
        content:
          "Slater Matsil, LLP | 17304 Preston Rd, Suite 900, Dallas, TX 75252 | Tel: 972.732.1001 | Email: info@slatermatsil.com",
      },
    },
  },
  {
    slug: "srini-chakravarthi-moderates-cle-for-dallas-bar-association",
    hero: {
      name: "Srini Chakravarthi",
      band: "Honorable Barbara M.G. Lynn American Inn of Court",
      guide: "UT Dallas Career Sessions",
      yearsRanked: "Career Advisor & Speaker",
      profileImage: srini,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "About Us",
        content:
          "As part of the Honorable Barbara M.G. Lynn American Inn of Court, me, along with my co-organizer, Jordan Strauss, had the pleasure of organizing a series of sessions at UT Dallas on careers in Intellectual Property. These were hosted in three different divisions on campus - Honors College, Pre Law School, and Electrical and Computer Engineering Building for STEM students. Over the course of the past 3 weeks, we had the pleasure of discussing IP and potential career options with a diverse cross-section of enthusiastic students from UTD. We wish the students the best in their future endeavors! Thank you Prof. Ravi Prakash from UT Dallas for facilitating these events. We want to thank our distinguished panelists for taking the time and enriching this experience.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "srini-chakravarthi-leads-honorable-barbara",
    hero: {
      name: "Srini Chakravarthi",
      band: "Honorable Barbara M.G. Lynn American Inn of Court",
      guide: "Inns of Court Sessions",
      yearsRanked: "Session Leader",
      profileImage: srini,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "About Us",
        content:
          "As part of the Honorable Barbara M.G. Lynn American Inn of Court, me, along with my co-organizer, Jordan Strauss, had the pleasure of organizing a series of sessions at UT Dallas on careers in Intellectual Property. These were hosted in three different divisions on campus - Honors College, Pre Law School, and Electrical and Computer Engineering Building for STEM students. Over the course of the past 3 weeks, we had the pleasure of discussing IP and potential career options with a diverse cross-section of enthusiastic students from UTD. We wish the students the best in their future endeavors! Thank you Prof. Ravi Prakash from UT Dallas for facilitating these events. We want to thank our distinguished panelists for taking the time and enriching this experience.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "srini-chakravarthi-community-project-outreach",
    hero: {
      name: "Srini Chakravarthi",
      band: "Slater Matsil Partner",
      guide: "Barbara M.G. Lynn American Inn of Court",
      yearsRanked: "2025 Outreach Series",
      profileImage: srini,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "Community Outreach",
        content:
          "As part of the Honorable Barbara M.G. Lynn American Inn of Court, Srini Chakravarthi, along with co-organizer Jordan Strauss, organized a series of sessions at UT Dallas on careers in Intellectual Property.",
      },
      professionalMemberships: {
        heading: "Campus Engagement",
        content:
          "These sessions were hosted across three different divisions on campus - the Honors College, Pre-Law School, and the Electrical and Computer Engineering Building - specifically engaging with STEM students about the legal profession.",
      },
      career: {
        heading: "Career Mentorship",
        content:
          "Over the course of three weeks, the team had the pleasure of discussing IP and potential career options with a diverse cross-section of enthusiastic students from UTD, helping bridge the gap between technical studies and legal careers.",
      },
      personal: {
        heading: "Acknowledgments",
        content:
          "Special thanks to Prof. Ravi Prakash from UT Dallas for facilitating these events and to the distinguished panelists for taking the time to share their expertise and enrich this student experience.",
      },
    },
  },
  {
    slug: "ira-matsil-chambers-usa-2021-2023",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "Chambers USA Guide",
      yearsRanked: "2021 - 2023 Ranked Attorney",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Chambers Recognition",
        content:
          "Ira Matsil was ranked as a top Intellectual Property attorney by Chambers USA for three consecutive years (2021 - 2023). Chambers ranks lawyers based on extensive third-party research, evaluating qualities like technical legal ability, professional conduct, and commercial astuteness.",
      },
      professionalMemberships: {
        heading: "Client Service Excellence",
        content:
          "An industry leader highlighted Ira's exceptional performance, stating: 'I would rate Ira’s client service, level of sophistication, and commercial awareness as all very strong. He has extensive experience in all aspects of patent work and is highly professional.'",
      },
      career: {
        heading: "Strategic IP Counsel",
        content:
          "Ira represents leading domestic and international technology companies in the complex technical aspects of patent portfolio management and strategy. His technical and legal strengths combine to create high-quality, enforceable patents.",
      },
      personal: {
        heading: "Professional Standing",
        content:
          "For more information regarding Ira's specialized expertise and professional background, we invite you to explore his full profile on our Professionals page.",
      },
    },
  },
  {
    slug: "srini-chakravarthi-chambers-usa-2023",
    hero: {
      name: "Srini Chakravarthi",
      band: "Slater Matsil Partner",
      guide: "Chambers USA Guide",
      yearsRanked: "2023 Ranked Attorney",
      profileImage: srini,
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "Chambers Recognition",
        content:
          "Srini Chakravarthi was ranked in Intellectual Property by Chambers USA 2023. Chambers ranks lawyers based on extensive third-party research with clients, peers, and industry leaders, evaluating technical legal ability, professional conduct, client service, and commercial astuteness.",
      },
      professionalMemberships: {
        heading: "Leadership & Client Service",
        content:
          "A recognized market leader noted: 'Srini is the key point of contact for managing the work entrusted by our team. He excels with the extraordinary service his leadership provides to our team.'",
      },
      career: {
        heading: "Technical Expertise",
        content:
          "Srini leads a practice group that routinely works with a wide range of complex technologies, including semiconductor technology, mixed-signal and analog circuits, signal and image processing, networking, and communications.",
      },
      personal: {
        heading: "Professional Standing",
        content:
          "For more information regarding Srini's specialized expertise and professional background, we invite you to explore his full profile on our Professionals page.",
      },
    },
  },
  {
    slug: "ira-matsil-chambers-usa-2022",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "Chambers USA Guide",
      yearsRanked: "2022 Ranked Attorney",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Chambers Recognition",
        content:
          "Ira Matsil was ranked as a top Intellectual Property attorney by Chambers USA 2022. This marks the second consecutive year Ira has been honored by Chambers for his excellence in patent law.",
      },
      professionalMemberships: {
        heading: "Client Engagement",
        content:
          "Chambers research highlighted Ira's attentiveness, with one client stating: 'Ira is extremely attentive. He takes the time to explain all the details, discuss strategy and options.'",
      },
      career: {
        heading: "Technical Focus",
        content:
          "Ira represents leading domestic and international technology companies in the complex technical aspects of patent portfolio management and strategy. His expertise ensures the creation of high-quality, enforceable patents.",
      },
      personal: {
        heading: "Professional Standing",
        content:
          "For more information regarding Ira's specialized expertise and professional background, we invite you to explore his full profile on our Professionals page.",
      },
    },
  },
  {
    slug: "slater-matsil-chambers-usa-2022",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Leading IP Law Firm",
      guide: "Chambers USA Guide 2022",
      yearsRanked: "Multiple Years Ranked",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Firm Recognition",
        content:
          "Slater Matsil was once again ranked as one of the top intellectual property law firms by Chambers USA 2022. This ranking reflects the market opinion of the top law firms based on thousands of client and attorney interviews.",
      },
      professionalMemberships: {
        heading: "Market Presence",
        content:
          "Partner Srini Chakravarthi noted: 'Being recognized for the third year in a row is an incredible honor. This ranking reflects the collaborative role of our team and the deep technical and legal knowledge we provide.'",
      },
      career: {
        heading: "Engineering Strength",
        content:
          "Chambers highlighted the firm's unique ability to understand the engineering side of inventions and combine that with high-quality legal service, with clients praising the firm's diligent long-term protection strategies.",
      },
      personal: {
        heading: "Industry Standing",
        content:
          "In addition to Chambers, Slater Matsil received top rankings in the Patexia 2022 report for Best Performing Patent Law Firms Overall and in High Tech.",
      },
    },
  },
  {
    slug: "slater-matsil-patexia-rankings-2022",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Patexia Top Ranked",
      guide: "Patexia 2022 Intelligence Report",
      yearsRanked: "Ranked #2 and #7 Overall",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Performance Metrics",
        content:
          "Patexia ranked Slater Matsil as the #2 Best Performing Patent Firm Overall in 2022. The firm was also ranked #7 for Best Performing Patent Law Firms in High Tech.",
      },
      professionalMemberships: {
        heading: "Activity & Efficiency",
        content:
          "The published ratings ranked the top 1,000 most active and best performing patent firms, assessing success, efficiency, and activity across thousands of filings.",
      },
      career: {
        heading: "High-Tech Leader",
        content:
          "The firm's inclusion in the categories of Most Active Law Firms Overall and Most Active Law Firms in High-Tech underscores its significant footprint in the technology sector.",
      },
      personal: {
        heading: "Methodology",
        content:
          "Patexia's independent and data-driven analysis ensures that these rankings represent a true benchmark of success in the patent prosecution field.",
      },
    },
  },
  {
    slug: "slater-matsil-juristat-semiconductors-2021",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat #1 Ranking",
      guide: "Juristat Technology Center Rankings",
      yearsRanked: "Ranked First in 2021",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Sector Leadership",
        content:
          "Slater Matsil ranked first in Juristat's 2021 Top Patent Firms list for Semiconductors, Electrical and Optical Systems and Components.",
      },
      professionalMemberships: {
        heading: "Data Analysis",
        content:
          "Juristat analyzed USPTO data to rank firms based on the total number of applications filed, allowance rate, and the average number of office actions before allowance.",
      },
      career: {
        heading: "Performance Consistency",
        content:
          "This ranking reinforces Slater Matsil's reputation as a top-performing firm in highly complex technical sectors.",
      },
      personal: {
        heading: "Strategic Impact",
        content:
          "By achieving high allowance rates and efficiency, the firm provides significant value to its technology-driven clientele.",
      },
    },
  },
  {
    slug: "slater-matsil-patexia-rankings-2021",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Patexia #4 Ranking",
      guide: "Patexia 2021 Intelligence Report",
      yearsRanked: "Top 10 High-Tech Firm",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "2021 Rankings",
        content:
          "Patexia ranked Slater Matsil as the #4 Best Performing Patent Firm Overall in 2021, and as the #9 Most Active Law Firm in High Tech.",
      },
      professionalMemberships: {
        heading: "Excellence in Prosecution",
        content:
          "Patexia's evaluations are based on success and efficiency, highlighting Slater Matsil's ability to navigate the USPTO landscape effectively.",
      },
      career: {
        heading: "Innovation Support",
        content:
          "The firm's high activity score in the tech sector reflects its deep involvement in protecting cutting-edge innovations.",
      },
      personal: {
        heading: "Industry Benchmark",
        content:
          "Being recognized in the top 10 for high-tech patent prosecution is a significant achievement in a competitive legal market.",
      },
    },
  },
  {
    slug: "ira-matsil-chambers-usa-2021",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "Chambers USA Guide 2021",
      yearsRanked: "Ranked Attorney",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Professional Recognition",
        content:
          "Slater Matsil is pleased to announce that Ira Matsil was ranked in Intellectual Property by Chambers USA 2021. This prestigious ranking reflects his exceptional legal knowledge and experience.",
      },
      professionalMemberships: {
        heading: "Market Reputation",
        content:
          "Industry leaders have described Ira as 'very, very talented,' while clients praise him as a 'very creative thinker and very responsive.'",
      },
      career: {
        heading: "Strategic IP Advice",
        content:
          "Ira advises a wide range of clients on patent prosecution and portfolio management, leveraging his 30+ years of technical and legal experience.",
      },
      personal: {
        heading: "Ranking Value",
        content:
          "Chambers ranks lawyers based on effectiveness, commercial astuteness, and client service—qualities Ira consistently demonstrates.",
      },
    },
  },
  {
    slug: "slater-matsil-new-partners-announcement",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Growth & Leadership",
      guide: "Partner Announcements",
      yearsRanked: "2016 - 2021 Appointments",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "New Partner Announcements",
        content:
          "Slater Matsil is pleased to announce the promotion of several dedicated attorneys to the role of Partner, reflecting the firm's growth and commitment to excellence.",
      },
      professionalMemberships: {
        heading: "2021 & 2020 Partners",
        content:
          "Effective January 1, 2021: John Koetter, Liz Vice, and Robert Graham. Effective January 1, 2020: Elizabeth D. Iglesias and Li Li, Ph.D.",
      },
      career: {
        heading: "2019 & 2017 Partners",
        content:
          "Effective January 1, 2019: Landon E. Wiebusch. Effective January 1, 2017: Michael Kucher and Srini Chakravarthi, Ph.D.",
      },
      personal: {
        heading: "2016 Partners",
        content:
          "Effective January 1, 2016: Benjamin E. Nise and Brian A. Mair. These appointments strengthen our leadership team across all IP practice areas.",
      },
    },
  },
  {
    slug: "slater-matsil-juristat-growing-firms-2020",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat Top Ranked",
      guide: "Juristat Growth Analysis",
      yearsRanked: "Ranked #1 Growth Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Decade of Growth",
        content:
          "Slater Matsil was ranked first in Juristat's Top 25 growing Patent firms in the last decade. The analysis focused on utility and plant applications, identifying firms that significantly expanded their footprint while maintaining high quality.",
      },
      professionalMemberships: {
        heading: "Efficiency Metrics",
        content:
          "The high-growth firms identified by Juristat consistently bested USPTO averages. Slater Matsil leads this group with an average allowance rate of 92% and a time to disposition of only 17 months.",
      },
      career: {
        heading: "USPTO Benchmarking",
        content:
          "In comparison to our performance, the USPTO averages stood at 78% for allowance rates and 27.7 months for time to disposition. Our team's dedication ensures much faster and more reliable results for our clients.",
      },
      personal: {
        heading: "Data-Driven Success",
        content:
          "Juristat's objective analysis of patent data confirms Slater Matsil's position as a leader in both growth and operational excellence within the intellectual property legal market.",
      },
    },
  },
  {
    slug: "srini-chakravarthi-metrocon-2020",
    hero: {
      name: "Srini Chakravarthi",
      band: "Slater Matsil Partner",
      guide: "2020 ACP MetroCon",
      yearsRanked: "Featured Speaker",
      profileImage: srini,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "Presentation Highlights",
        content:
          "Srini Chakravarthi delivered a presentation on Building and Monetizing the 'Perfect' Patent Portfolio at the 2020 ACP MetroCon, an annual conference held by the Association of Chinese Professionals Foundation.",
      },
      professionalMemberships: {
        heading: "Perfect Portfolio Strategy",
        content:
          "In determining what makes a 'perfect' patent portfolio, Srini reviewed different business scenarios that most inventors and companies face, exploring how these scenarios impact strategic development and monetization.",
      },
      career: {
        heading: "Investment Outlook",
        content:
          "The presentation focused on critical considerations that go into developing intellectual property assets, emphasizing that a portfolio's perfection is defined by its alignment with the owner's specific business goals.",
      },
      personal: {
        heading: "Professional Expertise",
        content:
          "To learn more about Srini's approach to patent portfolio management and monetization, please visit his full profile on our Professionals page.",
      },
    },
  },
  {
    slug: "patexia-firm-rankings-2020",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Patexia Top Ranked",
      guide: "Patexia 2020 Intelligence Report",
      yearsRanked: "Ranked #2 and #9 Overall",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "2020 Rankings",
        content:
          "Patexia named Slater Matsil the #2 Best Performing Patent Firm Overall in 2020. The firm was also ranked #9 among the top 100 Most Active Law Firms in High Tech.",
      },
      professionalMemberships: {
        heading: "Comprehensive Metrics",
        content:
          "The published ratings assessed the top 1,000 most active and best performing patent firms. Patexia's methodology measures success, efficiency, and activity across the entire USPTO landscape.",
      },
      career: {
        heading: "Firm Performance",
        content:
          "Being recognized as a top-performing firm reinforces Slater Matsil's commitment to delivering high-quality legal services and efficient results for technology-driven clients.",
      },
      personal: {
        heading: "Industry Benchmark",
        content:
          "Patexia's data-driven insights provide a transparent benchmark for excellence in patent prosecution, where Slater Matsil consistently ranks among the very best.",
      },
    },
  },
  {
    slug: "juristat-semiconductors-2020",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat #4 Ranking",
      guide: "Juristat 2020 Top Patent Firms",
      yearsRanked: "Top 10 Performance",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Technical Expertise",
        content:
          "Slater Matsil ranked fourth in Juristat's 2020 Top Patent Firms list for Semiconductors, Electrical and Optical Systems and Components.",
      },
      professionalMemberships: {
        heading: "Juristat Analysis",
        content:
          "Juristat analyzed USPTO data to rank the top 10 firms based on key metrics: total applications filed, allowance rate, and the average number of office actions before allowance.",
      },
      career: {
        heading: "Consistent Quality",
        content:
          "Our #4 ranking in this highly technical sector reflects our deep understanding of semiconductor technologies and our efficiency in securing patents for our clients.",
      },
      personal: {
        heading: "Strategic Results",
        content:
          "By minimizing office actions and maintaining high allowance rates, we ensure that our clients receive the most effective and timely protection for their innovations.",
      },
    },
  },
  {
    slug: "juristat-semiconductors-2019",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat #6 Ranking",
      guide: "Juristat 2019 Top Patent Firms",
      yearsRanked: "Top 10 Performance",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Firm Leadership",
        content:
          "Slater Matsil ranked sixth in Juristat's 2019 Top Patent Firms list for Semiconductors, Electrical and Optical Systems and Components.",
      },
      professionalMemberships: {
        heading: "Data-Driven Ranking",
        content:
          "The Juristat analysis evaluates the top 10 patent firms based on objective USPTO data, focusing on allowance rates, application volume, and prosecutorial efficiency.",
      },
      career: {
        heading: "Execution Excellence",
        content:
          "Our consistent appearance in the top 10 for the semiconductor sector underscores our long-term expertise and reliability in handling complex technology portfolios.",
      },
      personal: {
        heading: "Client Focus",
        content:
          "We leverage these high-efficiency strategies to provide our clients with a competitive advantage in securing their intellectual property assets.",
      },
    },
  },
  {
    slug: "patexia-firm-rankings-2019",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Patexia Overall #1",
      guide: "Patexia 2019 Intelligence Report",
      yearsRanked: "Ranked #1 and #10",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Top Honors",
        content:
          "Patexia named Slater Matsil the Best Performing Patent Firm Overall in 2019. The firm also achieved the #10 rank among the top 100 Most Active Law Firms in High Tech.",
      },
      professionalMemberships: {
        heading: "Ranking Methodology",
        content:
          "Patexia's independent analysis evaluated over 1,000 law firms based on a weighted formula of success, efficiency, and activity scores from 2015 to 2019.",
      },
      career: {
        heading: "Benchmarking Success",
        content:
          "Achieving the #1 spot for performance is a testament to the skill and dedication of our attorneys and staff in delivering the best possible outcomes for all our clients.",
      },
      personal: {
        heading: "Market Presence",
        content:
          "Our top 10 ranking in high-tech activity further demonstrates our significant role as a trusted partner for innovators in the technology sector.",
      },
    },
  },
  {
    slug: "juristat-top-100-firms-2018",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat #3 Ranking",
      guide: "Juristat 2018 Top 100",
      yearsRanked: "Nationwide Top Performance",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Nationwide Ranking",
        content:
          "Slater Matsil ranked third in Juristat's 2018 Top 100 Patent Firms list, placing us among the elite firms practicing before the USPTO.",
      },
      professionalMemberships: {
        heading: "Performance Criteria",
        content:
          "Juristat rankings are based on four key metrics: total applications filed, allowance rate, average number of office actions to allowance, and average time to allowance.",
      },
      career: {
        heading: "Strategic Advantage",
        content:
          "Ranking 3rd in the nation highlights our ability to secure patents quickly and effectively, significantly reducing the cost and time-to-market for our clients' innovations.",
      },
      personal: {
        heading: "Operational Excellence",
        content:
          "Our focus on high-quality drafting and proactive prosecution allows us to maintain these industry-leading performance scores year after year.",
      },
    },
  },
  {
    slug: "patent-quality-article-2018",
    hero: {
      name: "Ira Matsil & Srini Chakravarthi",
      band: "Thought Leadership",
      guide: "IAM Yearbook 2018",
      yearsRanked: "Featured Article",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira S. Matsil and Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "Market Strategy",
        content:
          "In the article 'A renewed focus on patent quality – implications for patent owners,' Ira Matsil and Srini Chakravarthi argue that a high-quality portfolio must meet owners' objectives even as laws and technology change.",
      },
      professionalMemberships: {
        heading: "Defining Quality",
        content:
          "The authors emphasize that quality is not just about technical validity, but about strategic relevance and the ability to retain value across shifting business constraints and legal landscapes.",
      },
      career: {
        heading: "Publication Detail",
        content:
          "This article first appeared in the IAM Yearbook 2018, a supplement to IAM, published by Globe Business Media Group's IP Division. It serves as a guide for patent owners looking to optimize their assets.",
      },
      personal: {
        heading: "Strategic Counsel",
        content:
          "For a deeper look into the philosophies that drive our firm's approach to patent drafting and strategy, we invite you to explore this featured insight.",
      },
    },
  },
  {
    slug: "corporate-vision-best-procurement-2016",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Corporate Vision Winner",
      guide: "2016 Mid-Market Achievement Awards",
      yearsRanked: "Best in Patent Procurement",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Award Recognition",
        content:
          "Corporate Vision named Slater Matsil, LLP as the winner of 'Best in Patent Procurement 2016 - Southern USA' in their Mid-Market Achievement Awards.",
      },
      professionalMemberships: {
        heading: "Quality-Focused Research",
        content:
          "Winners were selected by a dedicated in-house research team at Corporate Vision, who focused on quality of service rather than just sector size or reputation.",
      },
      career: {
        heading: "Independent Merit",
        content:
          "The awards program ensures that all recipients are chosen based truly on their achievements and the caliber of their technical legal work.",
      },
      personal: {
        heading: "Regional Leader",
        content:
          "This recognition highlights Slater Matsil's standing as a premier intellectual property firm in the Southern United States, serving clients with excellence across all technology sectors.",
      },
    },
  },
  {
    slug: "ocean-tomo-top-quality-rankings-2016",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Ocean Tomo #1 Ranking",
      guide: "IAM/Ocean Tomo Quality Ratings",
      yearsRanked: "Ranked First in IT and Overall",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Quality Ratings",
        content:
          "Ocean Tomo ranked Slater Matsil first in both Information Technology and Overall across all industries in the 2016 Top 10 Patent Law Firm rankings.",
      },
      professionalMemberships: {
        heading: "Grant Excellence",
        content:
          "These ratings reveal which law firms secure the highest quality patent grants from the USPTO, assessing the structural and strategic strength of the issued claims.",
      },
      career: {
        heading: "Industry Gold Standard",
        content:
          "The article, published in Intellectual Asset Management (IAM) Magazine, uses data-driven modeling to identify firms that produce the most valuable and defensible IP assets.",
      },
      personal: {
        heading: "Strategic Partnership",
        content:
          "Securing the #1 spot in the IT sector confirms our firm's technical leadership and its ability to deliver superior results in one of the most competitive fields of patent law.",
      },
    },
  },
  {
    slug: "juristat-top-100-rankings-2017",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat #2 Ranking",
      guide: "Juristat 2017 Top 100",
      yearsRanked: "Nationwide Top Performance",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Elite Performance",
        content:
          "Slater Matsil ranked second in Juristat's 2017 Top 100 Patent Firms list, demonstrating sustained excellence in our prosecution practices.",
      },
      professionalMemberships: {
        heading: "Metric Leadership",
        content:
          "Rankings were derived from an analysis of USPTO data, measuring application volume, allowance rates, office action efficiency, and overall speed to grant.",
      },
      career: {
        heading: "Execution Reliability",
        content:
          "By ranking second in the nation, Slater Matsil has proven to be a reliable and highly efficient choice for companies seeking to maximize the value of their patent filings.",
      },
      personal: {
        heading: "Proven Results",
        content:
          "Our data-backed performance reflects a firm-wide culture focused on technical precision and proactive communication with USPTO examiners.",
      },
    },
  },
  {
    slug: "juristat-growth-rate-rankings-2016",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Juristat High Growth",
      guide: "2016 Firm Growth Analysis",
      yearsRanked: "Ranked #2 Growth Rate",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Strategic Growth",
        content:
          "Slater Matsil was ranked by Juristat in 2016 as having the second highest growth rate among the nation's top patent firms.",
      },
      professionalMemberships: {
        heading: "Expansion Analysis",
        content:
          "Juristat calculated that the number of applications filed by Slater Matsil grew by an average of 78.1 applications per year, reflecting our rapidly expanding technical reach.",
      },
      career: {
        heading: "Technical Scaling",
        content:
          "This growth is a direct result of our ability to scale our high-quality prosecution model to meet the needs of some of the world's largest and most innovative companies.",
      },
      personal: {
        heading: "Leadership in Tech",
        content:
          "By maintaining quality while growing at such a fast pace, Slater Matsil has established itself as a go-to firm for high-volume, high-complexity technology work.",
      },
    },
  },
  {
    slug: "ocean-tomo-top-10-firm-2015",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Ocean Tomo Top 10",
      guide: "2015 Patent Quality Ratings",
      yearsRanked: "Featured Nationwide Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Quality Benchmarking",
        content:
          "Ocean Tomo ranked Slater Matsil as a 2015 Top 10 Patent Law Firm in the U.S., based on the structural quality of the patents we secured for our clients.",
      },
      professionalMemberships: {
        heading: "Grant Analytics",
        content:
          "The ratings reveal which firms secure the highest quality grants from the USPTO, ensuring that the resulting patents are robust, defensible, and strategically valuable.",
      },
      career: {
        heading: "Industry Recognition",
        content:
          "Being featured in the Ocean Tomo quality ratings confirms that our drafting standards consistently produce elite-level intellectual property assets.",
      },
      personal: {
        heading: "Performance Value",
        content:
          "Our repeat appearances in these quality-focused rankings demonstrate our firm's long-term commitment to excellence in the patent prosecution field.",
      },
    },
  },
  {
    slug: "go-to-law-firm-2013",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Go-To Law Firm",
      guide: "In-House Law Departments Guide",
      yearsRanked: "Fortune 500 Trusted",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Corporate Trust",
        content:
          "Slater Matsil was recognized as a 2013 Go-To Law Firm for Patent Prosecution in a specialized guide distributed to the in-house legal departments of Fortune 500 companies.",
      },
      professionalMemberships: {
        heading: "Featured Excellence",
        content:
          "The list features firms that deliver exceptional work and have become trusted outside counsel for leading global enterprises.",
      },
      career: {
        heading: "Strategic Support",
        content:
          "Our inclusion in this guide reflects our reputation for providing the sophisticated, business-aligned legal support that large corporate legal departments demand.",
      },
      personal: {
        heading: "Proven Reliability",
        content:
          "Decades of partnership with Fortune 500 companies have made Slater Matsil a mainstay in the intellectual property procurement landscape.",
      },
    },
  },
  {
    slug: "ira-matsil-indefiniteness-presentation-2015",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "53rd Annual IP Law Program",
      yearsRanked: "Featured Speaker",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira S. Matsil",
      region: "USA",
      practiceAreas: {
        heading: "CLE Presentation",
        content:
          "Ira Matsil presented on 'Indefiniteness in Patent Claims – Definitely an Issue' at the 53rd Annual IP Law Program in Plano, Texas.",
      },
      professionalMemberships: {
        heading: "Claim Drafting Strategy",
        content:
          "The presentation explored the legal standards and practical challenges associated with claim indefiniteness, providing strategies for drafting clearer and more robust patent claims.",
      },
      career: {
        heading: "Thought Leadership",
        content:
          "Ira's deep involvement with CAILAW (The Center for American and International Law) underscores his role as a leading educator in the patent law community.",
      },
      personal: {
        heading: "Professional Depth",
        content:
          "For more information regarding Ira's specialized expertise in complex claim construction and prosecution, please view his full profile.",
      },
    },
  },
  {
    slug: "ira-matsil-session-moderator-2013",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "CAILAW Annual Program",
      yearsRanked: "Session Moderator (2008-2013)",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira S. Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Educational Leadership",
        content:
          "Ira Matsil served as the session moderator for the Patent Prosecution module at the Annual Intellectual Property Law Program for six consecutive years (2008-2013).",
      },
      professionalMemberships: {
        heading: "Industry Forum",
        content:
          "Hosted by The Center for American and International Law (CAILAW), these programs bring together the world's leading IP professionals to discuss trends and best practices.",
      },
      career: {
        heading: "Sustained Commitment",
        content:
          "Ira's multi-year term as moderator highlights his standing as a respected authority in the patent community and his commitment to professional development in the field.",
      },
      personal: {
        heading: "Strategic Counsel",
        content:
          "Ira leverages the insights gained from leading these high-level discussions to provide our clients with the most current and effective IP representation.",
      },
    },
  },
  {
    slug: "steven-slater-panelist-2011",
    hero: {
      name: "Steven Slater",
      band: "Slater Matsil Partner",
      guide: "49th Annual IP Law Program",
      yearsRanked: "Expert Panelist",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Steven H. Slater",
      region: "USA",
      practiceAreas: {
        heading: "Expert Panel",
        content:
          "Steve Slater served as a panelist discussing the 'Impact of IP Licenses on Third Parties' at the 49th Annual Intellectual Property Law Program.",
      },
      professionalMemberships: {
        heading: "CAILAW Contribution",
        content:
          "The program, held at The Center for American and International Law, focused on complex licensing scenarios and the far-reaching implications of intellectual property agreements.",
      },
      career: {
        heading: "Licensing Expertise",
        content:
          "Steve's participation as an expert panelist emphasizes his deep experience in navigating the business and legal complexities of technology licensing and asset management.",
      },
      personal: {
        heading: "Client Advocacy",
        content:
          "This level of expertise allows Steve to provide our clients with strategic licensing advice that protects their interests while maximizing their commercial opportunities.",
      },
    },
  },
  {
    slug: "steven-slater-dba-panelist-2011",
    hero: {
      name: "Steven Slater",
      band: "Slater Matsil Partner",
      guide: "DBA IP Section Meeting",
      yearsRanked: "Featured Panelist",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Steven H. Slater",
      region: "USA",
      practiceAreas: {
        heading: "Local Bar Leadership",
        content:
          "Steve Slater served as a panelist discussing 'IP Agreement Terms and Conditions' at a meeting of the Dallas Bar Association Intellectual Property Section.",
      },
      professionalMemberships: {
        heading: "Practice Insights",
        content:
          "The session provided practical tips and legal analysis for drafting enforceable and effective IP agreements, focusing on common pitfalls and emerging trends.",
      },
      career: {
        heading: "Community Engagement",
        content:
          "Steve's active involvement in the Dallas IP community ensures that Slater Matsil remains at the forefront of local legal developments and best practices.",
      },
      personal: {
        heading: "Professional Service",
        content:
          "To learn more about Steve's extensive background in IP agreement negotiation and drafting, please visit his Professionals profile.",
      },
    },
  },
  {
    slug: "ira-matsil-state-bar-panelist-2010",
    hero: {
      name: "Ira Matsil",
      band: "Slater Matsil Partner",
      guide: "State Bar of Texas Annual Meeting (June 2010)",
      yearsRanked: "Featured Panelist",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira S. Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Statewide Leadership",
        content:
          "Ira was a panelist discussing 'Method Patents in view of In re Bilski' at the State Bar of Texas Annual Meeting in June 2010.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "Foresight & Continuity",
        content:
          "This was a follow-up to his earlier presentation discussing 'Software Patents in view of In re Bilski' at the 2009 State Bar of Texas Annual Meeting.",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "ocean-tomo-top-10-firm-2014",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Ocean Tomo Top 10",
      guide: "2014 Patent Quality Ratings",
      yearsRanked: "Featured Nationwide Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Sustained Quality",
        content:
          "Ocean Tomo ranked Slater Matsil as a 2014 Top 10 Patent Law Firm in the U.S. based on structural patent quality ratings.",
      },
      professionalMemberships: {
        heading: "Industry Recognition",
        content:
          "The published data confirmed that patents secured by Slater Matsil for its clients are among the highest quality in terms of strategic value and structural integrity.",
      },
      career: {
        heading: "Execution Standard",
        content:
          "This recognition reinforces our firm's reputation for producing superior work product that stands up to the most rigorous industry benchmarks.",
      },
      personal: {
        heading: "Proven Performance",
        content:
          "Our long history of appearing in the top 10 for patent quality reflects the deep engineering and legal talent that defines Slater Matsil.",
      },
    },
  },
  {
    slug: "european-patent-office-info",
    hero: {
      name: "The European Patent Office (EPO)",
      band: "Global Intellectual Property",
      guide: "International IP Resource",
      yearsRanked: "European Patent System",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "The European Patent Office (EPO)",
      region: "USA",
      practiceAreas: {
        heading: "Mission",
        content:
          "The EPO offers inventors a uniform application procedure which enables them to seek patent protection in up to 40 European countries.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "aipla-info",
    hero: {
      name: "American Intellectual Property Law Association (AIPLA)",
      band: "Professional Association",
      guide: "IP Advocacy & Education",
      yearsRanked: "Leading IP Organization",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName:
        "American Intellectual Property Law Association (AIPLA)",
      region: "USA",
      practiceAreas: {
        heading: "Representation",
        content:
          "The AIPLA represents a wide and diverse spectrum of individuals from law firms, companies, and institutions involved directly or indirectly in the practice of patent, trademark, copyright, trade secret, and unfair competition law, as well as other fields of law affecting intellectual property.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "inta-info",
    hero: {
      name: "The International Trademark Association (INTA)",
      band: "Global Association",
      guide: "Trademark Protection",
      yearsRanked: "Trademark Professionals",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "The International Trademark Association (INTA)",
      region: "USA",
      practiceAreas: {
        heading: "Global Forum",
        content:
          "The INTA is the global association of trademark owners and professionals dedicated to supporting trademarks and related intellectual property in order to protect consumers and to promote fair and effective commerce.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "cnipa-info",
    hero: {
      name: "China National Intellectual Property Administration (CNIPA)",
      band: "State Administration",
      guide: "International IP Resource",
      yearsRanked: "China Patent System",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName:
        "China National Intellectual Property Administration (CNIPA)",
      region: "USA",
      practiceAreas: {
        heading: "Responsibility",
        content:
          "The CNIPA is responsible for patent work and comprehensive coordination of foreign-related affairs in the field of intellectual property.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "wipo-info",
    hero: {
      name: "World Intellectual Property Organization (WIPO)",
      band: "International Organization",
      guide: "Global IP Services",
      yearsRanked: "UN Specialized Agency",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "World Intellectual Property Organization (WIPO)",
      region: "USA",
      practiceAreas: {
        heading: "Global Forum",
        content:
          "WIPO is the global forum for intellectual property services, policy, information and cooperation.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "uspto-info",
    hero: {
      name: "United States Patent & Trademark Office (USPTO)",
      band: "Federal Agency",
      guide: "U.S. IP Resource",
      yearsRanked: "The Gold Standard",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "United States Patent & Trademark Office (USPTO)",
      region: "USA",
      practiceAreas: {
        heading: "Mission",
        content:
          "The USPTO is the federal agency for granting U.S. patents and registering trademarks.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "jpo-info",
    hero: {
      name: "The Japanese Patent Office (JPO)",
      band: "National Office",
      guide: "International IP Resource",
      yearsRanked: "Japan Patent System",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "The Japanese Patent Office (JPO)",
      region: "USA",
      practiceAreas: {
        heading: "Design and Utility",
        content:
          "The JPO is designed to protect intellectual creations, such as inventions, designs and trademarks, to ensure their effective use, and to contribute to industrial development.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "cipo-info",
    hero: {
      name: "The Canadian Intellectual Property Office (CIPO)",
      band: "Government Agency",
      guide: "International IP Resource",
      yearsRanked: "Canada Patent System",
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "",
      aboutProvidedByName: "The Canadian Intellectual Property Office (CIPO)",
      region: "USA",
      practiceAreas: {
        heading: "Administration",
        content:
          "The CIPO is associated with innovation, science and economic development, and is responsible for the administration and processing of intellectual property in Canada.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "iam-patent-1000-rankings-2023",
    hero: {
      name: "Slater Matsil, LLP",
      band: "IAM Patent 1000 Rankings",
      guide: "Individual and Firm Recognition",
      yearsRanked: "2023 Edition",
      badgeImage: stevenBadge,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Firm Ranking",
        content:
          "Slater Matsil was ranked as a firm by the 2023 IAM Patent 1000 rankings, recognizing its consistent performance in the field of patent law.",
      },
      professionalMemberships: {
        heading: "Individual Recognitions",
        content:
          "Steven Slater, Ira Matsil, Srini Chakravarthi, Benjamin Nise, and Michael Kucher were recognized individually for their outstanding contributions to intellectual property law.",
      },
      career: {
        heading: "Strategic Growth",
        content:
          "The continued inclusion of multiple Slater Matsil attorneys in the IAM Patent 1000 highlights the firm's depth of expertise across a broad range of technologies.",
      },
      personal: {
        heading: "Client Service",
        content:
          "Our attorneys are committed to providing the highest level of service and strategic insight to help our clients manage and monetize their IP assets.",
      },
    },
  },
  {
    slug: "ira-matsil-chambers-usa-2021-2023",
    hero: {
      name: "Ira Matsil",
      band: "Chambers USA Ranked Attorney",
      guide: "Intellectual Property – Texas",
      yearsRanked: "2021 – 2023",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Recognition",
        content:
          "Ira Matsil was ranked in Intellectual Property by Chambers USA from 2021 to 2023. Chambers ranks lawyers based on extensive third-party research with clients, peers, and industry leaders.",
      },
      professionalMemberships: {
        heading: "Consistent Excellence",
        content:
          "This is the third year in a row Ira has been ranked. An industry leader was quoted as saying, 'I would rate Ira’s client service and general level of service, level of sophistication and commercial awareness and vision as all very strong.'",
      },
      career: {
        heading: "Strategic Advocacy",
        content:
          "Ira represents leading domestic and international technology companies in the complex technical aspects of patent portfolio management and strategy.",
      },
      personal: {
        heading: "Professional Qualities",
        content:
          "Ranking criteria include technical legal ability, professional conduct, client service, commercial astuteness, diligence, commitment, and other qualities most valued by legal clients.",
      },
    },
  },
  {
    slug: "srini-chakravarthi-chambers-usa-2023",
    hero: {
      name: "Srini Chakravarthi",
      band: "Chambers USA Ranked Attorney",
      guide: "Intellectual Property – Texas",
      yearsRanked: "2023 Edition",
      profileImage: srini,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "Ranking",
        content:
          "Srini Chakravarthi was ranked in Intellectual Property by Chambers USA 2023, reflecting his reputation among clients and peers alike.",
      },
      professionalMemberships: {
        heading: "Market Leadership",
        content:
          "A recognized market leader was quoted as saying, 'Srini is the key point of contact for managing the work entrusted by our team. He excels with the extraordinary service his leadership provides to our team.'",
      },
      career: {
        heading: "Technical Focus",
        content:
          "Srini leads a practice group that routinely works with a wide range of complex technologies, including semiconductor technology, mixed-signal and analog circuits, signal and image processing, networking and communications.",
      },
      personal: {
        heading: "Professional Dedication",
        content:
          "His dedication to client service and commercial astuteness continues to drive successful outcomes for the firm's global technology clients.",
      },
    },
  },
  {
    slug: "ira-matsil-best-lawyers-2024",
    hero: {
      name: "Ira Matsil",
      band: "Best Lawyers in America ®",
      guide: "Litigation - Patent",
      yearsRanked: "2024 Edition",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Ira Matsil",
      region: "USA",
      practiceAreas: {
        heading: "Recognition",
        content:
          "Ira Matsil was included in the 2024 edition of the Best Lawyers in America ® for Litigation - Patent in Dallas, Texas.",
      },
      professionalMemberships: {
        heading: "Peer Review",
        content:
          "Best Lawyers is based on a rigorous peer-review survey, highlighting the consensus of leading lawyers about the professional abilities of their colleagues.",
      },
      career: {
        heading: "Litigation Support",
        content:
          "Ira's deep technical background and years of patent prosecution experience provide a critical advantage in supporting complex patent litigation matters.",
      },
      personal: {
        heading: "Established Reputation",
        content:
          "His inclusion in this prestigious list reflects a long-standing reputation for professional excellence in the intellectual property legal community.",
      },
    },
  },
  {
    slug: "slater-matsil-lawyers-present-at-dallas-bar",
    hero: {
      name: "Slater Matsil Lawyers Present at Dallas Bar",
      band: "CLE Presentation",
      guide: "Dallas Bar IP Section",
      yearsRanked: "July 24, 2025",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Presented by",
      aboutProvidedByName: "Ira Matsil and Jonathan Ward",
      region: "USA",
      practiceAreas: {
        heading: "CLE Presentation",
        content:
          "Ira Matsil and Jonathan Ward presented a CLE at the Dallas Bar IP Section on “Federal Circuit Year in Review: Landmark Decisions Across Patents, Trademarks, and Copyrights,” July 24, 2025.",
      },
      professionalMemberships: {
        heading: "",
        content: "",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "srini-chakravarthi-organizes-cle-session",
    hero: {
      name: "Srini Chakravarthi Moderates CLE Session",
      band: "CLE Presentation",
      guide: "Dallas Bar Association",
      yearsRanked: "October 24, 2024",
      profileImage: srini,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Moderated by",
      aboutProvidedByName: "Srini Chakravarthi",
      region: "USA",
      practiceAreas: {
        heading: "CLE Discussion",
        content:
          "On October 24, 2024, Srini Chakravarthi took part in the Dallas Bar Association’s CLE meeting by moderating a session on IP and Ethics.",
      },
      professionalMemberships: {
        heading: "Strategic IP Insights",
        content:
          "The session provided critical updates and ethical considerations for intellectual property practitioners, focusing on navigating complex legal landscapes while maintaining the highest professional standards.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "slater-matsil-ranked-15th-for-most-us-utility-patents-issues-in-2025",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Firm Ranking",
      guide: "Harrity Analytics 2025",
      yearsRanked: "15th Nationwide",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "National Recognition",
        content:
          "The Harrity Analytics Team compiled an annual list of top patent law firms, ranked based on total number of utility patents, and placed Slater Matsil as 15th for most U.S. utility patents issued in 2025.",
      },
      professionalMemberships: {
        heading: "Data-Driven Excellence",
        content:
          "This ranking underscores the firm's significant volume and efficiency in securing high-value utility patents for world-class technology companies.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "slater-matsil-attorneys-ranked-by-patexia",
    hero: {
      name: "Top Performing Attorneys",
      band: "Attorney Rankings",
      guide: "Patexia 2025",
      yearsRanked: "Best Performing Attorneys",
      profileImage: roger,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Individual Excellence",
        content:
          "Patexia ranked Roger Knapp #1 in Best Performing Attorneys in High-Tech in 2025. Ruojian Zhang was ranked #4 and Roger Knapp was ranked #5 in Best Performing Attorneys Overall for the same time period.",
      },
      professionalMemberships: {
        heading: "Firm-Wide Leadership",
        content:
          "Also, in 2025 Ira Matsil, Brian Mair and Stephen Cortiaus ranked in both the Top 100 Best Performing Attorneys Overall and the Best Performing Attorneys in High-Tech in 2025.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "patexia-ranked-roger-knapp-2025-rankings",
    hero: {
      name: "Roger Knapp & Ruojian Zhang",
      band: "Attorney Rankings",
      guide: "Patexia 2025",
      yearsRanked: "#1 Best Performing in High-Tech",
      profileImage: roger,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "National Recognition",
        content:
          "Patexia ranked Roger Knapp #1 in Best Performing Attorneys in High-Tech in 2025. Ruojian Zhang was ranked #4 and Roger Knapp was ranked #5 in Best Performing Attorneys Overall for the same time period.",
      },
      professionalMemberships: {
        heading: "Broader Impact",
        content:
          "Also, in 2025 Ira Matsil, Brian Mair and Stephen Cortiaus ranked in both the Top 100 Best Performing Attorneys Overall and the Best Performing Attorneys in High-Tech in 2025.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "patexia-ranked-matsil-mair-cortiaus-2025",
    hero: {
      name: "Ira Matsil, Brian Mair & Stephen Cortiaus",
      band: "Attorney Rankings",
      guide: "Patexia 2025",
      yearsRanked: "Top 100 Best Performing",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Individual Excellence",
        content:
          "In 2025 Ira Matsil, Brian Mair and Stephen Cortiaus ranked in both the Top 100 Best Performing Attorneys Overall and the Best Performing Attorneys in High-Tech in 2025.",
      },
      professionalMemberships: {
        heading: "Depth of Expertise",
        content:
          "In addition to these achievements, Patexia ranked Roger Knapp #1 in Best Performing Attorneys in High-Tech and #5 Overall, with Ruojian Zhang ranking #4 Overall.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "patexia-ranked-slater-matsil-2025-rankings",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Firm Performance Ranking",
      guide: "Patexia Intelligence 2025",
      yearsRanked: "Best Performing Law Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Global Performance Leader",
        content:
          "Patexia ranked Slater Matsil #2 in Best Performing Law Firms Overall, #5 in the Overall Best Performing Law Firms in High-Tech Sector and #11 in Most Active Law Firms in High Tech in 2025.",
      },
      professionalMemberships: {
        heading: "Assessment Methodology",
        content:
          "The published ratings assessed and ranked the top 2,000 law firms based on performance and activity scores. Rankings of the top 100 firms were also compiled in each category.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "slater-matsil-recognized-as-highly-recommended",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Firm Recognition",
      guide: "IAM Patent 1000",
      yearsRanked: "Highly Recommended Prosecution Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Prosecution Excellence",
        content:
          "Slater Matsil has been recognized as a 'highly recommended' Prosecution Firm by the IAM Patent 1000 Rankings, reflecting the firm's consistent quality and technical leadership in the field.",
      },
      professionalMemberships: {
        heading: "Editorial Insight",
        content:
          "“…Their profound technical knowledge, particularly in the mechanical field, allows them to grasp the nuances of inventions and craft tailored, comprehensive patent strategies.”",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
  {
    slug: "patexia-ranked-slater-matsil-2-in-best-performing-law-firms-overall",
    hero: {
      name: "Slater Matsil, LLP",
      band: "Firm Performance Ranking",
      guide: "Patexia Intelligence 2025",
      yearsRanked: "Best Performing Law Firm",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: {
      aboutProvidedBy: "Provided by",
      aboutProvidedByName: "Slater Matsil, LLP",
      region: "USA",
      practiceAreas: {
        heading: "Global Performance Leader",
        content:
          "Patexia ranked Slater Matsil #2 in Best Performing Law Firms Overall, #5 in the Overall Best Performing Law Firms in High-Tech Sector and #11 in Most Active Law Firms in High Tech in 2025.",
      },
      professionalMemberships: {
        heading: "Assessment Methodology",
        content:
          "The published ratings assessed and ranked the top 2,000 law firms based on performance and activity scores. Rankings of the top 100 firms were also compiled in each category.",
      },
      career: {
        heading: "",
        content: "",
      },
      personal: {
        heading: "",
        content: "",
      },
    },
  },
];
