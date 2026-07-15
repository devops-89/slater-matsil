import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePageData } from "@/store/usePageData";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { useEffect, useState } from "react";
import {
  mapBackendToHomepageState,
  mapBackendToServicesPageState,
  mapBackendToAboutPageState,
  mapBackendToPracticeGroupsState,
  mapBackendToFirmProfessionalsState,
  mapBackendToFirmLeadershipState,
  mapBackendToBlogsState,
  mapBackendToInsightsState,
  mapBackendToCareersState,
  mapBackendToContactState,
  mapBackendToWhoWeServeState,
  mapBackendToLegalPageState
} from "@/utils/pageDataMapper";

export const useAdminPageData = (slug: string) => {
  const { startLoading, stopLoading } = useLoading();
  const { setDetails } = usePageData();
  const [websiteData, setWebsiteData] = useState<any>(WEBSITE_DATA);
  const [initialWebsiteData, setInitialWebsiteData] = useState<any>(WEBSITE_DATA);
  const [debouncedWebsiteData, setDebouncedWebsiteData] = useState<any>(WEBSITE_DATA);
  const [pageId, setPageId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedWebsiteData(websiteData);
      setDetails(websiteData as any);
    }, 300);
    return () => clearTimeout(timer);
  }, [websiteData, setDetails]);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        startLoading();

        if (slug === "home") {
          const [res1, res3] = await Promise.all([
            PageControllers.getPageById(1).catch(e => ({ data: { data: null } })),
            PageControllers.getPageById(3).catch(e => ({ data: { data: null } }))
          ]);
          const pageData1 = res1.data?.data?.data || res1.data?.data;
          const pageData3 = res3.data?.data?.data || res3.data?.data;
          
          if (pageData1 && isMounted) {
            setPageId(pageData1.id || 1);
          }
          
          if (isMounted) {
            let updatedHomepage = WEBSITE_DATA.homepage;
            
            if (pageData1) {
              updatedHomepage = mapBackendToHomepageState(pageData1, updatedHomepage);
            }
            
            if (pageData3) {
              const { newServiceArea } = mapBackendToServicesPageState(pageData3, WEBSITE_DATA.servicesPage, updatedHomepage.service_area);
              updatedHomepage.service_area = newServiceArea;
            }

            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              homepage: updatedHomepage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "about-us") {
          const res = await PageControllers.getPageById(2).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          if (pageData && isMounted) {
            setPageId(pageData.id || 2);
            const updatedAboutPage = mapBackendToAboutPageState(pageData, WEBSITE_DATA.aboutPage);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              aboutPage: updatedAboutPage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "services") {
          const res = await PageControllers.getPageById(3).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          if (pageData && isMounted) {
            setPageId(pageData.id || 3);
            const { newServicesPage, newServiceArea } = mapBackendToServicesPageState(pageData, WEBSITE_DATA.servicesPage, WEBSITE_DATA.homepage.service_area);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              servicesPage: newServicesPage,
              homepage: {
                ...WEBSITE_DATA.homepage,
                service_area: newServiceArea
              }
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "practice-groups") {
          const res = await PageControllers.getPageById(4).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          if (pageData && isMounted) {
            setPageId(pageData.id);
            const updatedPracticeGroupPage = mapBackendToPracticeGroupsState(pageData, WEBSITE_DATA.practiceGroupPage);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              practiceGroupPage: updatedPracticeGroupPage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          } else if (!pageData && isMounted) {
            setPageId(null);
            setDetails(WEBSITE_DATA as any);
            setInitialWebsiteData(WEBSITE_DATA as any);
          }
        } else if (slug === "firm-professionals") {
          const res = await PageControllers.getPageById(5).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          
          if (pageData && isMounted) {
            setPageId(pageData.id || 5);
            const updatedFirmProfessionalsPage = mapBackendToFirmProfessionalsState(pageData, WEBSITE_DATA.firm_professionals);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              firm_professionals: updatedFirmProfessionalsPage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          } else if (isMounted) {
            setPageId(5);
            setDetails(WEBSITE_DATA as any);
            setInitialWebsiteData(WEBSITE_DATA as any);
          }
        } else if (slug === "firm-leadership") {
          const res = await PageControllers.getPageById(6).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          
          if (pageData && isMounted) {
            setPageId(pageData.id || 6);
            const updatedFirmLeadershipPage = mapBackendToFirmLeadershipState(pageData, WEBSITE_DATA.firm_leadership);
            setWebsiteData({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage });
            setInitialWebsiteData({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage });
            setDetails({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage } as any);
          } else if (isMounted) {
            setPageId(6); 
            setDetails(WEBSITE_DATA as any);
            setInitialWebsiteData(WEBSITE_DATA as any);
          }
        } else if (slug === "blogs") {
          const res = await PageControllers.getPageById(8).catch(e => ({ data: { data: null } }));
          const pageData = res.data?.data?.data || res.data?.data;
          
          if (pageData && isMounted) {
            setPageId(pageData.id || 8);
            const updatedBlogsPage = mapBackendToBlogsState(pageData, WEBSITE_DATA.insightsPage);
            setWebsiteData({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage });
            setInitialWebsiteData({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage });
            setDetails({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage } as any);
          } else if (isMounted) {
            setPageId(8); 
            setDetails(WEBSITE_DATA as any);
            setInitialWebsiteData(WEBSITE_DATA as any);
          }
        } else if (["careers", "contact-us", "who-we-serve", "privacy-policy", "terms-of-use", "disclaimer", "insights"].includes(slug as string)) {
          const PAGE_IDS: Record<string, number> = {
            "insights": 7,
            "careers": 9,
            "contact-us": 10,
            "who-we-serve": 11,
            "privacy-policy": 12,
            "terms-of-use": 13,
            "disclaimer": 14
          };
          const targetId = PAGE_IDS[slug as string];
          let pageData = null;
          
          if (targetId) {
            const res = await PageControllers.getPageById(targetId).catch(e => ({ data: { data: null } }));
            pageData = res.data?.data?.data || res.data?.data;
          }

          if (pageData && isMounted) {
            setPageId(pageData.id || targetId);
            let mergedWebsiteData = { ...WEBSITE_DATA };

            if (slug === "insights") {
              mergedWebsiteData.insightsPage = mapBackendToInsightsState(pageData, WEBSITE_DATA.insightsPage);
            } else if (slug === "careers") {
              mergedWebsiteData.careerPage = mapBackendToCareersState(pageData, WEBSITE_DATA.careerPage);
            } else if (slug === "contact-us") {
              mergedWebsiteData.contactPage = mapBackendToContactState(pageData, WEBSITE_DATA.contactPage);
            } else if (slug === "who-we-serve") {
              mergedWebsiteData.whoWeServePage = mapBackendToWhoWeServeState(pageData, WEBSITE_DATA.whoWeServePage);
            } else if (slug === "privacy-policy") {
              mergedWebsiteData.privacyPolicy = mapBackendToLegalPageState(pageData, WEBSITE_DATA.privacyPolicy, "privacyPolicy_content");
            } else if (slug === "terms-of-use") {
              mergedWebsiteData.termsOfUse = mapBackendToLegalPageState(pageData, WEBSITE_DATA.termsOfUse, "termsOfUse_content");
            } else if (slug === "disclaimer") {
              mergedWebsiteData.disclaimer = mapBackendToLegalPageState(pageData, WEBSITE_DATA.disclaimer, "disclaimer_content");
            }

            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          } else if (isMounted) {
            setPageId(targetId);
            setDetails(WEBSITE_DATA as any);
            setInitialWebsiteData(WEBSITE_DATA as any);
          }
        } else {
          setDetails(WEBSITE_DATA as any);
          setInitialWebsiteData(WEBSITE_DATA as any);
        }
      } catch (error) {
        console.error("Error fetching page data", error);
        setDetails(WEBSITE_DATA as any);
      } finally {
        stopLoading();
      }
    };
    
    fetchPageData();
    
    return () => {
      isMounted = false;
    };
  }, [slug, setDetails]);

  const updateHomepage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      homepage: {
        ...websiteData.homepage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateAboutPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      aboutPage: {
        ...websiteData.aboutPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateServicesPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      servicesPage: {
        ...websiteData.servicesPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateServiceAreas = (newData: any) => {
    const updated = {
      ...websiteData,
      homepage: {
        ...websiteData.homepage,
        service_area: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateFirmProfessionalsPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      firm_professionals: {
        ...websiteData.firm_professionals,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateFirmLeadershipPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      firm_leadership: {
        ...websiteData.firm_leadership,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updatePracticeGroupsPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      practiceGroupPage: {
        ...websiteData.practiceGroupPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateInsightsPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      insightsPage: {
        ...websiteData.insightsPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateCareerPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      careerPage: {
        ...websiteData.careerPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateContactPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      contactPage: {
        ...websiteData.contactPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateWhoWeServePage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      whoWeServePage: {
        ...websiteData.whoWeServePage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  const updateLegalPage = (pageKey: string, newData: any) => {
    const updated = {
      ...websiteData,
      [pageKey]: newData
    };
    setWebsiteData(updated);
  };

  return {
    websiteData,
    initialWebsiteData,
    debouncedWebsiteData,
    pageId,
    setInitialWebsiteData,
    updateHomepage,
    updateAboutPage,
    updateServicesPage,
    updateServiceAreas,
    updateFirmProfessionalsPage,
    updateFirmLeadershipPage,
    updatePracticeGroupsPage,
    updateInsightsPage,
    updateCareerPage,
    updateContactPage,
    updateWhoWeServePage,
    updateLegalPage
  };
};
