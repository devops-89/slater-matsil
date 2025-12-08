import { ButtonProps, SvgIconProps } from "@mui/material";
import { StaticImageData } from "next/image";
import { PRACTICE_GROUP_TAB_DATA } from "./enum";

export interface HOMEPAGE_DATA_PROPS {
  title: string;
  homepage: {
    heroSection: HERO_SECTION_PROPS;
    aboutSection: aboutSectionProps;
    our_metrics: MetricSectionProps;
    service_area: SERVICES_AREA_PROPS;
    who_we_serve: WHO_WE_SERVE_SECTION_PROPS;
    insights_section: INSIGHTS_SECTION_PROPS;
    footerData: footer_data;
  };
  aboutPage: {
    heroSection: ABOUT_US_HEROSECTION;
    drivingInnovationEverywhere: ABOUT_US_SLATER;
    REDEFINING_PATENT_SUCCESS: REDEFINING_PATENT_SUCCESS_PROPS;
    innovationInsights: ABOUT_INNOVATION_INSIGHTS_PROPS;
    AWARDSPROPS: AWARDS_ABOUT_PROPS;
    industriesWeServe: INDUSTRIES_WE_SERVE_PROPS;
    who_we_serve_props: INDUSTRIES_WE_SERVE_PROPS;
  };
  firm_professionals: {
    professionals_hero_section: PROFESSIONALS_HEROSECTION_PROPS;
    PROFESSIONAL_LIST_PROPS: PROFESSIONALS_CARD_PROPS[];
  };
  careerPage: {
    career_hero_section: CAREER_HERO_SECTION_PROPS;
    career_work_with_us: CAREER_WORK_WITH_US_PROPS;
    career_open_roles: OPEN_ROLES_PROPS;
  };

  practiceGroupPage: {
    practiceGroup_hero_section: PRACTICE_GROUPS_HEROSECTION_PROPS;
    practiceGroup_section: PRACTICE_GROUPS_SECTION_PROPS;
  };
}

export interface PROFESSIONAL_DETAILS_PROPS {
  slug: string;
  professionals_Details_HeroSection: PROFESSIONAL_DETAILS_HERO_PROPS;
  PROFESSIONAL_BIO_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_EDUCATION_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_ADMISSIONS_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_ARTICLES_DATA: PROFESSIONAL_BIO_PROPS[];
}

interface ABOUT_US_HEROSECTION {
  sectionTitle: string;
  heading: string;
  description: string;
  img: StaticImageData;
}

interface HERO_SECTION_PROPS {
  heading: string;
  subHeading: string;
  videoHeading: {
    title: string;
    subTitle: string;
  };
}

interface ABOUT_INNOVATION_INSIGHTS_PROPS {
  heading: string;
  description: string;
}

interface aboutSectionProps {
  sectionTitle: string;
  heading: string;
  description: string;
  ctaButton: {
    text: string;
    link?: string;
  };
  experience: {
    years: string;
    title: string;
    subTitle: string;
  };
}

interface ABOUT_US_SLATER {
  heading: string;
  description: string;
  img: StaticImageData;
}

interface REDEFINING_PATENT_SUCCESS_PROPS {
  heading1: string;
  heading2: string;
  description: string;
  metrics_data: METRICSPROPS[];
}

export interface METRICSPROPS {
  title: string;
  count: string;
}

interface MetricSectionProps {
  sectionTitle: string;
  heading: {
    title: string;
    subTitle: string;
  };
  description: string;

  ctaButton: string;
  metricsData: METRICSPROPS[];
}

interface CTA_BUTTON_PROPS {
  text?: string;
  href?: string;
}
interface WHO_WE_SERVE_SECTION_PROPS {
  leftSection: {
    heroImage: string;
    small_logo: StaticImageData;
    startingYear: string;
    servicesLabel: string;
    big_logo: StaticImageData;
  };
  rightSection: {
    heading: string;
    description: string;
    section_data: { label: string }[];
    ctaButton: CTA_BUTTON_PROPS;
    endline: string;
    bgImage: string;
  };
}

export interface SOCIAL_LINKS_PROPS {
  icon: React.ElementType<SvgIconProps>;
  href?: string;
}

