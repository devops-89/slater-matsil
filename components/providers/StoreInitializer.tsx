"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToHomepageState, mapBackendToServicesPageState, mapBackendToAboutPageState } from "@/utils/pageDataMapper";

type StoreInitializerProps = {
  pageType: "home" | "about" | "professionals" | "insights" | "services" | "leadership" | "practiceGroups" | "careers" | "blogs" | "contact" | "who-we-serve";
  apiData: any;
};

// Keep track of whether the client has done its first initial load
let isClientInitialized = false;

export default function StoreInitializer({ pageType, apiData }: StoreInitializerProps) {
  const initialized = useRef(false);

  const updateStore = () => {
    let newState: any = {};
    if (pageType === "home") {
      let updatedHomepage = WEBSITE_DATA.homepage;
      if (apiData?.data1) {
        updatedHomepage = mapBackendToHomepageState(apiData.data1, updatedHomepage);
      }
      if (apiData?.data3) {
        const { newServiceArea } = mapBackendToServicesPageState(apiData.data3, WEBSITE_DATA.servicesPage, updatedHomepage.service_area);
        updatedHomepage.service_area = newServiceArea;
      }
      newState = { homepage: updatedHomepage };
    } else if (pageType === "about") {
      let updatedAboutPage = WEBSITE_DATA.aboutPage;
      if (apiData?.data2) {
        updatedAboutPage = mapBackendToAboutPageState(apiData.data2, updatedAboutPage);
      }
      newState = { aboutPage: updatedAboutPage };
    } else if (pageType === "professionals") {
      let updatedProfPage: any = {};
      if (apiData?.data5) {
        const mapper = require("@/utils/pageDataMapper");
        updatedProfPage = mapper.mapBackendToFirmProfessionalsState(apiData.data5, updatedProfPage);
      }
      if (apiData?.initialProfessionals) {
        updatedProfPage.initialProfessionals = apiData.initialProfessionals;
        updatedProfPage.initialTotal = apiData.initialTotal;
      }
      newState = { firm_professionals: updatedProfPage };
    } else if (pageType === "insights") {
      let updatedInsightsPage = WEBSITE_DATA.insightsPage;
      if (apiData?.data7) {
        const mapper = require("@/utils/pageDataMapper");
        updatedInsightsPage = mapper.mapBackendToInsightsState(apiData.data7, updatedInsightsPage);
      }
      newState = { insightsPage: updatedInsightsPage };
    } else if (pageType === "services") {
      let updatedServicesPage = WEBSITE_DATA.servicesPage;
      let updatedHomepage = WEBSITE_DATA.homepage;
      if (apiData?.data3) {
        const mapper = require("@/utils/pageDataMapper");
        const { newServicesPage, newServiceArea } = mapper.mapBackendToServicesPageState(apiData.data3, updatedServicesPage, updatedHomepage.service_area);
        updatedServicesPage = newServicesPage;
        updatedHomepage.service_area = newServiceArea;
      }
      newState = { servicesPage: updatedServicesPage, homepage: updatedHomepage };
    } else if (pageType === "leadership") {
      let updatedFirmLeadershipPage = WEBSITE_DATA.firm_leadership;
      if (apiData?.data6) {
        const mapper = require("@/utils/pageDataMapper");
        updatedFirmLeadershipPage = mapper.mapBackendToFirmLeadershipState(apiData.data6, updatedFirmLeadershipPage);
      }
      newState = { firm_leadership: updatedFirmLeadershipPage };
    } else if (pageType === "practiceGroups") {
      let updatedPracticeGroupPage = WEBSITE_DATA.practiceGroupPage;
      if (apiData?.data4) {
        const mapper = require("@/utils/pageDataMapper");
        updatedPracticeGroupPage = mapper.mapBackendToPracticeGroupsState(apiData.data4, updatedPracticeGroupPage);
      }
      newState = { practiceGroupPage: updatedPracticeGroupPage };
    } else if (pageType === "careers") {
      let updatedCareersPage = WEBSITE_DATA.careerPage;
      if (apiData?.data9) {
        const mapper = require("@/utils/pageDataMapper");
        updatedCareersPage = mapper.mapBackendToCareersState(apiData.data9, updatedCareersPage);
      }
      newState = { careerPage: updatedCareersPage };
    } else if (pageType === "blogs") {
      let updatedInsightsPage = WEBSITE_DATA.insightsPage;
      if (apiData?.data8) {
        const mapper = require("@/utils/pageDataMapper");
        updatedInsightsPage = mapper.mapBackendToBlogsState(apiData.data8, updatedInsightsPage);
      }
      newState = { insightsPage: updatedInsightsPage };
    } else if (pageType === "contact") {
      let updatedContactPage = WEBSITE_DATA.contactPage;
      if (apiData?.data10) {
        const mapper = require("@/utils/pageDataMapper");
        updatedContactPage = mapper.mapBackendToContactState(apiData.data10, updatedContactPage);
      }
      newState = { contactPage: updatedContactPage };
    } else if (pageType === "who-we-serve") {
      let updatedWhoWeServePage = WEBSITE_DATA.whoWeServePage;
      if (apiData?.data11) {
        const mapper = require("@/utils/pageDataMapper");
        updatedWhoWeServePage = mapper.mapBackendToWhoWeServeState(apiData.data11, updatedWhoWeServePage);
      }
      newState = { whoWeServePage: updatedWhoWeServePage };
    }
    
    return newState;
  };

  // SSR and Initial Client Hydration
  if (!initialized.current) {
    if (typeof window === 'undefined') {
      // On server, setState is fine since reactivity doesn't apply
      usePageData.setState({ details: { ...WEBSITE_DATA, ...updateStore() } } as any);
    } else {
      // On client, we must mutate the state directly to avoid "Cannot update a component while rendering" 
      // warning, while still ensuring child components (like HeroSection) render with the API data 
      // on their VERY FIRST pass to avoid Hydration Mismatch and CLS.
      usePageData.getState().details = { ...WEBSITE_DATA, ...updateStore() } as any;
    }
    initialized.current = true;
  }

  return null;
}
