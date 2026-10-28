import { getValidImageUrl } from "./commonMapper";
import { AI_PAGE_DATA } from "@/utils/types";

export const mapAiPageStateToBackend = (state: AI_PAGE_DATA) => {
  if (!state) return [];
  return [
    {
      sectionKey: "ai_hero_section",
      sectionType: "ai_hero_section",
      sortOrder: 1,
      isVisible: true,
      data: {
        tagTitle: state.heroSection?.tagTitle || "",
        heading: state.heroSection?.heading || "",
        spanHeading: state.heroSection?.spanHeading || "",
        subHeading: state.heroSection?.subHeading || "",
        description: state.heroSection?.description || "",
        imageUrl: state.heroSection?.key || state.heroSection?.imageUrl || "",
      },
    },
    {
      sectionKey: "ai_matters_section",
      sectionType: "ai_matters_section",
      sortOrder: 2,
      isVisible: true,
      data: {
        sectionTitle: state.mattersSection?.sectionTitle || "",
        heading: state.mattersSection?.heading || "",
        subHeading: state.mattersSection?.subHeading || "",
        description: state.mattersSection?.description || "",
        items: state.mattersSection?.items || [],
        imageUrl: state.mattersSection?.key || state.mattersSection?.imageUrl || "",
      },
    },
    {
      sectionKey: "ai_approach_section",
      sectionType: "ai_approach_section",
      sortOrder: 3,
      isVisible: true,
      data: {
        sectionTitle: state.approachSection?.sectionTitle || "",
        heading: state.approachSection?.heading || "",
        description: state.approachSection?.description || "",
        items: state.approachSection?.items || [],
        imageUrl: state.approachSection?.key || state.approachSection?.imageUrl || "",
      },
    },
    {
      sectionKey: "ai_tools_section",
      sectionType: "ai_tools_section",
      sortOrder: 4,
      isVisible: true,
      data: {
        sectionTitle: state.toolsSection?.sectionTitle || "",
        heading: state.toolsSection?.heading || "",
        description: state.toolsSection?.description || "",
        items: state.toolsSection?.items || [],
        imageUrl: state.toolsSection?.key || state.toolsSection?.imageUrl || "",
      },
    },
    {
      sectionKey: "ai_choice_section",
      sectionType: "ai_choice_section",
      sortOrder: 5,
      isVisible: true,
      data: {
        sectionTitle: state.choiceSection?.sectionTitle || "",
        heading: state.choiceSection?.heading || "",
        description: state.choiceSection?.description || "",
        items: state.choiceSection?.items || [],
        imageUrl: state.choiceSection?.key || state.choiceSection?.imageUrl || "",
      },
    },
    {
      sectionKey: "ai_questions_section",
      sectionType: "ai_questions_section",
      sortOrder: 6,
      isVisible: true,
      data: {
        heading: state.questionsSection?.heading || "",
        description: state.questionsSection?.description || "",
        email: state.questionsSection?.email || "",
        buttonText: state.questionsSection?.buttonText || "",
        buttonLink: state.questionsSection?.buttonLink || "",
      },
    },
  ];
};

export const mapBackendToAiPageState = (backendData: any, currentState?: any): any => {
  if (!backendData || !backendData.sections) return currentState;
  const newState = { ...(currentState || {}) };

  backendData.sections.forEach((section: any) => {
    if (section.sectionKey === "ai_hero_section") {
      newState.heroSection = {
        ...newState.heroSection,
        ...section.data,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.heroSection.img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
        newState.heroSection.imageUrl = section.data.imageUrl;
        newState.heroSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "ai_matters_section") {
      newState.mattersSection = {
        ...newState.mattersSection,
        ...section.data,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.mattersSection.img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
        newState.mattersSection.imageUrl = section.data.imageUrl;
        newState.mattersSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "ai_approach_section") {
      newState.approachSection = {
        ...newState.approachSection,
        ...section.data,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.approachSection.img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
        newState.approachSection.imageUrl = section.data.imageUrl;
        newState.approachSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "ai_tools_section") {
      newState.toolsSection = {
        ...newState.toolsSection,
        ...section.data,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.toolsSection.img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
        newState.toolsSection.imageUrl = section.data.imageUrl;
        newState.toolsSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "ai_choice_section") {
      newState.choiceSection = {
        ...newState.choiceSection,
        ...section.data,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
        newState.choiceSection.img = getValidImageUrl(section.data.imageDownloadUrl || section.data.imageUrl);
        newState.choiceSection.imageUrl = section.data.imageUrl;
        newState.choiceSection.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "ai_questions_section") {
      newState.questionsSection = {
        ...newState.questionsSection,
        ...section.data,
      };
    }
  });

  return newState;
};
