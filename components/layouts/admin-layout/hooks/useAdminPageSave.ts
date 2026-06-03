import { MediaControllers } from "@/api/mediaControllers";
import { PageControllers } from "@/api/pageControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import * as yup from "yup";
import {
  mapHomepageStateToBackend,
  mapAboutPageStateToBackend,
  mapServicesPageStateToBackend,
  mapPracticeGroupsStateToBackend,
  mapFirmProfessionalsStateToBackend,
  mapFirmLeadershipStateToBackend,
  mapBlogsStateToBackend,
  mapInsightsStateToBackend,
  mapCareersStateToBackend,
  mapContactStateToBackend,
  mapWhoWeServeStateToBackend,
  mapLegalPageStateToBackend
} from "@/utils/pageDataMapper";

const homePageSchema = yup.object().shape({
  homepage: yup.object().shape({
    aboutSection: yup.object().shape({
      heading: yup.string().required("About section heading is required"),
      description: yup.string().required("About section description is required"),
    }),
  })
});

export const useAdminPageSave = () => {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();

  const handleSave = async (
    slug: string,
    pageId: number | null,
    websiteData: any,
    initialWebsiteData: any,
    deletedMediaKeys: string[],
    setInitialWebsiteData: (data: any) => void,
    setDeletedMediaKeys: (keys: string[]) => void,
    setIsSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (JSON.stringify(websiteData) === JSON.stringify(initialWebsiteData)) {
      showNotification("No changes to save", "info");
      return;
    }

    try {
      setIsSubmitting(true);
      startLoading();
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
      } else if (slug === "services") {
        payload = {
          title: "Services",
          slug: "services",
          pageType: "static",
          status: "published",
          sections: mapServicesPageStateToBackend(websiteData.servicesPage, websiteData.homepage.service_area)
        };
      } else if (slug === "practice-groups") {
        payload = {
          title: "Practice Groups",
          slug: "practice-groups",
          pageType: "static",
          status: "published",
          sections: mapPracticeGroupsStateToBackend(websiteData.practiceGroupPage)
        };
      } else if (slug === "firm-professionals") {
        payload = {
          title: "Firm Professionals",
          slug: "firm-professionals",
          pageType: "static",
          status: "published",
          sections: mapFirmProfessionalsStateToBackend(websiteData.firm_professionals)
        };
      } else if (slug === "firm-leadership") {
        payload = {
          title: "Firm Leadership",
          slug: "firm-leadership",
          pageType: "static",
          status: "published",
          sections: mapFirmLeadershipStateToBackend(websiteData.firm_leadership)
        };
      } else if (slug === "blogs") {
        payload = {
          title: "Blogs",
          slug: "blogs",
          pageType: "static",
          status: "published",
          sections: mapBlogsStateToBackend(websiteData.insightsPage)
        };
      } else if (slug === "insights") {
        payload = {
          title: "Insights",
          slug: "insights",
          pageType: "static",
          status: "published",
          sections: mapInsightsStateToBackend(websiteData.insightsPage)
        };
      } else if (slug === "careers") {
        payload = {
          title: "Careers",
          slug: "careers",
          pageType: "static",
          status: "published",
          sections: mapCareersStateToBackend(websiteData.careerPage)
        };
      } else if (slug === "contact-us") {
        payload = {
          title: "Contact Us",
          slug: "contact-us",
          pageType: "static",
          status: "published",
          sections: mapContactStateToBackend(websiteData.contactPage)
        };
      } else if (slug === "who-we-serve") {
        payload = {
          title: "Who We Serve",
          slug: "who-we-serve",
          pageType: "static",
          status: "published",
          sections: mapWhoWeServeStateToBackend(websiteData.whoWeServePage)
        };
      } else if (slug === "privacy-policy" || slug === "terms-of-use" || slug === "disclaimer") {
        let pageTitle = "Privacy Policy";
        let stateKey = "privacyPolicy";
        if (slug === "terms-of-use") { pageTitle = "Terms of Use"; stateKey = "termsOfUse"; }
        if (slug === "disclaimer") { pageTitle = "Disclaimer"; stateKey = "disclaimer"; }
        payload = {
          title: pageTitle,
          slug: slug,
          pageType: "static",
          status: "published",
          sections: mapLegalPageStateToBackend(websiteData[stateKey], stateKey + "_content")
        };
      }

      if (payload) {
        if (pageId) {
          await PageControllers.updatePage(pageId, payload);
          showNotification(`${payload.title} page updated successfully`, "success");
        }

        setInitialWebsiteData(websiteData);

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
          setDeletedMediaKeys([]);
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
      stopLoading();
    }
  };

  return { handleSave };
};
