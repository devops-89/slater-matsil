"use client";

import { PageControllers } from "@/api/pageControllers";
import { MediaControllers } from "@/api/mediaControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { mapAboutPageStateToBackend, mapBackendToAboutPageState, mapBackendToHomepageState, mapHomepageStateToBackend } from "@/utils/pageDataMapper";
import { ArrowBack, ExpandMore, Save } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
  import { useEffect, useState, useMemo, useRef } from "react";
import * as yup from "yup";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loadingData from "@/public/images/loading2.json";
import { useLoading } from "@/components/providers/LoadingProvider";

import dynamic from 'next/dynamic';
import { WEBSITE_DATA } from "@/public/data/website-data";

const LoadingFallback = () => <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;

const AboutUsForms = dynamic(() => import('@/components/layouts/admin-layout/about-us-editor').then(mod => mod.AboutUsForms), { loading: LoadingFallback });
const AboutUsPreviews = dynamic(() => import('@/components/layouts/admin-layout/about-us-editor').then(mod => mod.AboutUsPreviews), { loading: LoadingFallback });

const BlogsPageForms = dynamic(() => import('@/components/layouts/admin-layout/blogs-editor').then(mod => mod.BlogsPageForms), { loading: LoadingFallback });
const BlogsPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/blogs-editor').then(mod => mod.BlogsPagePreviews), { loading: LoadingFallback });

const CareersPageForms = dynamic(() => import('@/components/layouts/admin-layout/careers-editor').then(mod => mod.CareersPageForms), { loading: LoadingFallback });
const CareersPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/careers-editor').then(mod => mod.CareersPagePreviews), { loading: LoadingFallback });

const ContactPageForms = dynamic(() => import('@/components/layouts/admin-layout/contact-us-editor').then(mod => mod.ContactPageForms), { loading: LoadingFallback });
const ContactPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/contact-us-editor').then(mod => mod.ContactPagePreviews), { loading: LoadingFallback });

const FirmLeadershipPageForms = dynamic(() => import('@/components/layouts/admin-layout/firm-leadership-editor').then(mod => mod.FirmLeadershipPageForms), { loading: LoadingFallback });
const FirmLeadershipPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/firm-leadership-editor').then(mod => mod.FirmLeadershipPagePreviews), { loading: LoadingFallback });

const FirmProfessionalsPageForms = dynamic(() => import('@/components/layouts/admin-layout/firm-professionals-editor').then(mod => mod.FirmProfessionalsPageForms), { loading: LoadingFallback });
const FirmProfessionalsPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/firm-professionals-editor').then(mod => mod.FirmProfessionalsPagePreviews), { loading: LoadingFallback });

const HomePageForms = dynamic(() => import('@/components/layouts/admin-layout/home-editor').then(mod => mod.HomePageForms), { loading: LoadingFallback });
const HomePagePreviews = dynamic(() => import('@/components/layouts/admin-layout/home-editor').then(mod => mod.HomePagePreviews), { loading: LoadingFallback });

const InsightsPageForms = dynamic(() => import('@/components/layouts/admin-layout/insights-editor').then(mod => mod.InsightsPageForms), { loading: LoadingFallback });
const InsightsPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/insights-editor').then(mod => mod.InsightsPagePreviews), { loading: LoadingFallback });

const PracticeGroupsPageForms = dynamic(() => import('@/components/layouts/admin-layout/practice-groups-editor').then(mod => mod.PracticeGroupsPageForms), { loading: LoadingFallback });
const PracticeGroupsPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/practice-groups-editor').then(mod => mod.PracticeGroupsPagePreviews), { loading: LoadingFallback });

const ServicesPageForms = dynamic(() => import('@/components/layouts/admin-layout/services-editor').then(mod => mod.ServicesPageForms), { loading: LoadingFallback });
const ServicesPagePreviews = dynamic(() => import('@/components/layouts/admin-layout/services-editor').then(mod => mod.ServicesPagePreviews), { loading: LoadingFallback });

const WhoWeServePageForms = dynamic(() => import('@/components/layouts/admin-layout/who-we-serve-editor').then(mod => mod.WhoWeServePageForms), { loading: LoadingFallback });
const WhoWeServePagePreviews = dynamic(() => import('@/components/layouts/admin-layout/who-we-serve-editor').then(mod => mod.WhoWeServePagePreviews), { loading: LoadingFallback });

