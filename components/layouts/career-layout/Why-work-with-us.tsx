import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import work from "@/career/work-with-us.jpg";
import Image from "next/image";
import WorkList from "./components/Work-list";
import { usePageData } from "@/store/usePageData";
const WhyWorkWithus = () => {
  const { details } = usePageData();
//add 
  const data = details?.careerPage?.career_work_with_us;
  return (
    <Box>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: { lg: 64, xs: 45 },
            fontFamily: tradeGothic.style.fontFamily,
            fontWeight: 700,
            lineHeight: { lg: "72px", xs: "50px" },
          }}
        >
          {data?.firstTitle}
          <Typography
            component={"span"}
            sx={{
              color: COLORS.PRIMARY_GREEN,
              fontSize: { lg: 64, xs: 45 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: { lg: "72px", xs: "50px" },
              ml: { lg: 0, xs: 1 },
            }}
          >
            {data?.secondTitle}
          </Typography>{" "}
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          spacing={2}
          mt={2}
        >
          <Box
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
          ></Box>

          <Box
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              width: 50,
              height: 10,
              borderRadius: 20,
            }}
          ></Box>
        </Stack>
        <Typography
          sx={{
            fontSize: 24,
            color: COLORS.PRIMARY_BLUE,
            fontWeight: 400,
            lineHeight: "36px",
            mt: 3,
            textAlign: "justify",
          }}
        >
          {data?.shortDescription}
        </Typography>

        <Grid container sx={{ mt: 4 }} spacing={4} alignItems={"center"}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: "20px",
                overflow: "hidden",
                bgcolor: "rgba(0, 0, 0, 0.05)",
                position: "relative"
              }}
            >
              {data?.section_img && (
                <Image
                  src={typeof data.section_img === 'string' ? data.section_img : data.section_img}
                  alt=""
                  fill
                  priority={true}
                  unoptimized={true}
                  style={{ objectFit: "cover" }}
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            {data?.work_list_data.map((val, i) => (
              <Box key={i} sx={{ mb: 2, ml: i % 2 == 0 ? 0 : 3 }}>
                <WorkList title={val.title} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyWorkWithus;
