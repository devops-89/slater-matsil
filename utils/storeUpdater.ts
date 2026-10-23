import { WEBSITE_DATA } from "@/public/data/website-data";
import { mapBackendToAboutPageState, mapBackendToBlogsState, mapBackendToCareersState, mapBackendToContactState, mapBackendToFirmLeadershipState, mapBackendToFirmProfessionalsState, mapBackendToHomepageState, mapBackendToInsightsState, mapBackendToPracticeGroupsState, mapBackendToServicesPageState, mapBackendToWhoWeServeState } from "@/utils/pageDataMapper";

export const getUpdatedDetails = (pageType: string, apiData: any) => {
  let newState: any = {};
  if (pageType === "home") {
    let updatedHomepage = WEBSITE_DATA.homepage;
    if (apiData?.data1) updatedHomepage = mapBackendToHomepageState(apiData.data1, updatedHomepage);
    if (apiData?.data3) {
      const { newServiceArea } = mapBackendToServicesPageState(apiData.data3, WEBSITE_DATA.servicesPage, updatedHomepage.service_area);
      updatedHomepage.service_area = newServiceArea;
    }
    newState = { homepage: updatedHomepage };
  } else if (pageType === "about") {
    let updatedAboutPage = WEBSITE_DATA.aboutPage;
    if (apiData?.data2) updatedAboutPage = mapBackendToAboutPageState(apiData.data2, updatedAboutPage);
    newState = { aboutPage: updatedAboutPage };
  } else if (pageType === "professionals") {
    let updatedProfPage: any = {};
    if (apiData?.data5) updatedProfPage = mapBackendToFirmProfessionalsState(apiData.data5, updatedProfPage);
    if (apiData?.initialProfessionals) {
      updatedProfPage.initialProfessionals = apiData.initialProfessionals;
      updatedProfPage.initialTotal = apiData.initialTotal;
    }
    newState = { firm_professionals: updatedProfPage };
  } else if (pageType === "insights") {
    let updatedInsightsPage = WEBSITE_DATA.insightsPage;
    if (apiData?.data7) updatedInsightsPage = mapBackendToInsightsState(apiData.data7, updatedInsightsPage);
    newState = { insightsPage: updatedInsightsPage };
  } else if (pageType === "services") {
    let updatedServicesPage = WEBSITE_DATA.servicesPage;
    let updatedHomepage = WEBSITE_DATA.homepage;
    if (apiData?.data3) {
      const { newServicesPage, newServiceArea } = mapBackendToServicesPageState(apiData.data3, updatedServicesPage, updatedHomepage.service_area);
      updatedServicesPage = newServicesPage;
      updatedHomepage.service_area = newServiceArea;
    }
    newState = { servicesPage: updatedServicesPage, homepage: updatedHomepage };
  } else if (pageType === "leadership") {
    let updatedFirmLeadershipPage = WEBSITE_DATA.firm_leadership;
    if (apiData?.data6) updatedFirmLeadershipPage = mapBackendToFirmLeadershipState(apiData.data6, updatedFirmLeadershipPage);
    newState = { firm_leadership: updatedFirmLeadershipPage };
  } else if (pageType === "practiceGroups") {
    let updatedPracticeGroupPage = WEBSITE_DATA.practiceGroupPage;
    if (apiData?.data4) updatedPracticeGroupPage = mapBackendToPracticeGroupsState(apiData.data4, updatedPracticeGroupPage);
    newState = { practiceGroupPage: updatedPracticeGroupPage };
  } else if (pageType === "careers") {
    let updatedCareersPage = WEBSITE_DATA.careerPage;
    if (apiData?.data9) updatedCareersPage = mapBackendToCareersState(apiData.data9, updatedCareersPage);
    newState = { careerPage: updatedCareersPage };
  } else if (pageType === "blogs") {
    let updatedInsightsPage = WEBSITE_DATA.insightsPage;
    if (apiData?.data8) updatedInsightsPage = mapBackendToBlogsState(apiData.data8, updatedInsightsPage);
    newState = { insightsPage: updatedInsightsPage };
  } else if (pageType === "contact") {
    let updatedContactPage = WEBSITE_DATA.contactPage;
    if (apiData?.data10) updatedContactPage = mapBackendToContactState(apiData.data10, updatedContactPage);
    newState = { contactPage: updatedContactPage };
  } else if (pageType === "who-we-serve") {
    let updatedWhoWeServePage = WEBSITE_DATA.whoWeServePage;
    if (apiData?.data11) updatedWhoWeServePage = mapBackendToWhoWeServeState(apiData.data11, updatedWhoWeServePage);
    newState = { whoWeServePage: updatedWhoWeServePage };
  }
  return { ...WEBSITE_DATA, ...newState };
};
