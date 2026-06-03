import { getCleanImageUrl } from "./commonMapper";

export const mapFirmLeadershipStateToBackend = (state: any) => {
  const processArray = (arr: any[]) => (arr || []).map(item => ({
    name: item.name || "",
    designation: item.designation || "",
    imageUrl: getCleanImageUrl(item.key || item.imageUrl || item.img || ""),
    ...(item.email ? { email: item.email } : {}),
    ...(item.slug ? { slug: item.slug } : {}),
    ...(item.isAdmin !== undefined ? { isAdmin: item.isAdmin } : {})
  }));

  return [
    {
      sectionKey: "firm_leadership_content",
      sectionType: "firm_leadership_content",
      sortOrder: 1,
      isVisible: true,
      data: {
        ...state,
        partners: processArray(state.partners),
        patentAgents: processArray(state.patentAgents),
        administration: processArray(state.administration)
      }
    }
  ];
};

export const mapBackendToFirmLeadershipState = (backendData: any, currentState: any) => {
  if (!backendData || !backendData.sections) return currentState;
  const section = backendData.sections.find((s: any) => s.sectionKey === "firm_leadership_content");
  if (!section || !section.data) return currentState;

  const data = section.data;
  const processArray = (arr: any[]) => (arr || []).map(item => ({
    ...item,
    imageDownloadUrl: item.imageDownloadUrl || "",
    img: item.imageDownloadUrl || item.img || item.imageUrl || item.key || ""
  }));

  return {
    ...currentState,
    ...data,
    partners: processArray(data.partners),
    patentAgents: processArray(data.patentAgents),
    administration: processArray(data.administration)
  };
};
