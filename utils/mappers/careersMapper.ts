import { getValidImageUrl } from "./commonMapper";
export const mapCareersStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "career_hero_section",
      sectionType: "career_hero_section",
      sortOrder: 1,
      isVisible: true,
      data: {
        title: state.career_hero_section?.title || "",
        shortDescription: state.career_hero_section?.shortDescription || "",
        description: state.career_hero_section?.description || "",
        carouselImages: (state.career_hero_section?.carouselImages || [])
          .filter((img: any) => typeof img === 'object' && img.key)
          .map((img: any) => ({ imageUrl: img.key || img.imageUrl }))
      }
    },
    {
      sectionKey: "career_work_with_us",
      sectionType: "career_work_with_us",
      sortOrder: 2,
      isVisible: true,
      data: {
        firstTitle: state.career_work_with_us?.firstTitle || "",
        secondTitle: state.career_work_with_us?.secondTitle || "",
        shortDescription: state.career_work_with_us?.shortDescription || "",
        work_list_data: state.career_work_with_us?.work_list_data || [],
        imageUrl: state.career_work_with_us?.section_imageKey || state.career_work_with_us?.section_imageUrl || ""
      }
    },
    {
      sectionKey: "career_open_roles",
      sectionType: "career_open_roles",
      sortOrder: 3,
      isVisible: true,
      data: {
        title: state.career_open_roles?.title || "",
        shortDescription: state.career_open_roles?.shortDescription || "",
        description: state.career_open_roles?.description || "",
        tabSectionData: state.career_open_roles?.tabSectionData || { tabData: [], tabContentData: {} }
      }
    }
  ];
};

export const mapBackendToCareersState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const newState = { ...currentState };
  
  backendData.sections.forEach((section: any) => {
    if (section.sectionKey === "career_hero_section") {
      newState.career_hero_section = {
        ...newState.career_hero_section,
        title: section.data?.title || newState.career_hero_section?.title,
        shortDescription: section.data?.shortDescription || newState.career_hero_section?.shortDescription,
        description: section.data?.description || newState.career_hero_section?.description,
      };
      if (section.data?.carouselImages && section.data.carouselImages.length > 0) {
        newState.career_hero_section.carouselImages = section.data.carouselImages.map((img: any) => ({
          ...img,
          key: img.imageUrl,
          imageDownloadUrl: img.imageDownloadUrl || img.imageUrl
        }));
      }
    } else if (section.sectionKey === "career_work_with_us") {
      newState.career_work_with_us = {
        ...newState.career_work_with_us,
        firstTitle: section.data?.firstTitle || newState.career_work_with_us?.firstTitle,
        secondTitle: section.data?.secondTitle || newState.career_work_with_us?.secondTitle,
        shortDescription: section.data?.shortDescription || newState.career_work_with_us?.shortDescription,
        work_list_data: section.data?.work_list_data || newState.career_work_with_us?.work_list_data,
      };
      if (section.data?.imageUrl) {
         newState.career_work_with_us.section_img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
         newState.career_work_with_us.section_imageUrl = section.data.imageUrl;
         newState.career_work_with_us.section_imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
         newState.career_work_with_us.section_imageKey = section.data.imageUrl;
      }
    } else if (section.sectionKey === "career_open_roles") {
      newState.career_open_roles = {
        ...newState.career_open_roles,
        title: section.data?.title || newState.career_open_roles?.title,
        shortDescription: section.data?.shortDescription || newState.career_open_roles?.shortDescription,
        description: section.data?.description || newState.career_open_roles?.description,
      };
      if (section.data?.tabSectionData) {
        newState.career_open_roles.tabSectionData = section.data.tabSectionData;
      }
    }
  });
  return newState;
};
