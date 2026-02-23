"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Box, Container, Stack } from "@mui/material";

const TABS = [
  { id: "about", label: "ABOUT" },
  { id: "rankings", label: "Lawyer Rankings" },
];

interface InsightsDetailsTabBarProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const InsightsDetailsTabBar = ({ activeTab, onTabChange }: InsightsDetailsTabBarProps) => {
  return (
    <Box sx={{ py: 0 }}>
      <Container maxWidth="lg">
        {/* Combined pill: ABOUT (active = light grey + teal) | Lawyer Rankings (inactive = teal + white) */}
        <Stack
          direction="row"
          alignItems="stretch"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{
            borderRadius: "72px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            width: "fit-content",
          }}
        >
          {TABS.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <Box
                key={tab.id}
                onClick={() => onTabChange(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onTabChange(index);
                }}
                sx={{
                  px: { xs: 3, md: 5.75 },
                  py: 2.25,
                  bgcolor: isActive ? "#E8E8E8" : COLORS.PRIMARY_BLUE,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: isActive ? "#DEDEDE" : "#0a4d55",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 700,
                    fontSize: { xs: 18, md: 24 },
                    color: isActive ? COLORS.PRIMARY_BLUE : "white",
                    textTransform: "uppercase",
                  }}
                >
                  {tab.label}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default InsightsDetailsTabBar;
