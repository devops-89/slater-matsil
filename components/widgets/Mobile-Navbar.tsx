"use client";
import { HEADER_DATA } from "@/public/data/generic-array";
import logo from "@/public/images/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Drawer, List, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MobileNavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleSubMenuToggle = (heading: string) => {
    setOpenSubMenu(openSubMenu === heading ? null : heading);
  };

  return (
    <Box sx={{ backgroundColor: COLORS.HEADER_BG, zIndex: 1000, position: "sticky", top: 0 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, height: 80 }}
      >
        <Link href="/">
          <Image src={logo} alt="Slater Matsil Logo" width={150} priority />
        </Link>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color={COLORS.PRIMARY_BLUE}
          size={25}
        />
      </Stack>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: 350,
            backgroundColor: COLORS.WHITE,
            p: 3,
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            MENU
          </Typography>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={COLORS.PRIMARY_BLUE}
            size={25}
          />
        </Stack>

        <List sx={{ pt: 0 }}>
          {HEADER_DATA.map((category) => (
            <Box key={category.HEADING} sx={{ mb: 2 }}>
              <ListItemButton
                onClick={() => handleSubMenuToggle(category.HEADING)}
                sx={{
                  px: 0,
                  py: 1.5,
                  borderBottom: `1px solid ${COLORS.LIGHT_GREY}`,
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <ListItemText
                  primary={category.HEADING}
                  slotProps={{
                    primary: {
                      sx: {
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        fontSize: 16,
                        color: COLORS.PRIMARY_BLUE,
                      },
                    },
                  }}
                />
                {openSubMenu === category.HEADING ? (
                  <ExpandLess sx={{ color: COLORS.PRIMARY_GREEN }} />
                ) : (
                  <ExpandMore sx={{ color: COLORS.PRIMARY_BLUE }} />
                )}
              </ListItemButton>

              <Collapse in={openSubMenu === category.HEADING} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.DATA?.map((item) => (
                    <Link
                      key={item.text}
                      href={item.href || "#"}
                      style={{ textDecoration: "none" }}
                      onClick={() => setOpen(false)}
                    >
                      <ListItemButton sx={{ pl: 2, py: 1 }}>
                        <ListItemText
                          primary={item.text}
                          slotProps={{
                            primary: {
                              sx: {
                                fontFamily: tradeGothic.style.fontFamily,
                                fontWeight: 400,
                                fontSize: 14,
                                color: COLORS.BLACK,
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>

        <Box sx={{ mt: "auto", pt: 4, width: "100%", display: "flex", justifyContent: "center" }}>
          <Link href="/contact" onClick={() => setOpen(false)} style={{ textDecoration: "none", width: "100%" }}>
            <Button
              fullWidth
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                textAlign: "center",
                py: 1.5,
                borderRadius: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 700,
                fontSize: 16,
                mb:4,
                letterSpacing: "1px",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  opacity: 0.9,
                },
              }}
            >
              Contact Us
            </Button>
          </Link>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileNavbar;
