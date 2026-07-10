import TabSwitching from "@/components/widgets/Tab-Switching";
import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid, Stack, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import InsightsCard from "./components/Insights-Card";
import { COLORS, INSIGHTS_TAB_DATA } from "@/utils/enum";
import QuickLinks from "./Quick-Links";
import { InsightControllers } from "@/api/insightControllers";
import { useLoading } from "@/components/providers/LoadingProvider";

const InsightsTabSection = () => {
  const { details, insightsTab, setInsightsTab, insightsPage, setInsightsPage } = usePageData();
  const [apiInsights, setApiInsights] = useState<any[]>([]);
  const { startLoading, stopLoading } = useLoading();
  
  const value = insightsTab;
  const currentPage = insightsPage;
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchApiInsights = async () => {
      try {
        startLoading();
        const currentTabTitle = details?.insightsPage?.tab_data?.[value]?.title;
        const queryParams: any = { limit: 1000 };
        
        if (currentTabTitle && currentTabTitle !== INSIGHTS_TAB_DATA.ALL) {
          queryParams.category = currentTabTitle;
        }

        const res = await InsightControllers.getAllInsights(queryParams);
        const data = res.data?.data?.data?.insights || res.data?.data?.insights || [];
        setApiInsights(data);
      } catch (err: any) {
        console.error("Failed to fetch insights from API:", err?.message || "Unknown error");
      } finally {
        stopLoading();
      }
    };
    fetchApiInsights();
  }, [value, details, startLoading, stopLoading]);

  const insightsData = (() => {
    // Ensure API insights are sorted newest first
    const allData = [...apiInsights].sort((a, b) => b.id - a.id).map((insight: any) => ({
      title: insight.insightTitle || insight.title,
      category: insight.category,
      bgColor: insight.cardTheme || COLORS.PRIMARY_BLUE,
      slug: insight.id.toString(), // Use ID as slug for routing
    }));
    return allData;
  })();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setInsightsTab(newValue);
    setInsightsPage(1); // Reset to first page on tab change
  };

  const totalPages = Math.ceil((insightsData?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = insightsData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setInsightsPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#ECF8F8", pb: 3 }}>
        <Box sx={{ padding: { lg: "30px", xs: "20px" } }}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid size={{ lg: 6, xs: 12 }} margin="auto">
                <TabSwitching
                  value={value}
                  onChange={handleChange}
                  data={details?.insightsPage?.tab_data || []}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <QuickLinks />
      </Box>
      {details?.insightsPage?.tab_data.map((_, i) => (
        <CustomTabPanel value={value} index={i} key={i}>
          <Container maxWidth="lg" sx={{ my: 5 }}>
            {insightsData?.length === 0 ? (
              <Box sx={{ width: "100%", mt: 6, mb: 10, textAlign: "center" }}>
                <Typography
                  sx={{
                    color: COLORS.PRIMARY_BLUE,
                    fontSize: { xs: 20, md: 24 },
                  }}
                >
                  No Insights Found
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={4}>
                  {currentItems?.map((val, index) => {
                    const colorsArray = [COLORS.PRIMARY_BLUE, COLORS.PRIMARY_LIGHT_GREEN, COLORS.LIGHT_GREY];
                    const alternatingColor = colorsArray[index % colorsArray.length];
                    
                    return (
                      <Grid size={{ lg: 4, md: 6, xs: 12 }} key={index}>
                        <InsightsCard
                          title={val.title}
                          category={val.category}
                          bgColor={alternatingColor}
                          slug={val.slug}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

            {totalPages > 1 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={{ mt: 10, mb: 5 }}
              >
                <Typography
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  sx={{
                    cursor: currentPage > 1 ? "pointer" : "default",
                    fontWeight: 700,
                    fontSize: 14,
                    color: COLORS.PRIMARY_BLUE,
                    opacity: currentPage > 1 ? 1 : 0.4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: currentPage > 1 ? COLORS.PRIMARY_GREEN : "",
                    },
                  }}
                >
                  PREVIOUS
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {(() => {
                    const pageNumbers: (number | string)[] = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
                    } else {
                      if (currentPage <= 4) {
                        pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        pageNumbers.push(
                          1,
                          "...",
                          totalPages - 4,
                          totalPages - 3,
                          totalPages - 2,
                          totalPages - 1,
                          totalPages,
                        );
                      } else {
                        pageNumbers.push(
                          1,
                          "...",
                          currentPage - 1,
                          currentPage,
                          currentPage + 1,
                          "...",
                          totalPages,
                        );
                      }
                    }

                    return pageNumbers.map((page, index) =>
                      page === "..." ? (
                        <Typography
                          key={`dots-${index}`}
                          sx={{
                            fontWeight: 700,
                            color: COLORS.PRIMARY_BLUE,
                            mx: 0.5,
                          }}
                        >
                          ...
                        </Typography>
                      ) : (
                        <Box
                          key={page}
                          onClick={() => handlePageChange(page as number)}
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "12px",
                            backgroundColor:
                              currentPage === page
                                ? COLORS.PRIMARY_BLUE
                                : "transparent",
                            color:
                              currentPage === page ? "white" : COLORS.BLACK,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 16,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            border:
                              currentPage === page
                                ? "none"
                                : "1px solid #EAEAEA",
                            boxShadow:
                              currentPage === page
                                ? "0 8px 16px rgba(13, 95, 110, 0.2)"
                                : "none",
                            "&:hover": {
                              backgroundColor:
                                currentPage === page
                                  ? COLORS.PRIMARY_BLUE
                                  : "rgba(13, 95, 110, 0.05)",
                              borderColor: COLORS.PRIMARY_BLUE,
                            },
                          }}
                        >
                          {page}
                        </Box>
                      ),
                    );
                  })()}
                </Stack>
                <Typography
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  sx={{
                    cursor: currentPage < totalPages ? "pointer" : "default",
                    fontWeight: 700,
                    fontSize: 14,
                    color: COLORS.PRIMARY_BLUE,
                    opacity: currentPage < totalPages ? 1 : 0.4,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color:
                        currentPage < totalPages ? COLORS.PRIMARY_GREEN : "",
                    },
                  }}
                >
                  NEXT
                </Typography>
              </Stack>
            )}
              </>
            )}
          </Container>
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default InsightsTabSection;
