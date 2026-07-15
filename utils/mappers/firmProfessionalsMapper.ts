export const mapBackendToFirmProfessionalsState = (backendData: any, currentState: any) => {
  const newState = { ...currentState };
  if (!backendData || !backendData.sections) return newState;

  backendData.sections.forEach((section: any) => {
    switch (section.sectionKey) {
      case "professionals_hero_section":
        newState.professionals_hero_section = {
          heading: section.data?.heading || "",
          description1: section.data?.description1 || "",
        };
        break;
    }
  });
  return newState;
};

export const mapFirmProfessionalsStateToBackend = (state: any) => {
  return [
    {
      sectionKey: "professionals_hero_section",
      sectionType: "professionals_hero_section",
      sortOrder: 1,
      isVisible: true,
      data: {
        heading: state.professionals_hero_section?.heading || "",
        description1: state.professionals_hero_section?.description1 || ""
      }
    }
  ];
};

export const mapApiUserProfessionalToDetailsProps = (user: any) => {
  const profile = user.professionalProfiles?.[0] || {};
  const sections = profile.sections || [];

  const getSectionData = (type: string) => {
    const sec = sections.find((s: any) => s.sectionType === type);
    if (!sec) return [];
    
    const result: any[] = [];
    if (sec.description) {
      // Split by double newline to match paragraph blocks
      const paragraphs = sec.description.split(/\n+/).filter((p: string) => p.trim() !== "");
      paragraphs.forEach((p: string, idx: number) => {
        const obj: any = { description: p };
        // Attach bullets to the last paragraph if they exist
        if (idx === paragraphs.length - 1 && sec.bullets && sec.bullets.length > 0) {
          obj.list = sec.bullets.map((b: any) => ({
            label: b.bulletText,
            href: ""
          }));
        }
        result.push(obj);
      });
    } else if (sec.bullets && sec.bullets.length > 0) {
      // If no description but has bullets
      result.push({
        list: sec.bullets.map((b: any) => ({
          label: b.bulletText,
          href: ""
        }))
      });
    }
    return result;
  };

  return {
    id: user.id,
    slug: user.slug,
    professionals_Details_HeroSection: {
      img: user.profileImageDownloadUrl || user.profileImageUrl || user.imageDownloadUrl || user.imageUrl || "",
      name: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      vCardData: {
        name: user.fullName || "",
        formattedName: user.fullName || "",
        electronicMail: user.email || "",
        telephoneNumber: user.phoneNumber || "",
        organization: "Slater Matsil",
        job_title: profile.jobTitle || "",
        address: {
          street: profile.streetAddress || "",
          city: profile.city || "",
          state: profile.state || "",
          postalCode: profile.postalCode || "",
          countryRegion: "USA"
        },
        url: "",
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      }
    },
    PROFESSIONAL_BIO_DATA: getSectionData("BIOGRAPHY"),
    PROFESSIONAL_EDUCATION_DATA: getSectionData("EDUCATION"),
    PROFESSIONAL_ADMISSIONS_DATA: getSectionData("ADMISSIONS"),
    PROFESSIONAL_ARTICLES_DATA: getSectionData("ARTICLES_PUBLICATIONS"),
    PROFESSIONAL_ASSOCIATIONS_DATA: getSectionData("ASSOCIATIONS")
  };
};
