import StarBox from "@/components/widgets/common/Star-box";
import { usePageData } from "@/store/usePageData";
import { COLORS, PRACTICE_GROUP_TAB_DATA } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const PracticeGroupSection = () => {
  const { details } = usePageData();
  const [active, setActive] = useState(
    PRACTICE_GROUP_TAB_DATA.CIRCUITS_SYSTEMS_AND_SIGNAL_PROCESSING
  );

  const [data, setData] = useState(
    details?.practiceGroupPage?.practiceGroup_section?.tabData[0]
  );

  const handleTabChange = (tab: PRACTICE_GROUP_TAB_DATA) => {
    setActive(tab);
    const newData =
      details?.practiceGroupPage?.practiceGroup_section?.tabData.find(
        (item) => item.title === tab
      );

    setData(newData);
  };

  return (
    <div>
      <Container maxWidth={"lg"}>
        <Box>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            flexWrap={"wrap"}
            rowGap={2}
          >
            {details?.practiceGroupPage?.practiceGroup_section?.tabData.map(
              (val, i) => (
                <Button
                  key={i}
                  onClick={() => handleTabChange(val.title)}
                  sx={{
                    color:
                      active === val.title ? COLORS.PRIMARY_BLUE : COLORS.WHITE,
                    backgroundColor:
                      active === val.title
                        ? COLORS.TRANSPARENT
                        : COLORS.PRIMARY_BLUE,
                    border: "2px solid" + COLORS.PRIMARY_BLUE,
                    borderRadius: "50px",
                    fontSize: 16,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {val.title}
                </Button>
              )
            )}
          </Stack>

          <Grid container alignItems={"center"} spacing={4} sx={{ mt: 4 }}>
            <Grid size={6}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  fontWeight: 700,
                  lineHeight: "40px",
                  textTransform: "capitalize",
                }}
              >
                {data?.description1}
              </Typography>
            </Grid>
            <Grid size={6}>
              <StarBox bgColor={COLORS.PRIMARY_GREEN} />
              <Typography
                sx={{
                  fontSize: 20,
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  lineHeight: "30px",
                  textTransform: "capitalize",
                  color: COLORS.TEXT_PRIMARY_4,
                  mt: 2,
                }}
              >
                {data?.description2}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default PracticeGroupSection;
