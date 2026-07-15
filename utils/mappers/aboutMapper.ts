import { getCleanImageUrl } from "./commonMapper";

export const mapBackendToAboutPageState = (backendData: any, currentState: any) => {
  const newAboutPage = { ...currentState };

  if (!backendData || !backendData.sections) return newAboutPage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        newAboutPage.heroSection = {
          ...section.data,
          videoDownloadUrl: section.data?.videoDownloadUrl || "",
          videoUrl: section.data?.videoUrl || section.data?.key || "",
        };
        break;
      case "driving_innovation":
        newAboutPage.drivingInnovationEverywhere = {
          ...section.data,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          imageUrl: section.data?.imageUrl || section.data?.img || section.data?.key || "",
          img: section.data?.imageDownloadUrl || section.data?.img || section.data?.imageUrl || section.data?.key || "",
        };
        break;
      case "redefining_patent_success":
        newAboutPage.REDEFINING_PATENT_SUCCESS = section.data || newAboutPage.REDEFINING_PATENT_SUCCESS;
        break;
      case "innovation_insights":
        newAboutPage.innovationInsights = section.data || newAboutPage.innovationInsights;
        break;
      case "awards_props":
        newAboutPage.AWARDSPROPS = {
          ...section.data,
          awards_img: (section.data?.awards_img || []).map((award: any) => ({
            ...award,
            imageDownloadUrl: award.imageDownloadUrl || "",
            imageUrl: award.imageUrl || award.img || award.key || "",
            img: award.imageDownloadUrl || award.img || award.imageUrl || award.key || "",
          }))
        };
        break;
      case "who_we_serve_props":
        newAboutPage.who_we_serve_props = section.data || newAboutPage.who_we_serve_props;
        break;
      case "industries_we_serve":
        newAboutPage.industriesWeServe = section.data || newAboutPage.industriesWeServe;
        break;
    }
  });

  return newAboutPage;
};

export const mapAboutPageStateToBackend = (aboutPageState: any) => {
  return [
    {
      sectionKey: "hero",
      sectionType: "hero",
      sortOrder: 1,
      isVisible: true,
      data: {
        sectionTitle: aboutPageState.heroSection?.sectionTitle || "",
        heading: aboutPageState.heroSection?.heading || "",
        description: aboutPageState.heroSection?.description || "",
        videoUrl: aboutPageState.heroSection?.videoUrl || aboutPageState.heroSection?.key || ""
      }
    },
    {
      sectionKey: "driving_innovation",
      sectionType: "driving_innovation",
      sortOrder: 2,
      isVisible: true,
      data: {
        ...aboutPageState.drivingInnovationEverywhere,
        imageUrl: getCleanImageUrl(aboutPageState.drivingInnovationEverywhere?.imageUrl || aboutPageState.drivingInnovationEverywhere?.img || aboutPageState.drivingInnovationEverywhere?.key || "")
      }
    },
    {
      sectionKey: "redefining_patent_success",
      sectionType: "redefining_patent_success",
      sortOrder: 3,
      isVisible: true,
      data: aboutPageState.REDEFINING_PATENT_SUCCESS
    },
    {
      sectionKey: "innovation_insights",
      sectionType: "innovation_insights",
      sortOrder: 4,
      isVisible: true,
      data: aboutPageState.innovationInsights
    },
    {
      sectionKey: "awards_props",
      sectionType: "awards_props",
      sortOrder: 5,
      isVisible: true,
      data: {
        ...aboutPageState.AWARDSPROPS,
        awards_img: (aboutPageState.AWARDSPROPS?.awards_img || []).map((award: any) => ({
          ...award,
          imageUrl: getCleanImageUrl(award.imageUrl || award.img || award.key || "")
        }))
      }
    },
    {
      sectionKey: "who_we_serve_props",
      sectionType: "who_we_serve_props",
      sortOrder: 6,
      isVisible: true,
      data: aboutPageState.who_we_serve_props
    },
    {
      sectionKey: "industries_we_serve",
      sectionType: "industries_we_serve",
      sortOrder: 7,
      isVisible: true,
      data: aboutPageState.industriesWeServe
    }
  ];
};
