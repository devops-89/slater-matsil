"use client";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Followus = () => {
  const { details } = usePageData();
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: { lg: 50, xs: 25 },
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
            }}
          >
            {details?.contactPage?.follow_props?.title}
          </Typography>

          <Stack
            direction="row"
            alignItems={"center"}
            spacing={2}
            sx={{ mt: 3 }}
          >
            {details?.contactPage?.follow_props?.social_icons?.map((val, i) => (
              <Link key={i} href={val.href || "#"}>
                <IconButton
                  sx={{
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    "& svg": {
                      color: COLORS.WHITE,
                      fontSize: 20,
                    },
                    ":hover": {
                      backgroundColor: COLORS.PRIMARY_BLUE,
                    },
                    width: 50,
                    height: 50,
                  }}
                >
                  <val.Icon />
                </IconButton>
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Followus;
