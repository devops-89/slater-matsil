export const mapWhoWeServeStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "whoWeServepageHeroSection",
      sectionType: "whoWeServepageHeroSection",
      sortOrder: 1,
      isVisible: true,
      data: {
        title: state.whoWeServepageHeroSection?.title || "",
        heading1: state.whoWeServepageHeroSection?.heading1 || "",
        spanHeading1: state.whoWeServepageHeroSection?.spanHeading1 || "",
        spanHeading2: state.whoWeServepageHeroSection?.spanHeading2 || "",
        imageUrl: state.whoWeServepageHeroSection?.key || state.whoWeServepageHeroSection?.imageUrl || ""
      }
    },
    {
      sectionKey: "whoWeServeAboutSection",
      sectionType: "whoWeServeAboutSection",
      sortOrder: 2,
      isVisible: true,
      data: {
        leftSideDescription: state.whoWeServeAboutSection?.leftSideDescription || "",
        rightSideDescription: state.whoWeServeAboutSection?.rightSideDescription || "",
        quoteCardData: state.whoWeServeAboutSection?.quoteCardData || {}
      }
    },
    {
      sectionKey: "whoWeServeTabsSection",
      sectionType: "whoWeServeTabsSection",
      sortOrder: 3,
      isVisible: true,
      data: {
        tabs: state.whoWeServeTabsSection || []
      }
    }
  ];
};

export const mapBackendToWhoWeServeState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const newState = { ...currentState };
  
  backendData.sections.forEach((section: any) => {
    if (section.sectionKey === "whoWeServepageHeroSection") {
      newState.whoWeServepageHeroSection = {
        ...newState.whoWeServepageHeroSection,
        ...section.data
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.whoWeServepageHeroSection.img = section.data.imageDownloadUrl || section.data.imageUrl;
        newState.whoWeServepageHeroSection.imageUrl = section.data.imageUrl;
        newState.whoWeServepageHeroSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "whoWeServeAboutSection") {
      newState.whoWeServeAboutSection = {
        ...newState.whoWeServeAboutSection,
        ...section.data
      };
    } else if (section.sectionKey === "whoWeServeTabsSection") {
      newState.whoWeServeTabsSection = section.data?.tabs || (Array.isArray(section.data) ? section.data : []);
    }
  });

  return newState;
};
