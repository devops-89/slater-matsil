import { getCleanImageUrl, getValidImageUrl } from "./commonMapper";

export const mapBackendToHomepageState = (backendData: any, currentState: any) => {
  const newHomepage = { ...currentState };

  if (!backendData || !backendData.sections) return newHomepage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        const slidesData = section.data?.slides;
        if (Array.isArray(slidesData)) {
          newHomepage.heroSection = slidesData.map((s: any) => {
            const { key, ...rest } = s;
            return {
              ...rest,
              imageDownloadUrl: s.imageDownloadUrl || "",
              imageUrl: s.imageUrl || s.image || s.key || "",
              image: getValidImageUrl(s.imageDownloadUrl || s.image || s.imageUrl || s.key || ""),
            };
          });
        } else if (slidesData) {
          const { key, ...rest } = slidesData;
          newHomepage.heroSection = [{
            ...rest,
            imageDownloadUrl: slidesData.imageDownloadUrl || "",
            imageUrl: slidesData.imageUrl || slidesData.image || slidesData.key || "",
            image: getValidImageUrl(slidesData.imageDownloadUrl || slidesData.image || slidesData.imageUrl || slidesData.key || ""),
          }];
        }
        break;
      case "about":
        const { key: aboutKey, ...aboutRest } = section.data || {};
        newHomepage.aboutSection = {
          ...aboutRest,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          imageUrl: section.data?.imageUrl || section.data?.image || section.data?.key || "",
          image: getValidImageUrl(section.data?.imageDownloadUrl || section.data?.image || section.data?.imageUrl || section.data?.key || "")
        };
        break;
      case "metrics":
        newHomepage.our_metrics = section.data || newHomepage.our_metrics;
        break;
      case "who_we_serve":
        const { key: wwsKey, ...wwsLeftRest } = section.data?.leftSection || {};
        newHomepage.who_we_serve = {
          ...section.data,
          leftSection: {
            ...wwsLeftRest,
            imageDownloadUrl: section.data?.leftSection?.imageDownloadUrl || "",
            heroImage: getValidImageUrl(section.data?.leftSection?.imageDownloadUrl || section.data?.leftSection?.heroImage || section.data?.leftSection?.imageUrl || section.data?.leftSection?.key || ""),
            imageUrl: section.data?.leftSection?.imageUrl || section.data?.leftSection?.heroImage || section.data?.leftSection?.key || "",
            small_logo: (section.data?.leftSection?.small_logo && (typeof section.data.leftSection.small_logo === "string" ? section.data.leftSection.small_logo : section.data.leftSection.small_logo?.src)?.includes("_next/static")) ? currentState?.who_we_serve?.leftSection?.small_logo : section.data?.leftSection?.small_logo,
            big_logo: (section.data?.leftSection?.big_logo && (typeof section.data.leftSection.big_logo === "string" ? section.data.leftSection.big_logo : section.data.leftSection.big_logo?.src)?.includes("_next/static")) ? currentState?.who_we_serve?.leftSection?.big_logo : section.data?.leftSection?.big_logo,
          },
          rightSection: {
            ...section.data?.rightSection,
            bgImage: (section.data?.rightSection?.bgImage && typeof section.data?.rightSection?.bgImage === "string" && section.data.rightSection.bgImage.includes("_next/static")) ? currentState?.who_we_serve?.rightSection?.bgImage : section.data?.rightSection?.bgImage,
          }
        };
        break;
      // Other sections like insights or services are left as-is from currentState
    }
  });

  return newHomepage;
};

export const mapHomepageStateToBackend = (homepageState: any) => {
  return [
    {
      sectionKey: "hero",
      sectionType: "hero",
      sortOrder: 1,
      isVisible: true,
      data: {
        slides: homepageState.heroSection.map((s: any) => ({
          title: s.title,
          description: s.description,
          imageUrl: getCleanImageUrl(s.imageUrl || s.image || s.key || "")
        }))
      }
    },
    {
      sectionKey: "about",
      sectionType: "about_block",
      sortOrder: 2,
      isVisible: true,
      data: {
        ...homepageState.aboutSection,
        imageUrl: getCleanImageUrl(homepageState.aboutSection?.imageUrl || homepageState.aboutSection?.image || homepageState.aboutSection?.key || "")
      }
    },
    {
      sectionKey: "metrics",
      sectionType: "metrics_list",
      sortOrder: 3,
      isVisible: true,
      data: homepageState.our_metrics
    },
    {
      sectionKey: "who_we_serve",
      sectionType: "who_we_serve",
      sortOrder: 5,
      isVisible: true,
      data: {
        ...homepageState.who_we_serve,
        leftSection: {
          ...homepageState.who_we_serve?.leftSection,
          imageUrl: getCleanImageUrl(homepageState.who_we_serve?.leftSection?.imageUrl || homepageState.who_we_serve?.leftSection?.heroImage || homepageState.who_we_serve?.leftSection?.key || "")
        }
      }
    }
  ];
};
