import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import star from "@/common/heading-star.png";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { PROFESSIONAL_BIO_PROPS } from "@/utils/types";

interface ProfessionalBioComponentProps {
  data: PROFESSIONAL_BIO_PROPS[] | undefined;
}

const ProfessionalBio = ({ data }: ProfessionalBioComponentProps) => {
  console.log("data", data);
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {data?.map((val, i) => (
            <Grid size={6} key={i}>
              <Box
                sx={{
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  width: 40,
                  height: 40,
                  display: "flex ",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                <Image src={star} alt="Star" />
              </Box>
              <Typography
                sx={{
                  fontSize: 17,
                  color: COLORS.TEXT_PRIMARY_24,
                  mt: 3,
                  fontWeight: 600,
                  textAlign: "justify",
                }}
              >
                {val.description && val.description}
              </Typography>
              {val.list && (
                <Box component="ul" sx={{ mt: 3, pl: 2 }}>
                  {val.list.map((item, index) => (
                    <Typography
                      component="li"
                      key={index}
                      sx={{
                        fontSize: 17,
                        color: COLORS.TEXT_PRIMARY_24,
                        fontWeight: 600,
                        mb: 1,
                        textAlign: "justify",
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalBio;
