import CustomTabPanel from "@/components/widgets/Tab-panel";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { SyntheticEvent, useState, useEffect } from "react";
import StarPara from "./Star-Para";
import { ArrowForward } from "@mui/icons-material";
import { useModal } from "@/store/useModal";
import Form from "../../contact-layout/components/Form";
import CareerApplicationForm from "./CareerApplicationForm";

const CareerTabSection = () => {
  const { details } = usePageData();
  const { showModal } = useModal();
  const data = details?.careerPage?.career_open_roles?.tabSectionData;

  const [value, setValue] = useState(0);
  const [roleData, setRoleData] = useState(
    data?.tabContentData?.tab_attorney_content_Data,
  );

  useEffect(() => {
    if (data?.tabContentData) {
      if (value === 0) {
        setRoleData(data.tabContentData.tab_attorney_content_Data);
      } else if (value === 1) {
        setRoleData(data.tabContentData.tab_technical_advisor);
      }
    }
  }, [data, value]);

  const handleChangeTab = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setRoleData(data?.tabContentData?.tab_attorney_content_Data);
    } else if (newValue === 1) {
      setRoleData(data?.tabContentData?.tab_technical_advisor);
    }
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

      <CustomTabPanel index={value} value={value}>
        {roleData?.map((val, i) => (
          <Grid container spacing={5} sx={{ mt: 3 }} key={i}>
            <Grid size={{ lg: 6, xs: 12 }}>
              <StarPara
                description={val.description1 || ""}
                title={val.title}
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
                description={val.description2 || ""}
                sx={{
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  // textTransform: "capitalize",
                  mt: 2,
                  color: COLORS.PRIMARY_BLUE,
                }}
              />
            </Grid>
            <Grid size={12}>
              <StarPara
                description={val.description3 || ""}
                sx={{
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  // textTransform: "capitalize",
                  mt: 2,
                  color: COLORS.PRIMARY_BLUE,
                }}
              />
            </Grid>
            <Grid size={12}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  // textTransform: "capitalize",
                  mt: 2,
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                If you would like to join our team, please fill out the form
                below.
              </Typography>
            </Grid>

            <Button
              onClick={() =>
                showModal(
                  <Box
                    sx={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <CareerApplicationForm />
                  </Box>,
                )
              }
              endIcon={<ArrowForward sx={{ fontSize: 50 }} />}
              sx={{
                mt: 3,
                borderRadius: "120px",
                border: `1px solid ${COLORS.PRIMARY_BLUE}`,
                backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
                width: "286px",
                padding: "10px",
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                lineHeight: "40px",
                color: COLORS.PRIMARY_BLUE,
              }}
            >
              Apply Now
            </Button>

            <Grid size={12}>
              <StarPara
                description={val.description4 || ""}
                sx={{
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  // textTransform: "capitalize",
                  mt: 2,
                  color: COLORS.PRIMARY_BLUE,
                }}
              />
            </Grid>
          </Grid>
        ))}
      </CustomTabPanel>
    </Box>
  );
};

export default CareerTabSection;