const LegalPagesForms = dynamic(() => import('@/components/layouts/admin-layout/legal-pages-editor').then(mod => mod.LegalPagesForms), { loading: LoadingFallback });
const LegalPagesPreviews = dynamic(() => import('@/components/layouts/admin-layout/legal-pages-editor').then(mod => mod.LegalPagesPreviews), { loading: LoadingFallback });
import { usePageData } from "@/store/usePageData";

export default function AdminPageEditorLayout() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeSection, setActiveSection] = useState<number | false>(0);
  const [pageId, setPageId] = useState<number | null>(null);
  const [deletedMediaKeys, setDeletedMediaKeys] = useState<string[]>([]);
  const { startLoading, stopLoading } = useLoading();

  const { setDetails } = usePageData();
  const [websiteData, setWebsiteData] = useState<any>(WEBSITE_DATA);
  const [debouncedWebsiteData, setDebouncedWebsiteData] = useState<any>(WEBSITE_DATA);
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedWebsiteData(websiteData);
      setDetails(websiteData as any);
    }, 300);
    return () => clearTimeout(timer);
  }, [websiteData, setDetails]);

  const homePageSchema = yup.object().shape({
    homepage: yup.object().shape({
      aboutSection: yup.object().shape({
        heading: yup.string().required("About section heading is required"),
        description: yup.string().required("About section description is required"),
      }),
    })
  });

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate with Yup
        let payload: any = null;

        if (slug === "home") {
          await homePageSchema.validate(websiteData, { abortEarly: false });
          payload = {
            title: "Home",
            slug: "home",
            pageType: "static",
            status: "published",
            sections: mapHomepageStateToBackend(websiteData.homepage)
          };
        } else if (slug === "about-us") {
          payload = {
            title: "About Us",
            slug: "about-us",
            pageType: "static",
            status: "published",
            sections: mapAboutPageStateToBackend(websiteData.aboutPage)
          };
        }

        if (payload) {
          if (pageId) {
            await PageControllers.updatePage(pageId, payload);
            showNotification(`${payload.title} page updated successfully`, "success");
          } else {
            const createRes = await PageControllers.createPage(payload);
            const newPageData = createRes.data?.data?.data || createRes.data?.data;
            if (newPageData?.id) {
               setPageId(newPageData.id);
            }
            showNotification(`${payload.title} page created successfully`, "success");
          }

          // Permanently delete any tracked media from S3 now that save is successful
          if (deletedMediaKeys.length > 0) {
            await Promise.all(
              deletedMediaKeys.map(async (key) => {
                try {
                  await MediaControllers.removeMedia({ key });
                } catch (e) {
                  console.error("Failed to delete media key:", key);
                }
              })
            );
            setDeletedMediaKeys([]); // Clear out after deletion
          }
        } else {
          showNotification(`${slug} save not implemented yet`, "info");
        }
      } catch (error: any) {
      if (error.name === "ValidationError") {
        showNotification(error.inner[0]?.message || "Validation failed", "error");
      } else {
        showNotification("Failed to save page", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchedSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (fetchedSlugRef.current === slug) return;
    fetchedSlugRef.current = slug;

    let isMounted = true;
    const fetchPageData = async () => {
      try {
        startLoading();
        if (slug === "home") {
          const res = await PageControllers.getPageById(1);
          const pageData = res.data?.data?.data || res.data?.data;
          if (pageData && isMounted) {
            setPageId(pageData.id);
            const updatedHomepage = mapBackendToHomepageState(pageData, WEBSITE_DATA.homepage);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              homepage: updatedHomepage
            };
            setWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else if (slug === "about-us") {
          const res = await PageControllers.getPageById(2);
          const pageData = res.data?.data?.data || res.data?.data;
          if (pageData && isMounted) {
            setPageId(pageData.id);
            const updatedAboutPage = mapBackendToAboutPageState(pageData, WEBSITE_DATA.aboutPage);
            const mergedWebsiteData = {
              ...WEBSITE_DATA,
              aboutPage: updatedAboutPage
            };
            setWebsiteData(mergedWebsiteData);
            setDetails(mergedWebsiteData as any);
          }
        } else {
          setDetails(WEBSITE_DATA as any);
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

  let sections = ["General Settings"];
  if (slug === "home") {
    sections = ["Hero Section", "About Section", "Metrics List", "Who We Serve"];
  } else if (slug === "about-us") {
    sections = ["Hero Section", "Driving Innovation", "Patent Success", "Insights & Awards", "Who We Serve", "Industries"];
  } else if (slug === "services") {
    sections = ["Hero Section", "Why Choose Us", "Unparalleled Legal Services", "Service Framework", "Service Areas"];
  } else if (slug === "practice-groups") {
    sections = ["Hero Section", "Practice Group Tabs"];
  } else if (slug === "firm-professionals") {
    sections = ["Hero Section"];
  } else if (slug === "firm-leadership") {
    sections = ["Hero Section", "Firm Mission", "Partners", "Patent Agents", "Administration"];
  } else if (slug === "insights") {
    sections = ["Hero Section", "Quick Links"];
  } else if (slug === "blogs") {
    sections = ["Hero Section"];
  } else if (slug === "careers") {
    sections = ["Hero Section", "Work With Us", "Open Roles"];
  } else if (slug === "contact-us") {
    sections = ["Hero Section", "Contact Form", "Contact Cards", "Social Follow"];
  } else if (slug === "who-we-serve") {
    sections = ["Hero Section", "About Section", "Serve Tabs"];
  } else if (slug === "privacy-policy" || slug === "terms-of-use" || slug === "disclaimer") {
    sections = ["Page Header", "Content Sections"];
  }

  const handleAccordionChange = (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveSection(isExpanded ? panelIndex : false);
  };

  const renderFormForSection = (index: number) => {
    const handleMediaDelete = (key: string) => setDeletedMediaKeys(prev => [...prev, key]);

    if (slug === "home") {
      return <HomePageForms activeSection={index} websiteData={websiteData} updateHomepage={updateHomepage} onDeleteMedia={handleMediaDelete} />;
    } else if (slug === "about-us") {
      return <AboutUsForms activeSection={index} websiteData={websiteData} updateAboutPage={updateAboutPage} />;
    } else if (slug === "services") {
      return <ServicesPageForms activeSection={index} websiteData={websiteData} updateServicesPage={updateServicesPage} updateServiceAreas={updateServiceAreas} />;
    } else if (slug === "practice-groups") {
      return <PracticeGroupsPageForms activeSection={index} websiteData={websiteData} updatePracticeGroupsPage={updatePracticeGroupsPage} />;
    } else if (slug === "firm-professionals") {
      return <FirmProfessionalsPageForms activeSection={index} websiteData={websiteData} updateFirmProfessionalsPage={updateFirmProfessionalsPage} />;
    } else if (slug === "firm-leadership") {
      return <FirmLeadershipPageForms activeSection={index} websiteData={websiteData} updateFirmLeadershipPage={updateFirmLeadershipPage} />;
    } else if (slug === "insights") {
      return <InsightsPageForms activeSection={index} websiteData={websiteData} updateInsightsPage={updateInsightsPage} />;
    } else if (slug === "blogs") {
      return <BlogsPageForms activeSection={index} websiteData={websiteData} updateInsightsPage={updateInsightsPage} />;
    } else if (slug === "careers") {
      return <CareersPageForms activeSection={index} websiteData={websiteData} updateCareerPage={updateCareerPage} />;
    } else if (slug === "contact-us") {
      return <ContactPageForms activeSection={index} websiteData={websiteData} updateContactPage={updateContactPage} />;
    } else if (slug === "who-we-serve") {
      return <WhoWeServePageForms activeSection={index} websiteData={websiteData} updateWhoWeServePage={updateWhoWeServePage} />;
    } else if (slug === "privacy-policy") {
      return <LegalPagesForms activeSection={index} data={websiteData.privacyPolicy} onChange={(newData: any) => updateLegalPage("privacyPolicy", newData)} />;
    } else if (slug === "terms-of-use") {
      return <LegalPagesForms activeSection={index} data={websiteData.termsOfUse} onChange={(newData: any) => updateLegalPage("termsOfUse", newData)} />;
    } else if (slug === "disclaimer") {
      return <LegalPagesForms activeSection={index} data={websiteData.disclaimer} onChange={(newData: any) => updateLegalPage("disclaimer", newData)} />;
    }
    return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Forms for {slug} are coming soon.</Typography>;
  };

  const previewContainer = useMemo(() => {
    if (slug === "home") {
      return <HomePagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "about-us") {
      return <AboutUsPreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "services") {
      return <ServicesPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "practice-groups") {
      return <PracticeGroupsPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "firm-professionals") {
      return <FirmProfessionalsPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "firm-leadership") {
      return <FirmLeadershipPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "insights") {
      return <InsightsPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "blogs") {
      return <BlogsPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "careers") {
      return <CareersPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "contact-us") {
      return <ContactPagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "who-we-serve") {
      return <WhoWeServePagePreviews activeSection={activeSection} websiteData={debouncedWebsiteData} />;
    } else if (slug === "privacy-policy" || slug === "terms-of-use" || slug === "disclaimer") {
      return <LegalPagesPreviews />;
    }
    return (
      <Box sx={{ border: "2px dashed #ccc", p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography>Preview for {slug} will appear here.</Typography>
      </Box>
    );
  }, [slug, activeSection, debouncedWebsiteData]);

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      height: '100vh', // Force 100vh so window doesn't scroll
      width: '100%',
      overflow: { xs: 'auto', lg: 'hidden' },
      backgroundColor: COLORS.OFF_WHITE
    }}>
      
      {/* Left Sidebar (Forms Area) */}
      <Box sx={{ 
        width: { xs: '100%', lg: 400 },
        maxHeight: { xs: 'none', lg: '100vh' },
        flexShrink: 0, 
        borderRight: { xs: 'none', lg: "1px solid rgba(0,0,0,0.1)" },
        borderBottom: { xs: "1px solid rgba(0,0,0,0.1)", lg: 'none' },
        backgroundColor: "#FFFFFF", 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: "4px 0 24px rgba(0,0,0,0.04)",
        zIndex: 10
      }}>
        {/* Header / Back Button */}
        <Box sx={{ p: { xs: 2, sm: 3 }, borderBottom: "1px solid rgba(0,0,0,0.1)", display: 'flex', alignItems: 'center', gap: 2, backgroundColor: "#FFFFFF", minWidth: 0 }}>
          <Button 
            onClick={() => router.push('/pages')}
            sx={{ minWidth: 'auto', p: 1, color: COLORS.PRIMARY_BLUE, '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
          >
            <ArrowBack />
          </Button>
          <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700, fontSize: { xs: 18, sm: 20 }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : ''} Editor
          </Typography>
        </Box>

        {/* Sections Accordions */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 1.5, sm: 2 }, backgroundColor: "#FAFAFA" }}>
          {sections.map((title, index) => (
            <Accordion 
              key={index} 
              expanded={activeSection === index} 
              onChange={handleAccordionChange(index)}
              disableGutters
              sx={{
                mb: 2,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeSection === index ? '0 4px 16px rgba(0,0,0,0.05)' : 'none',
                '&:before': { display: 'none' },
                borderRadius: '12px !important',
                transition: 'all 0.2s ease',
                '&.Mui-expanded': {
                  margin: '0 0 16px 0 !important',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: activeSection === index ? COLORS.PRIMARY_GREEN : COLORS.TEXT_PRIMARY }} />}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderBottom: activeSection === index ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  minHeight: "56px !important",
                  '& .MuiAccordionSummary-content': { 
                    my: 0,
                  },
                  '& .MuiAccordionSummary-content.Mui-expanded': { 
                    my: 0,
                  },
                  '&.Mui-expanded': { 
                    minHeight: "56px !important",
                  }
                }}
              >
                <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: activeSection === index ? 700 : 400, color: activeSection === index ? COLORS.PRIMARY_BLUE : COLORS.TEXT_PRIMARY }}>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#FFFFFF", p: { xs: 2, sm: 3 } }}>
                {renderFormForSection(index)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Footer / Save Button */}
        <Box sx={{ p: { xs: 2, sm: 3 }, borderTop: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF", position: { xs: 'sticky', lg: 'static' }, bottom: 0 }}>
          <Button 
            fullWidth
            variant="contained" 
            startIcon={<Save />}
            onClick={handleSave}
            disabled={isSubmitting}
            sx={{ 
              backgroundColor: COLORS.PRIMARY_GREEN, 
              color: COLORS.WHITE, 
              fontFamily: tradeGothic.style.fontFamily, 
              fontWeight: 700, 
              borderRadius: "50px", 
              py: 1.5, 
              "&:hover": { backgroundColor: COLORS.PRIMARY_BLUE },
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)"
            }}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>

      {/* Main Area (Preview Area) */}
      <Box sx={{ flexGrow: 1, minWidth: 0, minHeight: { xs: 520, lg: 'auto' }, backgroundColor: "#E5E7EB", overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar for Preview */}
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Typography sx={{ fontFamily: adelle.style.fontFamily, fontSize: 14, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
            Live Preview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', minWidth: 0 }}>
          {previewContainer}
        </Box>
      </Box>

    </Box>
    </>
  );
}
