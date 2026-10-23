import { Box, Stack, TextField } from "@mui/material";
import React from "react";

export function BlogsPageForms({ activeSection, websiteData, updateInsightsPage }: any) {
  if (activeSection === 0) {
    return (
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Hero Heading"
          value={websiteData?.insightsPage?.heroSectionData?.heading || ""}
          onChange={(e) =>
            updateInsightsPage("heroSectionData", {
              ...websiteData.insightsPage.heroSectionData,
              heading: e.target.value,
            })
          }
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Hero Subheading"
          value={websiteData?.insightsPage?.heroSectionData?.subHeading || ""}
          onChange={(e) =>
            updateInsightsPage("heroSectionData", {
              ...websiteData.insightsPage.heroSectionData,
              subHeading: e.target.value,
            })
          }
        />
      </Stack>
    );
  }

  return null;
}
