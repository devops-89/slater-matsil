import { INSIGHTS_DETAIL_PROPS } from "@/utils/types";
import steven from "@/professionals/transparent/steven-slater.png";
import ira from "@/professionals/transparent/ira-matsil.png";
import john from "@/professionals/transparent/john-koetter.png";
import stevenBadge from "@/insights/Screenshot 2025-11-18 113225 1.png";
import srini from "@/professionals/transparent/srini.png";
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
];
