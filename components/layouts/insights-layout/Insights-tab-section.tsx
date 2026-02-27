import TabSwitching from "@/components/widgets/Tab-Switching";
import { usePageData } from "@/store/usePageData";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTabPanel from "@/components/widgets/Tab-panel";
import InsightsCard from "./components/Insights-Card";
import { COLORS, INSIGHTS_TAB_DATA } from "@/utils/enum";
import QuickLinks from "./Quick-Links";

const InsightsTabSection = () => {
  const [value, setValue] = useState(0);
  const { details } = usePageData();
  const [insightsData, setInsightsData] = useState(
    details?.insightsPage?.insightsData,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setInsightsData(details?.insightsPage?.insightsData);
  }, [details]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setCurrentPage(1); // Reset to first page on tab change
    if (
      details?.insightsPage?.tab_data?.[newValue]?.title ===
      INSIGHTS_TAB_DATA.ALL
    ) {
      setInsightsData(details?.insightsPage?.insightsData);
    } else {
      const filteredData = details?.insightsPage?.insightsData?.filter(
        (item) =>
          item.category === details?.insightsPage?.tab_data?.[newValue]?.title,
      );
      setInsightsData(filteredData);
    }
  };

  const totalPages = Math.ceil((insightsData?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = insightsData?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
            <Grid container spacing={4}>
              {currentItems?.map((val, index) => (
                <Grid size={{ lg: 4, md: 6, xs: 12 }} key={index}>
                  <InsightsCard
                    title={val.title}
                    category={val.category}
                    bgColor={val.bgColor}
                    slug={val.slug}
                  />
                </Grid>
              ))}
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
          </Container>
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default InsightsTabSection;
