export const mapBackendToHomepageState = (backendData: any, currentState: any) => {
  const newHomepage = { ...currentState };
  
  if (!backendData || !backendData.sections) return newHomepage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        newHomepage.heroSection = section.data?.slides || newHomepage.heroSection;
        break;
      case "about":
        newHomepage.aboutSection = section.data || newHomepage.aboutSection;
        break;
      case "metrics":
        newHomepage.our_metrics = section.data || newHomepage.our_metrics;
        break;
      case "who_we_serve":
        newHomepage.who_we_serve = section.data || newHomepage.who_we_serve;
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
      data: { slides: homepageState.heroSection }
    },
    {
      sectionKey: "about",
      sectionType: "about_block",
      sortOrder: 2,
      isVisible: true,
      data: homepageState.aboutSection
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
      data: homepageState.who_we_serve
    }
  ];
};

export const mapBackendToAboutPageState = (backendData: any, currentState: any) => {
  const newAboutPage = { ...currentState };
  
  if (!backendData || !backendData.sections) return newAboutPage;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "hero":
        newAboutPage.heroSection = section.data || newAboutPage.heroSection;
        break;
      case "driving_innovation":
        newAboutPage.drivingInnovationEverywhere = section.data || newAboutPage.drivingInnovationEverywhere;
        break;
      case "redefining_patent_success":
        newAboutPage.REDEFINING_PATENT_SUCCESS = section.data || newAboutPage.REDEFINING_PATENT_SUCCESS;
        break;
      case "innovation_insights":
        newAboutPage.innovationInsights = section.data || newAboutPage.innovationInsights;
        break;
      case "awards_props":
        newAboutPage.AWARDSPROPS = section.data || newAboutPage.AWARDSPROPS;
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
      data: aboutPageState.heroSection
    },
    {
      sectionKey: "driving_innovation",
      sectionType: "driving_innovation",
      sortOrder: 2,
      isVisible: true,
      data: aboutPageState.drivingInnovationEverywhere
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
      data: aboutPageState.AWARDSPROPS
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