interface footer_data {
  footer_links: FOOTER_LIST_DATA[];
  social_links: SOCIAL_LINKS_PROPS[];
  privacy_pages: { title: string; href?: string }[];
  logo: StaticImageData;
  copyRightText: string;
  contactData: FOOTER_CONTACT_DATA;
}

interface FOOTER_CONTACT_DATA {
  email: string;
  phoneNumber: string;
  address: string;
}

export interface SERVICES_AREAS_DATA {
  img: StaticImageData | string;
  title: string;
  description: string;
  serialNumber: string;
}

interface SERVICES_AREA_PROPS {
  sectionTitle: string;
  heading: string;
  img: StaticImageData;
  section_Data: SERVICES_AREAS_DATA[];
}

export interface INSIGHTS_CARD_DATA {
  heading: string;
  category: CTA_BUTTON_PROPS;
  ctaButton: CTA_BUTTON_PROPS;
}
interface INSIGHTS_SECTION_PROPS {
  sectionTitle: string;
  heading: string;
  description: string;
  insights_data: INSIGHTS_CARD_DATA[];
}

export interface FOOTER_LIST_DATA {
  HEADING: string;
  DATA?: CTA_BUTTON_PROPS[];
}

interface AWARDS_ABOUT_PROPS {
  img: StaticImageData;
  heading1: string;
  heading2: string;
  awards_img: { img: StaticImageData }[];
}

export interface DATA_LIST_PROPS {
  dataList: { label: string }[];
}
interface INDUSTRIES_WE_SERVE_PROPS {
  heading1: string;
  heading2: string;
  description: string;
  section_data: DATA_LIST_PROPS[];
}

interface PROFESSIONALS_HEROSECTION_PROPS {
  heading: string;
  description1: string;
  descriptions: { label: string }[];
  img: StaticImageData;
}

export interface PROFESSIONALS_CARD_PROPS {
  img: StaticImageData;
  name: string;
  designation: string;
  slug: string;
}

export interface PROFESSIONAL_DETAILS_HERO_PROPS {
  img: StaticImageData;
  name: string;
  email: string;
  phoneNumber: string;

  vCardData: PROFESSIONAL_VCARD_PROPS;
}

export interface PROFESSIONAL_VCARD_PROPS {
  name: string;
  formattedName: string;
  electronicMail: string;
  telephoneNumber: string;
  organization: string;
  job_title: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryRegion: string;
  };
  url: string;
  firstName: string;
  lastName: string;
}

export interface PROFESSIONAL_BIO_PROPS {
  description?: string;
  list?: { label: string }[];
}

export interface WORK_LIST_PROPS {
  title: string;
}

interface CAREER_HERO_SECTION_PROPS {
  title: string;
  description: string;
  bgImage: string;
  heroImage: StaticImageData;
  shortDescription: string;
  ctaButton1: CTA_BUTTON_PROPS;
  ctaButton2: CTA_BUTTON_PROPS;
}

interface CAREER_WORK_WITH_US_PROPS {
  firstTitle: string;
  secondTitle: string;
  shortDescription: string;
  work_list_data: WORK_LIST_PROPS[];
  section_img: StaticImageData;
}

interface open_roles_data {
  title?: string;
  description: string;
}

interface OPEN_ROLES_PROPS {
  title: string;
  shortDescription: string;
  description: string;
  tabSectionData: {
    tabData: { title: string }[];
    tabContentData: {
      tab_attorney_content_Data: {
        data1: open_roles_data;
        data2: open_roles_data;
        data3: open_roles_data;
      };
      tab_technical_advisor: {
        data1: open_roles_data;
        data2: open_roles_data;
        data3: open_roles_data;
      };
    };
  };
  description2: string;
}

// practice groups

interface PRACTICE_GROUPS_HEROSECTION_PROPS {
  title: string;
  heading: string;
  description1: string;
  firstHeroImage: StaticImageData;
  secondHeroImage: StaticImageData;
  thirdHeroImage: StaticImageData;
  description2: string;
}

interface PRACTICE_GROUPS_SECTION_PROPS {
  tabData: {
    title: PRACTICE_GROUP_TAB_DATA;
    description1: string;
    description2: string;
  }[];
}
