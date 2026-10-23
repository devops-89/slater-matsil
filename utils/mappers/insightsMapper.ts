import { getCleanImageUrl, getValidImageUrl } from "./commonMapper";

export const mapInsightsStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "insights_content",
      sectionType: "insights_content",
      sortOrder: 1,
      isVisible: true,
      data: {
        heroSectionData: {
          ...state.heroSectionData,
          imageUrl: getCleanImageUrl(state.heroSectionData?.key || state.heroSectionData?.imageUrl || state.heroSectionData?.img || "")
        },
        tab_data: state.tab_data || [],
        quickLinks: {
          title: state.quickLinks?.title || "Quick Links",
          data: (state.quickLinks?.data || []).map((item: any) => ({
            title: item.title,
            href: item.href,
            imageUrl: getCleanImageUrl(item.key || item.imageUrl || item.img || "")
          }))
        }
      }
    }
  ];
};

export const mapBlogsStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "blogs_content",
      sectionType: "blogs_content",
      sortOrder: 1,
      isVisible: true,
      data: {
        heroSectionData: {
          heading: state.heroSectionData?.heading || "",
          subHeading: state.heroSectionData?.subHeading || ""
        }
      }
    }
  ];
};

export const mapBackendToBlogsState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const section = backendData.sections.find((s: any) => s.sectionKey === "blogs_content");
  if (!section || !section.data) return currentState;

  const data = section.data;
  return {
    ...currentState,
    heroSectionData: {
      ...currentState.heroSectionData,
      heading: data.heroSectionData?.heading || currentState.heroSectionData?.heading || "",
      subHeading: data.heroSectionData?.subHeading || currentState.heroSectionData?.subHeading || ""
    }
  };
};

export const mapBackendToInsightsState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const section = backendData.sections.find((s: any) => s.sectionKey === "insights_content");
  if (!section || !section.data) return currentState;

  const data = section.data;
  return {
    ...currentState,
    ...data,
    heroSectionData: {
      ...currentState.heroSectionData,
      ...data.heroSectionData,
      img: getValidImageUrl(data.heroSectionData?.imageDownloadUrl || data.heroSectionData?.img || data.heroSectionData?.imageUrl || ""),
      title: data.heroSectionData?.title || "",
      subTitle: data.heroSectionData?.subTitle || "",
    },
    quickLinks: {
      ...currentState.quickLinks,
      ...data.quickLinks,
      data: (data.quickLinks?.data || []).map((item: any) => ({
        ...item,
        img: getValidImageUrl(item.imageDownloadUrl || item.img || item.imageUrl || "")
      }))
    }
  };
};

export const mapBackendToInsightDetailState = (apiInsight: any) => {
  if (!apiInsight) return null;
  const secMap: any = {
    aboutProvidedBy: apiInsight.aboutProvidedBy || "Provided by",
    aboutProvidedByName: apiInsight.aboutProvidedByName || "Slater Matsil, LLP",
    region: apiInsight.region || "USA",
  };
  
  apiInsight.sections?.forEach((sec: any) => {
    if (sec.sectionType === "PRACTICE_AREAS") secMap.practiceAreas = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "PROFESSIONAL_MEMBERSHIPS") secMap.professionalMemberships = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "CAREER") secMap.career = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "PERSONAL") secMap.personal = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "CHAMBERS_REVIEW") secMap.ChamberssReview = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "STRENGTHS") secMap.strengths = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "ADDITIONAL_CONTENT" || sec.sectionType === "ADDITIONAL_INFORMATION") secMap.additionalInformation = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "MAIN_CONTENT" || sec.sectionType === "CLOSING_STATEMENT") secMap.closingStatement = { heading: sec.heading, content: sec.content };
    if (sec.sectionType === "MISC_AND_RESOURCES" || sec.sectionType === "RESOURCE") secMap.resource = { heading: sec.heading, content: sec.content, link: sec.link || "" };
  });

  return {
    slug: String(apiInsight.id),
    hero: {
      name: apiInsight.personName || "",
      band: apiInsight.bandRole || "",
      guide: apiInsight.guideOrganization || "",
      yearsRanked: apiInsight.yearsRankedDate || "",
      profileImage: apiInsight.imageDownloadUrl || apiInsight.imageUrl || "",
    },
    contact: apiInsight.contact || {
      firm: "SlaterMatsil, LLP",
      firmUrl: "www.slatermatsil.com",
      email: "info@slatermatsil.com",
      phone: "972 732 1001",
      shareLabel: "Share",
    },
    contentSections: secMap,
  };
};
