import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "@/utils/enum";
import { usePageData } from "@/store/usePageData";

const BlogSection = () => {
  const { details } = usePageData();
  const blogSection = details?.insightsPage?.blogSection;

  const upcomingWebinars = blogSection?.upcoming || [];
  const pastWebinars = blogSection?.pastWebinars || [];

  return (
    <Box sx={{ mb: { lg: 10, xs: 6 } }}>
      {/* Upcoming section */}
      <Box sx={{ backgroundColor: "#ECF8F8", py: { lg: 6, xs: 4 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: { lg: 36, md: 30, xs: 24 },
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: { lg: 4, xs: 3 },
            }}
          >
            {blogSection?.upcomingTitle || "Upcoming"}
          </Typography>
          <Grid container spacing={3}>
            {upcomingWebinars.map((webinar) => (
              <Grid key={webinar.id} size={{ lg: 6, xs: 12 }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 5px 14px 0 rgba(8, 15, 52, 0.04)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: webinar.bg,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "stretch",
                    }}
                  >
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Typography
                        sx={{
                          fontSize: 24,
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {webinar.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: "rgba(45,44,43,0.8)",
                        }}
                      >
                        {webinar.date}
                      </Typography>
                    </Box>
                    <CardMedia
                      component="img"
                      image={webinar.img?.src || ""}
                      alt={webinar.title}
                      sx={{
                        width: { lg: 220, md: 200, xs: 160 },
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {webinar.subtitle}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        color: COLORS.BLACK,
                        mb: 3,
                      }}
                    >
                      {webinar.description}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 3,
                          py: 1.5,
                          borderRadius: "999px",
                          backgroundColor: COLORS.PRIMARY_BLUE,
                          color: COLORS.WHITE,
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        View More
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Watch Past Webinars */}
      <Container maxWidth="lg" sx={{ mt: { lg: 8, xs: 6 } }}>
        <Typography
          sx={{
            fontSize: { lg: 42, md: 34, xs: 26 },
            fontWeight: 600,
            color: COLORS.PRIMARY_BLUE,
            mb: { lg: 4, xs: 3 },
          }}
        >
          {blogSection?.watchPastTitle || "Watch Past Webinars"}
        </Typography>

        <Grid container spacing={3}>
          {pastWebinars.map((webinar) => (
            <Grid key={webinar.id} size={{ lg: 4, md: 6, xs: 12 }}>
              <Card
                sx={{
                  borderRadius: 2.5,
                  border: "1px solid #EAEAEA",
                  boxShadow: "0 5px 14px 0 rgba(8, 15, 52, 0.04)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={webinar.img?.src || ""}
                  alt={webinar.title}
                  sx={{
                    height: 220,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1.5, color: "#4F4F4F", fontSize: 14 }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {webinar.date}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "#4F4F4F",
                      }}
                    />
                    <Typography>{webinar.readTime}</Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {webinar.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      color: "#828282",
                    }}
                  >
                    {webinar.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ mt: { lg: 6, xs: 4 } }}
        >
          <Typography sx={{ cursor: "pointer" }}>Previous</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 1.5,
                backgroundColor: "#EBEBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              1
            </Box>
            <Typography>2</Typography>
          </Stack>
          <Typography sx={{ cursor: "pointer" }}>Next</Typography>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mt: { lg: 10, xs: 6 } }}>
        <Box
          sx={{
            borderRadius: 4,
            px: { lg: 10, md: 6, xs: 4 },
            py: { lg: 8, md: 6, xs: 4 },
            textAlign: "center",
            background:
              "linear-gradient(112deg, #0D5F6E 24.3%, #24735F 34.7%, #73B72B 70.2%)",
            color: COLORS.WHITE,
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: 40, md: 32, xs: 26 },
              fontWeight: 600,
              mb: 2,
            }}
          >
            {blogSection?.ctaTitle || "Ready to Safeguard Your Innovation?"}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: 20, md: 18, xs: 16 },
              maxWidth: 800,
              mx: "auto",
              mb: { lg: 4, xs: 3 },
            }}
          >
            {blogSection?.ctaDescription ||
              "At Slater Matsil, our patent professionals provide strategic guidance to protect your intellectual property and support your long-term growth."}
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 5,
              py: 1.75,
              borderRadius: 1.5,
              backgroundColor: COLORS.WHITE,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            {blogSection?.ctaButtonText || "SCHEDULE A CONSULTATION"}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSection;

