import StaticIndicators from "@/components/widgets/common/Indicators-static";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { para_field_styles } from "@/utils/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ContactCard from "./components/Contact-Card";
import { usePageData } from "@/store/usePageData";

const FindUsHere = () => {
  const { details } = usePageData();
  return (
    <div>
      <Container maxWidth="lg">
        <Box>
          <Typography
            sx={{
              fontSize: 50,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
              lineHeight: "72px",
              color: COLORS.PRIMARY_BLUE,
            }}
          >
            {details?.contactPage?.contact_card_props?.heading}
          </Typography>
          <StaticIndicators />

          <Typography sx={{ ...para_field_styles, mt: 2 }}>
            {details?.contactPage?.contact_card_props?.subTitle}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {details?.contactPage?.contact_card_props?.contact_card_data.map(
              (val, i) => (
                <Grid size={4} key={i}>
                  <ContactCard
                    heading={val.heading}
                    Icon={val.Icon}
                    value={val.value}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default FindUsHere;
