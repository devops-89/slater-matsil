"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ArrowBack, ExpandMore, Save } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AboutUsForms, AboutUsPreviews } from "@/components/layouts/admin-layout/about-us-editor";
import { HomePageForms, HomePagePreviews } from "@/components/layouts/admin-layout/home-editor";
import { PracticeGroupsPageForms, PracticeGroupsPagePreviews } from "@/components/layouts/admin-layout/practice-groups-editor";
import { FirmProfessionalsPageForms, FirmProfessionalsPagePreviews } from "@/components/layouts/admin-layout/firm-professionals-editor";
import { ServicesPageForms, ServicesPagePreviews } from "@/components/layouts/admin-layout/services-editor";
import { WEBSITE_DATA } from "@/public/data/website-data";
import { usePageData } from "@/store/usePageData";

export default function AdminPageEditorLayout() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeSection, setActiveSection] = useState<number | false>(0);

  const { setDetails } = usePageData();
  const [websiteData, setWebsiteData] = useState<any>(WEBSITE_DATA);

  useEffect(() => {
    setDetails(WEBSITE_DATA as any);
  }, []);

  const updateHomepage = (key: string, newData: any) => {
    const updated = {
      ...websiteData,
      homepage: {
        ...websiteData.homepage,
        [key]: newData
      }
    };
    setWebsiteData(updated);
    setDetails(updated as any);
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
    setDetails(updated as any);
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
    setDetails(updated as any);
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
    setDetails(updated as any);
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
    setDetails(updated as any);
  };

  let sections = ["General Settings"];
  if (slug === "home") {
    sections = ["Hero Section", "About Section", "Metrics List", "Service Areas", "Who We Serve"];
  } else if (slug === "about-us") {
    sections = ["Hero Section", "Driving Innovation", "Patent Success", "Insights & Awards", "Who We Serve", "Industries"];
  } else if (slug === "services") {
    sections = ["Hero Section", "Why Choose Us", "Unparalleled Legal Services", "Service Framework"];
  } else if (slug === "practice-groups") {
    sections = ["Hero Section", "Practice Group Tabs"];
  } else if (slug === "firm-professionals") {
    sections = ["Hero Section"];
  }

  const handleAccordionChange = (panelIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveSection(isExpanded ? panelIndex : false);
  };

  const renderFormForSection = (index: number) => {
    if (slug === "home") {
      return <HomePageForms activeSection={index} websiteData={websiteData} updateHomepage={updateHomepage} />;
    } else if (slug === "about-us") {
      return <AboutUsForms activeSection={index} websiteData={websiteData} updateAboutPage={updateAboutPage} />;
    } else if (slug === "services") {
      return <ServicesPageForms activeSection={index} websiteData={websiteData} updateServicesPage={updateServicesPage} />;
    } else if (slug === "practice-groups") {
      return <PracticeGroupsPageForms activeSection={index} websiteData={websiteData} updatePracticeGroupsPage={updatePracticeGroupsPage} />;
    } else if (slug === "firm-professionals") {
      return <FirmProfessionalsPageForms activeSection={index} websiteData={websiteData} updateFirmProfessionalsPage={updateFirmProfessionalsPage} />;
    }
    return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Forms for {slug} are coming soon.</Typography>;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: COLORS.OFF_WHITE }}>
      
      {/* Left Sidebar (Forms Area) */}
      <Box sx={{ 
        width: 400, 
        flexShrink: 0, 
        borderRight: "1px solid rgba(0,0,0,0.1)", 
        backgroundColor: "#FFFFFF", 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: "4px 0 24px rgba(0,0,0,0.04)",
        zIndex: 10
      }}>
        {/* Header / Back Button */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(0,0,0,0.1)", display: 'flex', alignItems: 'center', gap: 2, backgroundColor: "#FFFFFF" }}>
          <Button 
            onClick={() => router.push('/pages')}
            sx={{ minWidth: 'auto', p: 1, color: COLORS.PRIMARY_BLUE, '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } }}
          >
            <ArrowBack />
          </Button>
          <Typography variant="h6" sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
            {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : ''} Editor
          </Typography>
        </Box>

        {/* Sections Accordions */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, backgroundColor: "#FAFAFA" }}>
          {sections.map((title, index) => (
            <Accordion 
              key={index} 
              expanded={activeSection === index} 
              onChange={handleAccordionChange(index)}
              disableGutters
              sx={{
                mb: 2,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeSection === index ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                '&:before': { display: 'none' },
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: activeSection === index ? COLORS.PRIMARY_GREEN : COLORS.TEXT_PRIMARY }} />}
                sx={{
                  backgroundColor: activeSection === index ? "#FFFFFF" : "#FFFFFF",
                  borderBottom: activeSection === index ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  '& .MuiAccordionSummary-content': { my: 2 }
                }}
              >
                <Typography sx={{ fontFamily: adelle.style.fontFamily, fontWeight: activeSection === index ? 700 : 400, color: activeSection === index ? COLORS.PRIMARY_BLUE : COLORS.TEXT_PRIMARY }}>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#FFFFFF", p: 3 }}>
                {renderFormForSection(index)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Footer / Save Button */}
        <Box sx={{ p: 3, borderTop: "1px solid rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" }}>
          <Button 
            fullWidth
            variant="contained" 
            startIcon={<Save />}
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
            Save Changes
          </Button>
        </Box>
      </Box>

      {/* Main Area (Preview Area) */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#E5E7EB", overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar for Preview */}
        <Box sx={{ px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
          <Typography sx={{ fontFamily: adelle.style.fontFamily, fontSize: 14, fontWeight: 700, color: COLORS.TEXT_PRIMARY }}>
            Live Preview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EF4444' }} />
             <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
             <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }} />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
           {slug === "home" ? (
             <HomePagePreviews activeSection={activeSection === false ? -1 : activeSection} websiteData={websiteData} />
           ) : slug === "about-us" ? (
             <AboutUsPreviews activeSection={activeSection === false ? -1 : activeSection} websiteData={websiteData} />
           ) : slug === "services" ? (
             <ServicesPagePreviews activeSection={activeSection === false ? -1 : activeSection} websiteData={websiteData} />
           ) : slug === "practice-groups" ? (
             <PracticeGroupsPagePreviews activeSection={activeSection === false ? -1 : activeSection} websiteData={websiteData} />
           ) : slug === "firm-professionals" ? (
             <FirmProfessionalsPagePreviews activeSection={activeSection === false ? -1 : activeSection} websiteData={websiteData} />
           ) : (
             <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: adelle.style.fontFamily, color: COLORS.TEXT_PRIMARY }}>Preview not built for {slug}.</Typography>
             </Box>
           )}
        </Box>
      </Box>

    </Box>
  );
}
