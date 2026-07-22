"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToHomepageState, mapBackendToServicesPageState, mapBackendToAboutPageState } from "@/utils/pageDataMapper";

type StoreInitializerProps = {
  pageType: "home" | "about" | "professionals" | "insights" | "services" | "leadership" | "practiceGroups";
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
      let updatedProfPage = WEBSITE_DATA.firm_professionals;
      if (apiData?.data5) {
        const mapper = require("@/utils/pageDataMapper");
        updatedProfPage = mapper.mapBackendToFirmProfessionalsState(apiData.data5, updatedProfPage);
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
    }
    
    return newState;
  };

  // SSR and Initial Client Hydration
  if (!initialized.current && typeof window === "undefined") {
    usePageData.setState({ details: { ...WEBSITE_DATA, ...updateStore() } } as any);
    initialized.current = true;
  }

  if (!initialized.current && typeof window !== "undefined" && !isClientInitialized) {
    usePageData.setState({ details: { ...WEBSITE_DATA, ...updateStore() } } as any);
    initialized.current = true;
    isClientInitialized = true;
  }

  // Client-Side Navigations
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  
  useIsomorphicLayoutEffect(() => {
    if (!initialized.current) {
      usePageData.setState({ details: { ...WEBSITE_DATA, ...updateStore() } } as any);
      initialized.current = true;
    }
  }, []);

  return null;
}
