import React from "react";
import { Stack, TextField } from "@mui/material";

export function InsightsPageForms({ activeSection, websiteData, updateInsightsPage }: any) {
  if (activeSection !== 0) {
    return null;
  }

  const hero = websiteData?.insightsPage?.heroSectionData || {};

  const handleChange = (field: string, value: string) => {
    updateInsightsPage("heroSectionData", {
      ...hero,
      [field]: value,
    });
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Hero Heading"
        value={hero.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Hero Subheading"
        value={hero.subHeading || ""}
        onChange={(e) => handleChange("subHeading", e.target.value)}
      />
    </Stack>
  );
}
