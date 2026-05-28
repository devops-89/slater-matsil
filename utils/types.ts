import {
  SvgIconProps,
  SxProps,
  Theme
} from "@mui/material";
import { StaticImageData } from "next/image";
import React from "react";
import { PRACTICE_GROUP_TAB_DATA, WHO_WE_SERVE_PAGE_TAB_DATA } from "./enum";

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
  firm_leadership: {
    heroTitle: string;
    missionIntro: string;
    missionQuote: {
      line1: string;
      line2: string;
    };
    partners: any[];
    patentAgents: any[];
    administration: any[];
  };
  careerPage: {
    career_hero_section: CAREER_HERO_SECTION_PROPS;
    career_work_with_us: CAREER_WORK_WITH_US_PROPS;
    career_open_roles: OPEN_ROLES_PROPS;
  };

  practiceGroupPage: {
    practiceGroup_hero_section: PRACTICE_GROUPS_HEROSECTION_PROPS;
    practiceGroup_section: PRACTICE_GROUPS_SECTION_PROPS;
    meetPractitioners: MEET_PRACTITIONERS_PROPS;
  };

  whoWeServePage: {
    whoWeServepageHeroSection: WHO_WE_SERVE_HERO_PROPS;
    whoWeServeAboutSection: WHO_WE_SERVE_ABOUT_PROPS;
    whoWeServeTabsSection: TABS_DATA_PROPS[];
    quote: QUOTE_CARD_DATA;
  };
  insightsPage: INSIGHTS_PAGE_DATA;
  subAdmins: SUB_ADMIN_PROPS[];
  contactPage: CONTACT_US_PAGE_DATA;
  servicesPage: SERVICES_PAGE_DATA;
  roles: ROLE_PROPS[];
  privacyPolicy?: LEGAL_PAGE_DATA;
  termsOfUse?: LEGAL_PAGE_DATA;
  disclaimer?: LEGAL_PAGE_DATA;
}

export interface PROFESSIONAL_DETAILS_PROPS {
  slug: string;
  professionals_Details_HeroSection: PROFESSIONAL_DETAILS_HERO_PROPS;
  PROFESSIONAL_BIO_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_EDUCATION_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_ADMISSIONS_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_ARTICLES_DATA: PROFESSIONAL_BIO_PROPS[];
  PROFESSIONAL_ASSOCIATIONS_DATA?: PROFESSIONAL_BIO_PROPS[];
}

export interface ABOUT_US_HEROSECTION {
  sectionTitle: string;
  heading: string;
  description: string;
  img: StaticImageData | string;
  videoUrl?: string;
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
  image?: any;
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
  description: {
    label: string;
  }[];
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
  description2?: string;

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
  img?: any;
  title: string;
  description: string;
  serialNumber: string;
  slug?: string;
  detailsData?: {
    description: string;
    dataList?: { label: string }[];
  }[];
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
  slug?: string;
}
interface INSIGHTS_SECTION_PROPS {
  sectionTitle: string;
  heading: string;
  // description: string;
  insights_data?: INSIGHTS_CARD_DATA[];
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
  listStyle?: "none" | "disc" | "decimal";
  list?: {
    label: string;
    href?: string;
    subList?: { label: string; href?: string }[];
  }[];
}

export interface WORK_LIST_PROPS {
  title: string;
}

interface CAREER_HERO_SECTION_PROPS {
  title: string;
  description: string;
  bgImage: string;
  heroImage: StaticImageData;
  carouselImages?: any[];
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

interface OPEN_ROLE_DATA_PROPS {
  title?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
}

interface OPEN_ROLES_PROPS {
  title: string;
  shortDescription: string;
  description: string;
  tabSectionData: {
    tabData: { title: string }[];
    tabContentData: {
      // tab_attorney_content_Data: {
      //   data1: open_roles_data;
      //   data2: open_roles_data;
      //   data3: open_roles_data;
      // };
      // tab_technical_advisor: {
      //   data1: open_roles_data;
      //   data2: open_roles_data;
      //   data3: open_roles_data;
      // };

      tab_attorney_content_Data: OPEN_ROLE_DATA_PROPS[];
      tab_technical_advisor: OPEN_ROLE_DATA_PROPS[];
    };
  };
  // description2: string;
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
    groupNumber?: string;
    title: PRACTICE_GROUP_TAB_DATA;
    description1: string;
    description2?: string;
    data?: { primary: string; secondary?: string; isHeader?: boolean }[];
  }[];
}

interface MEET_PRACTITIONERS_PROPS {
  title: string;
  data: { primary: string; secondary?: string; isHeader?: boolean }[];
}

//  Who we serve page
interface WHO_WE_SERVE_HERO_PROPS {
  title: string;
  heading1: string;
  spanHeading1: string;
  spanHeading2: string;
  img: StaticImageData;
}

interface WHO_WE_SERVE_ABOUT_PROPS {
  leftSideDescription: string;
  img: StaticImageData;
  rightSideDescription: string;
  quoteCardData: QUOTE_CARD_DATA;
}

export interface QUOTE_CARD_DATA {
  quote: string;
  author: string;
}
export interface TABS_DATA_PROPS {
  title: WHO_WE_SERVE_PAGE_TAB_DATA;
  bigDescription: string;
  quote: string;
  data: { description: string }[];
  author?: string;
  quoteCardData?: QUOTE_CARD_DATA;
}

export interface TAB_CARD_DATA_PROPS {
  bigDescription: string;
  quote?: string;
  data: { description: string }[];
  quoteCardData?: QUOTE_CARD_DATA;
}

