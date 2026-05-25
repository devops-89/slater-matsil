import StarBox from "@/components/widgets/common/Star-box";
import { usePageData } from "@/store/usePageData";
import { COLORS, PRACTICE_GROUP_TAB_DATA } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MeetPractitioners from "./Meet-Practitioners";

const PracticeGroupSection = () => {
  const { details } = usePageData();
  const [active, setActive] = useState(
    PRACTICE_GROUP_TAB_DATA.CIRCUITS_SYSTEMS_AND_SIGNAL_PROCESSING,
  );

  const [data, setData] = useState(
    details?.practiceGroupPage?.practiceGroup_section?.tabData?.find(
      (item) =>
        item.title ===
        PRACTICE_GROUP_TAB_DATA.CIRCUITS_SYSTEMS_AND_SIGNAL_PROCESSING,
    ),
  );

  useEffect(() => {
    if (details?.practiceGroupPage?.practiceGroup_section?.tabData) {
      const initialData =
        details.practiceGroupPage.practiceGroup_section.tabData.find(
          (item) => item.title === active,
        );
      setData(initialData);
    }
  }, [details, active]);

  const handleTabChange = (tab: PRACTICE_GROUP_TAB_DATA) => {
    setActive(tab);
    const newData =
      details?.practiceGroupPage?.practiceGroup_section?.tabData.find(
        (item) => item.title === tab,
      );

    setData(newData);
  };

  return (
    <div>
      <Container maxWidth={"lg"}>
        <Box>
          <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={{ lg: "center", xs: "flex-start" }}
                alignItems="center"
                useFlexGap
                sx={{
                  gap: { lg: 2.5, xs: 1.5 },
                }}
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
                  fontSize: { lg: 16, xs: 12 },
                  fontFamily: adelle.style.fontFamily,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  px: { lg: 3.5, xs: 2 },
                  py: 1.2,
                  minHeight: 52,
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      active === val.title
                        ? COLORS.TRANSPARENT
                        : COLORS.PRIMARY_BLUE,
                  },
                  }}
                >
                  {val.title}
                </Button>
              ),
            )}
          </Stack>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#F8FCF5", p: 4, mt: { lg: 4, xs: 2 } }}>
        <Container maxWidth="lg">
          {data?.groupNumber && data?.title && (
            <Typography
              sx={{
                fontSize: { lg: 32, xs: 24 },
                fontFamily: tradeGothic.style.fontFamily,
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
                mb: 2,
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                textDecorationColor: COLORS.PRIMARY_GREEN,
              }}
            >
              {data.title}
            </Typography>
          )}
          <Grid container alignItems={"flex-start"} spacing={4} sx={{ mt: 4 }}>
            <Grid size={{ lg: data?.description2 ? 6 : 12, xs: 12 }}>
              <Typography
                sx={{
                  fontSize: { lg: 22, xs: 18 },
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                  fontWeight: 700,
                  lineHeight: { lg: "38px", xs: "28px" },
                  textAlign: "justify",
                }}
              >
                {data?.description1}
              </Typography>
            </Grid>
            {data?.description2 && (
              <Grid size={{ lg: 6, xs: 12 }}>
                <StarBox bgColor={COLORS.PRIMARY_GREEN} />
                <Typography
                  sx={{
                    fontSize: { lg: 20, xs: 16 },
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 500,
                    lineHeight: { lg: "32px", xs: "24px" },
                    color: COLORS.TEXT_PRIMARY_4,
                    mt: 2,
                    textAlign: "justify",
                  }}
                >
                  {data?.description2}
                </Typography>
              </Grid>
            )}
          </Grid>
          <MeetPractitioners data={data?.data} />
        </Container>
      </Box>
    </div>
  );
};

export default PracticeGroupSection;
