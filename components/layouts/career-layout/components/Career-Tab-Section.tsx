import CustomTabPanel from "@/components/widgets/Tab-panel";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import StarPara from "./Star-Para";

const CareerTabSection = () => {
  const { details } = usePageData();
  const data = details?.careerPage?.career_open_roles?.tabSectionData;

  const [value, setValue] = useState(0);

  const handleChangeTab = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container>
        <Grid size={{ lg: 8, xs: 12 }} margin="auto">
          <Tabs
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              borderRadius: "36px",
              height: "62px",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-list": {
                justifyContent: "space-around",
                alignItems: "center",
              },
              "& .MuiTab-root": {
                color: COLORS.WHITE,
                textAlign: "center",
                fontSize: 12,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "24px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .Mui-selected": {
                backgroundColor: COLORS.WHITE,
                color: `${COLORS.PRIMARY_BLUE} !important`,
                borderRadius: "32px",
              },
              display: "flex",
              alignItems: "center",
              "& .MuiTabs-flexContainer": {
                justifyContent: { lg: "space-around", xs: "flex-start" },
              },
              "& .MuiTabs-scrollButtons": {
                color: COLORS.WHITE,
              },
            }}
            onChange={handleChangeTab}
            value={value}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {data?.tabData.map((val, i) => (
              <Tab label={val?.title} key={i} />
            ))}
          </Tabs>
        </Grid>
      </Grid>

      <CustomTabPanel index={0} value={value}>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <StarPara
              description={
                data?.tabContentData?.tab_attorney_content_Data?.data1
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_attorney_content_Data?.data1?.title ||
                ""
              }
              sx={{
                fontSize: { lg: 35, xs: 20 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: { lg: "50px", xs: "25px" },
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <StarPara
              description={
                data?.tabContentData?.tab_attorney_content_Data?.data2
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_attorney_content_Data?.data2?.title ||
                ""
              }
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                lineHeight: "30px",
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
          <Grid size={12}>
            <StarPara
              description={
                data?.tabContentData?.tab_attorney_content_Data?.data3
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_attorney_content_Data?.data3?.title ||
                ""
              }
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                lineHeight: "30px",
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <StarPara
              description={
                data?.tabContentData?.tab_technical_advisor?.data1
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_technical_advisor?.data1?.title || ""
              }
              sx={{
                fontSize: { lg: 35, xs: 20 },
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: { lg: "50px", xs: "25px" },
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <StarPara
              description={
                data?.tabContentData?.tab_technical_advisor?.data2
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_technical_advisor?.data2?.title || ""
              }
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                lineHeight: "30px",
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
          <Grid size={12}>
            <StarPara
              description={
                data?.tabContentData?.tab_technical_advisor?.data3
                  ?.description || ""
              }
              title={
                data?.tabContentData?.tab_technical_advisor?.data3?.title || ""
              }
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                lineHeight: "30px",
                textTransform: "capitalize",
                mt: 2,
                color: COLORS.PRIMARY_BLUE,
              }}
            />
          </Grid>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
};

export default CareerTabSection;
