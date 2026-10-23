"use client";

import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Box, Container } from "@mui/material";

const TABS = [
  { id: "about", label: "ABOUT" },
  { id: "rankings", label: "Rankings" },
];

interface InsightsDetailsTabBarProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const InsightsDetailsTabBar = ({
  activeTab,
  onTabChange,
}: InsightsDetailsTabBarProps) => {
  return (
    <Box sx={{ py: 0 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Outer pill: teal background, fixed height/width similar to Figma */}
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              borderRadius: "40px",
              mt:5,
              bgcolor: COLORS.PRIMARY_BLUE,
              p: 0.75,
              minWidth: { md: 587, xs: "auto" },
              height: { md: 72, xs: 56 },
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
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
                    flex: 1,
                    px: { xs: 2.5, md: 4 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "30px",
                    bgcolor: isActive ? COLORS.WHITE : "transparent",
                    cursor: "pointer",
                    transition: "background-color 0.2s, color 0.2s",
                    "&:hover": {
                      bgcolor: isActive ? "#F5F5F5" : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontFamily: adelle.style.fontFamily,
                      fontWeight: 700,
                      fontSize: { xs: 16, md: 20 },
                      color: isActive ? COLORS.PRIMARY_BLUE : COLORS.WHITE,
                      textTransform: "uppercase",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tab.label}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InsightsDetailsTabBar;
