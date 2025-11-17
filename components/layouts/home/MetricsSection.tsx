"use client";
import React, { JSX } from "react";
import { Box, Grid, Typography } from "@mui/material";

type Metric = { label: string; value: string; hint?: string };

const METRICS: Metric[] = [
  { label: "U.S. PATENTS ISSUED", value: "24,180+" },
  { label: "COUNTRIES WE SERVE", value: "6" },
  { label: "PATENTS ISSUED TO FIRM PERSONNELS", value: "200+" },
  {
    label: "NO. OF PATENT PROFESSIONALS WITH ADV. TECHNICAL DEGREE",
    value: "50%",
  },
];

const MetricsSection: React.FC = (): JSX.Element => {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 10 }, px: { xs: 6, md: 10 } }}
    >
      <Grid container spacing={4} alignItems="stretch">
        {/* Left: title + description */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ pr: { md: 6 } }}>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: 700,
                mb: 1,
                fontSize: 12,
              }}
            >
              OUR METRICS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                mb: 2,
                lineHeight: 1.05,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
              }}
            >
              Our firm is globally connected. <br />
              Internationally respected.
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              At Slater Matsil, we know what is required to invent something
              groundbreaking and we know what it takes to guard and defend your
              company's intellectual capital.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Box
                component="button"
                sx={{
                  backgroundColor: "primary.main",
                  color: "#fff",
                  border: "none",
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  cursor: "pointer",
                }}
              >
                LET'S TALK NOW
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right: metrics grid */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={3}>
            {METRICS.map((m, idx) => (
              <Grid size={{ xs: 6 }} key={idx}>
                <Box sx={{ p: 3, height: "100%", borderRadius: 2 }}>
                  <Typography
                    sx={{ color: "text.secondary", fontSize: 12, mb: 1 }}
                  >
                    {m.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 24, md: 32 },
                      fontWeight: 800,
                      color: "primary.main",
                    }}
                  >
                    {m.value}
                  </Typography>

                  {m.hint && (
                    <Typography
                      sx={{ color: "text.secondary", fontSize: 12, mt: 1 }}
                    >
                      {m.hint}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MetricsSection;
