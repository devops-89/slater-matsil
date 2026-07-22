export const getCleanImageUrl = (url?: string | any) => {
  if (!url) return "";
  if (typeof url !== 'string') {
    // If it's a Next.js StaticImageData object
    if (url.src && typeof url.src === 'string') {
      if (url.src.startsWith("/_next/")) return "";
      return url.src;
    }
    return "";
  }
  if (url.startsWith("/_next/")) return "";
  return url;
};

export const getValidImageUrl = (url?: string | any) => {
  if (!url) return "";
  if (typeof url !== 'string') {
    if (url.src && typeof url.src === 'string') {
      return url.src;
    }
    return "";
  }
  let finalUrl = url.trim();
  if (!finalUrl.startsWith("http") && !finalUrl.startsWith("/") && finalUrl.includes("s3")) {
    finalUrl = "https://" + finalUrl;
  }
  if (!finalUrl.startsWith("http") && !finalUrl.startsWith("/") && !finalUrl.startsWith("_next") && !finalUrl.startsWith("blob:") && !finalUrl.startsWith("data:")) {
    finalUrl = "/" + finalUrl;
  }
  return finalUrl;
};

export const genericMapToBackend = (state: any, sectionKey: string) => {
  return [
    {
      sectionKey,
      sectionType: sectionKey,
      sortOrder: 1,
      isVisible: true,
      data: state
    }
  ];
};

export const genericMapToState = (backendData: any, currentState: any, sectionKey: string) => {
  if (!backendData || !backendData.sections) return currentState;
  const section = backendData.sections.find((s: any) => s.sectionKey === sectionKey);
  if (section && section.data) {
    return { ...currentState, ...section.data };
  }
  return currentState;
};
