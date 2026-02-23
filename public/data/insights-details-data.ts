import { INSIGHTS_DETAIL_PROPS } from "@/utils/types";
import steven from "@/professionals/transparent/steven-slater.png";
import ira from "@/professionals/transparent/ira-matsil.png";
import john from "@/professionals/transparent/john-koetter.png";
import stevenBadge from "@/insights/Screenshot 2025-11-18 113225 1.png";

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
});

export const INSIGHTS_DETAILS_DATA: INSIGHTS_DETAIL_PROPS[] = [
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
      band: "Top Intellectual Property Attorney",
      guide: "USA Guide 2025",
      yearsRanked: "Multiple years ranked",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: baseSections("Ira Matsil"),
  },
  {
    slug: "ira-matsil-chambers-usa-2025-2",
    hero: {
      name: "Ira Matsil",
      band: "Top Intellectual Property Attorney",
      guide: "USA Guide 2025",
      yearsRanked: "Multiple years ranked",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: baseSections("Ira Matsil"),
  },
  {
    slug: "ira-matsil-best-lawyers-2026",
    hero: {
      name: "Ira Matsil",
      band: "Best Lawyers in America",
      guide: "U.S. News – Best Lawyers",
      yearsRanked: "Recognized 2021–2026",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: baseSections("Ira Matsil"),
  },
  {
    slug: "steven-slater-best-lawyers-2026",
    hero: {
      name: "Steven Slater",
      band: "Best Lawyers in America",
      guide: "U.S. News – Best Lawyers",
      yearsRanked: "Recognized 2020–2026",
      profileImage: steven,
    },
    contact: commonContact,
    contentSections: stevenSections(),
  },
  {
    slug: "ira-matsil-iam-strategy-300-2025",
    hero: {
      name: "Ira Matsil",
      band: "IAM Strategy 300 Global Leader",
      guide: "IAM Strategy 300 – 2025",
      yearsRanked: "Strategy 300 Global Leader",
      profileImage: ira,
    },
    contact: commonContact,
    contentSections: baseSections("Ira Matsil"),
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
];
