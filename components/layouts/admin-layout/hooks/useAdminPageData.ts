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
  mapInsightsStateToBackend,
  mapBackendToInsightsState,
  mapBackendToCareersState,
  mapBackendToContactState,
  mapBackendToWhoWeServeState,
  mapBackendToLegalPageState,
  mapBackendToAiPageState
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

        // 1. Fetch all pages to check if the current page already exists
        let allPages: any[] = [];
        try {
          let allRes;
          try {
            allRes = await PageControllers.getAllPages();
          } catch (e) {
            allRes = await PageControllers.getAllPublicPages();
          }
          allPages = allRes?.data?.data?.data || allRes?.data?.data || (Array.isArray(allRes?.data) ? allRes?.data : []);
        } catch (e) {
          console.warn("Could not fetch getAllPages:", e);
        }

        const slugMap: Record<string, string[]> = {
          home: ["home"],
          "about-us": ["about-us", "about"],
          ai: ["ai", "artificial-intelligence"],
          services: ["services"],
          "practice-groups": ["practice-groups"],
          professionals: ["firm-professionals", "professionals"],
          leadership: ["firm-leadership", "leadership"],
          insights: ["insights"],
          blogs: ["blogs", "blog"],
          careers: ["careers"],
          contact: ["contact-us", "contact"],
          "who-we-serve": ["who-we-serve"],
          "privacy-policy": ["privacy-policy"],
          "terms-of-use": ["terms-of-use"],
          disclaimer: ["disclaimer"],
        };

        const possibleSlugs = slugMap[slug as string] || [slug as string];
        const matchedPage = allPages.find((p: any) =>
          possibleSlugs.includes(p.slug?.toLowerCase())
        );

        // If the page does not exist in getAllPages, set pageId = null so save triggers POST /pages/create
        if (!matchedPage) {
          if (isMounted) {
            setPageId(null);
            setWebsiteData(WEBSITE_DATA);
            setInitialWebsiteData(WEBSITE_DATA);
            setDetails(WEBSITE_DATA as any);
          }
          return;
        }

        const resolvedPageId = matchedPage.id;
        if (isMounted) {
          setPageId(resolvedPageId);
        }

        // 2. Load and map page-specific content
        if (slug === "home") {
          const [res1, res3] = await Promise.all([
            PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } })),
            PageControllers.getPageById(3).catch(() => ({ data: { data: null } }))
          ]);
          const pageData1 = res1.data?.data?.data || res1.data?.data || matchedPage;
          const pageData3 = res3.data?.data?.data || res3.data?.data;

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
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;
          if (pageData && isMounted) {
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
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;
          if (pageData && isMounted) {
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
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;
          if (pageData && isMounted) {
            const updatedPracticeGroupPage = mapBackendToPracticeGroupsState(pageData, WEBSITE_DATA.practiceGroupPage);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              practiceGroupPage: updatedPracticeGroupPage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "professionals") {
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;

          if (pageData && isMounted) {
            const updatedFirmProfessionalsPage = mapBackendToFirmProfessionalsState(pageData, WEBSITE_DATA.firm_professionals);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              firm_professionals: updatedFirmProfessionalsPage
            };
            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "leadership") {
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;

          if (pageData && isMounted) {
            const updatedFirmLeadershipPage = mapBackendToFirmLeadershipState(pageData, WEBSITE_DATA.firm_leadership);
            setWebsiteData({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage });
            setInitialWebsiteData({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage });
            setDetails({ ...WEBSITE_DATA, firm_leadership: updatedFirmLeadershipPage } as any);
          }
        } else if (slug === "blogs") {
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;

          if (pageData && isMounted) {
            const updatedBlogsPage = mapBackendToBlogsState(pageData, WEBSITE_DATA.insightsPage);
            setWebsiteData({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage });
            setInitialWebsiteData({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage });
            setDetails({ ...WEBSITE_DATA, insightsPage: updatedBlogsPage } as any);
          }
        } else if (["careers", "contact", "who-we-serve", "privacy-policy", "terms-of-use", "disclaimer", "insights", "ai"].includes(slug as string)) {
          const res = await PageControllers.getPageById(resolvedPageId).catch(() => ({ data: { data: matchedPage } }));
          const pageData = res.data?.data?.data || res.data?.data || matchedPage;

          if (pageData && isMounted) {
            let mergedWebsiteData = { ...WEBSITE_DATA };

            if (slug === "insights") {
              mergedWebsiteData.insightsPage = mapBackendToInsightsState(pageData, WEBSITE_DATA.insightsPage);
            } else if (slug === "careers") {
              mergedWebsiteData.careerPage = mapBackendToCareersState(pageData, WEBSITE_DATA.careerPage);
            } else if (slug === "contact") {
              mergedWebsiteData.contactPage = mapBackendToContactState(pageData, WEBSITE_DATA.contactPage);
            } else if (slug === "who-we-serve") {
              mergedWebsiteData.whoWeServePage = mapBackendToWhoWeServeState(pageData, WEBSITE_DATA.whoWeServePage);
            } else if (slug === "privacy-policy") {
              mergedWebsiteData.privacyPolicy = mapBackendToLegalPageState(pageData, WEBSITE_DATA.privacyPolicy, "privacyPolicy_content");
            } else if (slug === "terms-of-use") {
              mergedWebsiteData.termsOfUse = mapBackendToLegalPageState(pageData, WEBSITE_DATA.termsOfUse, "termsOfUse_content");
            } else if (slug === "disclaimer") {
              mergedWebsiteData.disclaimer = mapBackendToLegalPageState(pageData, WEBSITE_DATA.disclaimer, "disclaimer_content");
            } else if (slug === "ai") {
              mergedWebsiteData.aiPage = mapBackendToAiPageState(pageData, WEBSITE_DATA.aiPage);
            }

            setWebsiteData(mergedWebsiteData);
            setInitialWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
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

  const updateAiPage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      aiPage: {
        ...websiteData.aiPage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
  };

  return {
    websiteData,
    initialWebsiteData,
    debouncedWebsiteData,
    pageId,
    setPageId,
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
    updateLegalPage,
    updateAiPage
  };
};
