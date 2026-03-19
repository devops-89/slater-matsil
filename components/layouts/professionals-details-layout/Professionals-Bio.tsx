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
            <Grid size={{ lg: 6, xs: 12 }} key={i}>
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
                  fontSize: { lg: 17, xs: 15 },
                  color: COLORS.TEXT_PRIMARY_24,
                  mt: 3,
                  fontWeight: 600,
                  textAlign: "justify",
                }}
              >
                {val.description && val.description}
              </Typography>
              {val.list && (
                <Box
                  component="ul"
                  sx={{
                    mt: 3,
                    pl: val.listStyle === "none" ? 0 : 2,
                    listStyle: val.listStyle || "disc",
                  }}
                >
                  {val.list.map((item, index) => (
                    <Typography
                      component="li"
                      key={index}
                      sx={{
                        fontSize: { lg: 17, xs: 15 },
                        color: COLORS.TEXT_PRIMARY_24,
                        fontWeight: 500,
                        mb: 1,
                        textAlign: "justify",
                      }}
                    >
                      {item.href ? (
                        <Box
                          component="a"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "inherit",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                              color: "primary.main",
                            },
                          }}
                        >
                          {item.label}
                        </Box>
                      ) : (
                        item.label
                      )}
                      {item.subList && (
                        <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                          {item.subList.map((subItem, idx) => (
                            <Typography
                              component="li"
                              key={idx}
                              sx={{
                                fontSize: { lg: 17, xs: 15 },
                                color: COLORS.TEXT_PRIMARY_24,
                                fontWeight: 500,
                                mb: 1,
                                textAlign: "justify",
                              }}
                            >
                              {subItem.href ? (
                                <Box
                                  component="a"
                                  href={subItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    color: "inherit",
                                    textDecoration: "none",
                                    "&:hover": {
                                      textDecoration: "underline",
                                      color: "primary.main",
                                    },
                                  }}
                                >
                                  {subItem.label}
                                </Box>
                              ) : (
                                subItem.label
                              )}
                            </Typography>
                          ))}
                        </Box>
                      )}
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
