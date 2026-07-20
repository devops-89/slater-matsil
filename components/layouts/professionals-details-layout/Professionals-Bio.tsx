import { COLORS } from "@/utils/enum";
import { PROFESSIONAL_BIO_PROPS } from "@/utils/types";
import { Box, Container, Grid, Typography } from "@mui/material";

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
            <Grid size={{ xs: 12, md: 12, lg: 12 }} key={i}>
              <Typography
                component="div"
                sx={{
                  fontSize: { lg: 17, xs: 15 },
                  color: COLORS.TEXT_PRIMARY_24,
                  mt:1,
                  fontWeight: 600,
                  textAlign: "left",
                  whiteSpace: "pre-wrap",
                  "& p": {
                     marginBottom: "16px"
                  }
                }}
                dangerouslySetInnerHTML={{__html: val.description || "" }}
              />
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
                        textAlign: "left",
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
                                textAlign: "left",
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
