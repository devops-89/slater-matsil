import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Tab, Tabs } from "@mui/material";
import React from "react";

const CareerTabSection = () => {
  const { details } = usePageData();
  const data = details?.careerPage?.career_open_roles?.tabSectionData;
  return (
    <div>
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
            fontSize: 15,
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 400,
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
        }}
      >
        {data?.tabData.map((val, i) => (
          <Tab label={val?.title} key={i} />
        ))}
      </Tabs>
    </div>
  );
};

export default CareerTabSection;
