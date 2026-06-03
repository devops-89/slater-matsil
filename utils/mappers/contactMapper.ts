import { getCleanImageUrl } from "./commonMapper";

export const mapContactStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "contact_hero_section",
      sectionType: "contact_hero_section",
      sortOrder: 1,
      isVisible: true,
      data: {
        heading: state.hero_section_data?.heading || "",
        description: state.hero_section_data?.description || "",
        imageUrl: getCleanImageUrl(state.hero_section_data?.imageUrl || state.hero_section_data?.img || state.hero_section_data?.key || "")
      }
    },
    {
      sectionKey: "contact_form_section",
      sectionType: "contact_form_section",
      sortOrder: 2,
      isVisible: true,
      data: {
        heading1: state.form_section?.heading1 || "",
        heading2: state.form_section?.heading2 || "",
        description: state.form_section?.description || ""
      }
    },
    {
      sectionKey: "contact_card_props",
      sectionType: "contact_card_props",
      sortOrder: 3,
      isVisible: true,
      data: {
        heading: state.contact_card_props?.heading || "",
        subTitle: state.contact_card_props?.subTitle || "",
        contact_card_data: (state.contact_card_props?.contact_card_data || []).map((card: any) => ({
          heading: card.heading || "",
          value: card.value || ""
        }))
      }
    },
    {
      sectionKey: "contact_follow_props",
      sectionType: "contact_follow_props",
      sortOrder: 4,
      isVisible: true,
      data: {
        title: state.follow_props?.title || "",
        social_icons: (state.follow_props?.social_icons || []).map((icon: any) => ({
          href: icon.href || "",
          iconName: icon.Icon?.name || icon.iconName || "LinkedIn"
        }))
      }
    }
  ];
};

export const mapBackendToContactState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const newState = { ...currentState };
  
  backendData.sections.forEach((section: any) => {
    if (section.sectionKey === "contact_hero_section") {
      newState.hero_section_data = {
        ...newState.hero_section_data,
        heading: section.data?.heading || newState.hero_section_data?.heading,
        description: section.data?.description || newState.hero_section_data?.description,
      };
      if (section.data?.imageUrl || section.data?.imageDownloadUrl) {
         newState.hero_section_data.img = section.data.imageDownloadUrl || section.data.imageUrl;
         newState.hero_section_data.imageUrl = section.data.imageUrl;
         newState.hero_section_data.imageDownloadUrl = section.data.imageDownloadUrl || section.data.imageUrl;
      }
    } else if (section.sectionKey === "contact_form_section") {
      newState.form_section = {
        ...newState.form_section,
        heading1: section.data?.heading1 || newState.form_section?.heading1,
        heading2: section.data?.heading2 || newState.form_section?.heading2,
        description: section.data?.description || newState.form_section?.description,
      };
    } else if (section.sectionKey === "contact_card_props") {
      newState.contact_card_props = {
        ...newState.contact_card_props,
        heading: section.data?.heading || newState.contact_card_props?.heading,
        subTitle: section.data?.subTitle || newState.contact_card_props?.subTitle,
      };
      if (section.data?.contact_card_data) {
        newState.contact_card_props.contact_card_data = section.data.contact_card_data.map((item: any, i: number) => {
           const existingIcon = currentState.contact_card_props?.contact_card_data?.[i]?.Icon;
           return {
             ...item,
             Icon: existingIcon || undefined
           };
        });
      }
    } else if (section.sectionKey === "contact_follow_props") {
      newState.follow_props = {
        ...newState.follow_props,
        title: section.data?.title || newState.follow_props?.title,
      };
      if (section.data?.social_icons) {
        newState.follow_props.social_icons = section.data.social_icons.map((item: any, i: number) => {
           const existingIcon = currentState.follow_props?.social_icons?.[i]?.Icon;
           return {
             ...item,
             Icon: existingIcon || undefined
           };
        });
      }
    }
  });
  
  return newState;
};