export interface TAB_SWITCHING_PROPS {
  data: { title: string }[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  sx?: SxProps<Theme>;
}

export interface BLOG_UPCOMING_ITEM {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  img: StaticImageData;
  bg: string;
  slug: string;
}

export interface BLOG_PAST_WEBINAR_ITEM {
  id: number;
  date: string;
  readTime: string;
  title: string;
  description: string;
  img: StaticImageData;
  slug: string;
}

export interface INSIGHTS_PAGE_DATA {
  heroSectionData: {
    heading: string;
    subHeading: string;
    img: string;
  };
  tab_data: {
    title: string;
  }[];
  quickLinks: {
    title: string;
    data: QUICK_LINKS_CARD_PROPS[];
  };
  insightsData: INSIGHTS_DATA_PROPS[];
  insightsDetailsData?: INSIGHTS_DETAIL_PROPS[];
  blogSection?: {
    upcomingTitle: string;
    watchPastTitle: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    upcoming: BLOG_UPCOMING_ITEM[];
    pastWebinars: BLOG_PAST_WEBINAR_ITEM[];
  };
  blogDetailsData?: BLOG_DETAIL_PROPS[];
}

export interface QUICK_LINKS_CARD_PROPS {
  title: string;
  img: StaticImageData;
  href?: string;
  description?: string;
}

export interface INSIGHTS_DATA_PROPS {
  title: string;
  bgColor: string;
  category?: string;
  slug?: string;
}

export interface INSIGHT_DETAIL_HERO_PROPS {
  name: string;
  band: string;
  guide: string;
  yearsRanked: string;
  profileImage?: StaticImageData;
  badgeImage?: StaticImageData;
}

export interface INSIGHT_CONTACT_ITEM_PROPS {
  label: string;
  value: string;
  href?: string;
}

export interface INSIGHT_CONTENT_SECTION_PROPS {
  heading: string;
  content: string;
}

export interface INSIGHTS_DETAIL_PROPS {
  slug: string;
  hero: INSIGHT_DETAIL_HERO_PROPS;
  contact: {
    firm: string;
    firmUrl: string;
    email: string;
    phone: string;
    shareLabel: string;
  };
  contentSections: {
    aboutProvidedBy: string;
    aboutProvidedByName: string;
    region: string;
    practiceAreas: INSIGHT_CONTENT_SECTION_PROPS;
    professionalMemberships: INSIGHT_CONTENT_SECTION_PROPS;
    career: INSIGHT_CONTENT_SECTION_PROPS;
    personal: INSIGHT_CONTENT_SECTION_PROPS;
    chambersReview?: INSIGHT_CONTENT_SECTION_PROPS;
    strengths?: INSIGHT_CONTENT_SECTION_PROPS;
  };
}

export interface CONTACT_US_PAGE_DATA {
  hero_section_data: {
    heading: string;
    description: string;
    img: StaticImageData;
  };
  form_section: {
    heading1: string;
    heading2: string;
    description: string;
  };
  contact_card_props: {
    heading: string;
    subTitle: string;
    contact_card_data: CONTACT_US_CARD_PROPS[];
  };
  follow_props: {
    title: string;
    social_icons: {
      Icon: React.ElementType<SvgIconProps>;
      href?: string;
    }[];
  };
  map_props: {
    title: string;
    description: string;
    locationLink: string;
  };
}

export interface CONTACT_US_CARD_PROPS {
  heading: string;
  Icon: React.ElementType<SvgIconProps>;
  value: string;
}

export interface LEGAL_CONTENT_BLOCK {
  type: "paragraph" | "list";
  text?: string;
  items?: string[];
}

export interface LEGAL_PAGE_DATA {
  title: string;
  effectiveDate: string;
  sections: {
    title: string;
    contentBlocks: LEGAL_CONTENT_BLOCK[];
  }[];
}

export interface SERVICES_PAGE_DATA {
  pageTitle: string;
  heroSection: {
    heading1: string;
    heading2: string;
    description: string;
    img: StaticImageData;
  };
  why_choose_strength_props: {
    title: string;
    heading: string;
    spanHeading: string;
    description: string;
    our_strength: {
      heading: string;
      data: STRENGTH_CARD_PROPS[];
    };
  };
  unparalleled_props: {
    title: string;
    img: StaticImageData;
  };
  service_framework_props: {
    heading: string;
    spanHeading: string;
    description: string;
    data: SERVICE_FRAMEWORK_CARD_PROPS[];
  };
}

export interface STRENGTH_CARD_PROPS {
  img: StaticImageData;
  title: string;
  description: string;
}

export interface SERVICE_FRAMEWORK_CARD_PROPS {
  heading: string;
  data: {
    title: string;
  }[];
}

export interface SERVICES_DETAILS_DATA_PROPS {
  slug: string;
  title: string;
  data: {
    description: string;
    dataList?: { label: string }[];
  }[];
}

export interface ROLE_PROPS {
  id: string;
  name: string;
  permissions: string[];
}

export interface SUB_ADMIN_PROPS {
  id: string;
  name: string;
  email: string;
  password?: string;
  roleId: string;
}

export interface LEGAL_CONTENT_BLOCK {
  type: "paragraph" | "list";
  text?: string;
  items?: string[];
}

export interface LEGAL_PAGE_DATA {
  title: string;
  effectiveDate: string;
  sections: {
    title: string;
    contentBlocks: LEGAL_CONTENT_BLOCK[];
  }[];
}

export interface BLOG_DETAIL_PROPS {
  slug: string;
  hero: {
    title: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    authorImage?: StaticImageData;
    authorTitle?: string;
    bgImage?: StaticImageData;
    badge?: string;
  };
  content: {
    intro: string;
    sections: {
      heading: string;
      content: string | string[];
    }[];
  };
  relatedPosts?: {
    slug: string;
    title: string;
    img: StaticImageData;
    date: string;
  }[];
}
