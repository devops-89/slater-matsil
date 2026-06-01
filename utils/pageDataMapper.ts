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
              image: s.image || s.imageUrl || s.key || "",
            };
          });
        } else if (slidesData) {
          const { key, ...rest } = slidesData;
          newHomepage.heroSection = [{
            ...rest,
            imageDownloadUrl: slidesData.imageDownloadUrl || "",
            imageUrl: slidesData.imageUrl || slidesData.image || slidesData.key || "",
            image: slidesData.image || slidesData.imageUrl || slidesData.key || "",
          }];
        }
        break;
      case "about":
        const { key: aboutKey, ...aboutRest } = section.data || {};
        newHomepage.aboutSection = {
          ...aboutRest,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          imageUrl: section.data?.imageUrl || section.data?.image || section.data?.key || "",
          image: section.data?.image || section.data?.imageUrl || section.data?.key || ""
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
            heroImage: section.data?.leftSection?.heroImage || "",
            imageUrl: section.data?.leftSection?.imageUrl || section.data?.leftSection?.heroImage || section.data?.leftSection?.key || ""
          }
        };
        break;
      // Other sections like insights or services are left as-is from currentState
    }
  });

  return newHomepage;
};

const getCleanImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("/_next/")) return "";
  return url;
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
        imageUrl: getCleanImageUrl(homepageState.aboutSection?.imageUrl || homepageState.aboutSection?.image || homepageState.aboutSection?.key || ""),
        image: undefined,
        imageDownloadUrl: undefined,
        key: undefined
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
          imageUrl: getCleanImageUrl(homepageState.who_we_serve?.leftSection?.imageUrl || homepageState.who_we_serve?.leftSection?.heroImage || homepageState.who_we_serve?.leftSection?.key || ""),
          heroImage: undefined,
          imageDownloadUrl: undefined,
          key: undefined
        }
      }
    }
  ];
};

export const mapBackendToAboutPageState = (backendData: any, currentState: any) => {
  const newAboutPage = { ...currentState };

  if (!backendData || !backendData.sections) return newAboutPage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        newAboutPage.heroSection = {
          ...section.data,
          videoDownloadUrl: section.data?.videoDownloadUrl || "",
          videoUrl: section.data?.videoUrl || section.data?.videoDownloadUrl || section.data?.key || "",
        };
        break;
      case "driving_innovation":
        newAboutPage.drivingInnovationEverywhere = {
          ...section.data,
          imageDownloadUrl: section.data?.imageDownloadUrl || "",
          img: section.data?.img || section.data?.imageDownloadUrl || section.data?.key || "",
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
            img: award.img || award.imageDownloadUrl || award.key || "",
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
        ...aboutPageState.heroSection,
        key: aboutPageState.heroSection?.key || aboutPageState.heroSection?.videoUrl || "",
        videoUrl: undefined,
        videoDownloadUrl: undefined,
      }
    },
    {
      sectionKey: "driving_innovation",
      sectionType: "driving_innovation",
      sortOrder: 2,
      isVisible: true,
      data: {
        ...aboutPageState.drivingInnovationEverywhere,
        key: aboutPageState.drivingInnovationEverywhere?.key || aboutPageState.drivingInnovationEverywhere?.img || "",
        img: undefined,
        imageDownloadUrl: undefined,
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
          key: award.key || award.img || "",
          img: undefined,
          imageDownloadUrl: undefined,
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
