import { ButtonProps } from "@mui/material";
import { StaticImageData } from "next/image";

export interface HOMEPAGE_DATA_PROPS {
  title: string;
  homepage: {
    heroSection: HERO_SECTION_PROPS;
    aboutSection: aboutSectionProps;
    our_metrics: MetricSectionProps;
    service_area: SERVICES_AREA_PROPS;
    who_we_serve: WHO_WE_SERVE_SECTION_PROPS;
    insights_section: INSIGHTS_SECTION_PROPS;
  };
}

interface HERO_SECTION_PROPS {
  heading: string;
  subHeading: string;
  videoHeading: {
    title: string;
    subTitle: string;
  };
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
