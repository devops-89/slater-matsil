import { getCleanImageUrl, getValidImageUrl } from "./commonMapper";

export const mapBackendToServicesPageState = (backendData: any, currentServicesState: any, currentServiceAreaState: any) => {
  const newServicesPage = { ...currentServicesState };
  let newServiceArea = { ...currentServiceAreaState };

  if (!backendData || !backendData.sections) return { newServicesPage, newServiceArea };

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        newServicesPage.heroSection = {
          ...section.data,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          img: getValidImageUrl(section.data?.imageDownloadUrl || section.data?.img || section.data?.imageUrl || section.data?.key || ""),
        };
        break;
      case "why_choose_us":
        newServicesPage.why_choose_strength_props = {
          ...section.data,
          our_strength: {
            ...section.data?.our_strength,
            data: (section.data?.our_strength?.data || []).map((item: any) => ({
              ...item,
              imageDownloadUrl: item.imageDownloadUrl || "",
              img: getValidImageUrl(item.imageDownloadUrl || item.img || item.imageUrl || item.key || ""),
            }))
          }
        };
        break;
      case "unparalleled_legal_services":
        newServicesPage.unparalleled_props = {
          ...section.data,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          img: getValidImageUrl(section.data?.imageDownloadUrl || section.data?.img || section.data?.imageUrl || section.data?.key || ""),
        };
        break;
      case "service_framework":
        newServicesPage.service_framework_props = section.data || newServicesPage.service_framework_props;
        break;
      case "service_areas":
        newServiceArea = {
          ...section.data,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          img: getValidImageUrl(section.data?.imageDownloadUrl || section.data?.img || section.data?.imageUrl || section.data?.key || ""),
          section_Data: (section.data?.section_Data || []).map((item: any) => ({
            ...item,
            imageDownloadUrl: item.imageDownloadUrl || "",
            img: getValidImageUrl(item.imageDownloadUrl || item.img || item.imageUrl || item.key || ""),
          }))
        };
        break;
    }
  });

  return { newServicesPage, newServiceArea };
};

export const mapServicesPageStateToBackend = (servicesPageState: any, serviceAreaState: any) => {
  return [
    {
      sectionKey: "hero",
      sectionType: "hero",
      sortOrder: 1,
      isVisible: true,
      data: {
        ...servicesPageState.heroSection,
        imageUrl: getCleanImageUrl(servicesPageState.heroSection?.imageUrl || servicesPageState.heroSection?.img || servicesPageState.heroSection?.key || "")
      }
    },
    {
      sectionKey: "why_choose_us",
      sectionType: "why_choose_us",
      sortOrder: 2,
      isVisible: true,
      data: {
        ...servicesPageState.why_choose_strength_props,
        our_strength: {
          ...servicesPageState.why_choose_strength_props?.our_strength,
          data: (servicesPageState.why_choose_strength_props?.our_strength?.data || []).map((item: any) => ({
            ...item,
            imageUrl: getCleanImageUrl(item.imageUrl || item.img || item.key || "")
          }))
        }
      }
    },
    {
      sectionKey: "unparalleled_legal_services",
      sectionType: "unparalleled_legal_services",
      sortOrder: 3,
      isVisible: true,
      data: {
        ...servicesPageState.unparalleled_props,
        imageUrl: getCleanImageUrl(servicesPageState.unparalleled_props?.imageUrl || servicesPageState.unparalleled_props?.img || servicesPageState.unparalleled_props?.key || "")
      }
    },
    {
      sectionKey: "service_framework",
      sectionType: "service_framework",
      sortOrder: 4,
      isVisible: true,
      data: servicesPageState.service_framework_props
    },
    {
      sectionKey: "service_areas",
      sectionType: "service_areas",
      sortOrder: 5,
      isVisible: true,
      data: {
        ...serviceAreaState,
        imageUrl: getCleanImageUrl(serviceAreaState?.imageUrl || serviceAreaState?.img || serviceAreaState?.key || ""),
        section_Data: (serviceAreaState?.section_Data || []).map((item: any) => ({
          ...item,
          imageUrl: getCleanImageUrl(item.imageUrl || item.img || item.key || "")
        }))
      }
    }
  ];
};
