import { getCleanImageUrl } from "./commonMapper";

export const mapBackendToPracticeGroupsState = (backendData: any, currentState: any) => {
  const newPracticeGroupPage = { ...currentState };

  if (!backendData || !backendData.sections) return newPracticeGroupPage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "practiceGroup_hero_section":
        newPracticeGroupPage.practiceGroup_hero_section = {
          title: section.data?.title || "",
          heading: section.data?.heading || "",
          description1: section.data?.description1 || "",
          description2: section.data?.description2 || "",
          imageUrl: section.data?.imageDownloadUrl || section.data?.imageUrl || "",
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
        };
        break;
      case "practiceGroup_section":
        newPracticeGroupPage.practiceGroup_section = section.data || newPracticeGroupPage.practiceGroup_section;
        break;
    }
  });

  return newPracticeGroupPage;
};

export const mapPracticeGroupsStateToBackend = (practiceGroupState: any) => {
  return [
    {
      sectionKey: "practiceGroup_hero_section",
      sectionType: "practiceGroup_hero_section",
      sortOrder: 1,
      isVisible: true,
      data: {
        title: practiceGroupState.practiceGroup_hero_section?.title || "",
        heading: practiceGroupState.practiceGroup_hero_section?.heading || "",
        description1: practiceGroupState.practiceGroup_hero_section?.description1 || "",
        description2: practiceGroupState.practiceGroup_hero_section?.description2 || "",
        imageUrl: getCleanImageUrl(practiceGroupState.practiceGroup_hero_section?.imageUrl || "")
      }
    },
    {
      sectionKey: "practiceGroup_section",
      sectionType: "practiceGroup_section",
      sortOrder: 2,
      isVisible: true,
      data: practiceGroupState.practiceGroup_section
    }
  ];
};
