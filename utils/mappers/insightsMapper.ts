import { getCleanImageUrl } from "./commonMapper";

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
      img: data.heroSectionData?.imageDownloadUrl || data.heroSectionData?.img || data.heroSectionData?.imageUrl || ""
    },
    quickLinks: {
      ...currentState.quickLinks,
      ...data.quickLinks,
      data: (data.quickLinks?.data || []).map((item: any) => ({
        ...item,
        img: item.imageDownloadUrl || item.img || item.imageUrl || ""
      }))
    }
  };
};
