"use client";

import { HEADER_DATA } from "@/public/data/generic-array";
import logo from "@/public/images/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Close, Menu } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flagUrl: "https://flagcdn.com/w20/us.png" },
  { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/w20/de.png" },
  { code: "ja", label: "日本語", flagUrl: "https://flagcdn.com/w20/jp.png" },
  {
    code: "zh-TW",
    label: "繁體中文",
    flagUrl: "https://flagcdn.com/w20/tw.png",
  },
  {
    code: "zh-CN",
    label: "简体中文",
    flagUrl: "https://flagcdn.com/w20/cn.png",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  const handleLangChange = (e: any) => {
    const val = e.target.value;
    setCurrentLang(val);

    const applyTranslation = (retries = 5) => {
      const googSelect = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement;
      if (googSelect) {
        if (val === "en") {
          // Force an 'en' option into Google's native select so it knows how to revert without reloading
          if (!googSelect.querySelector('option[value="en"]')) {
            const opt = document.createElement("option");
            opt.value = "en";
            opt.text = "English";
            googSelect.appendChild(opt);
          }
        }

        // Hide text briefly to prevent the "flash of English"
        document.body.classList.add("translating-blink");
        setTimeout(() => {
          document.body.classList.remove("translating-blink");
        }, 400);

        googSelect.value = val;
        googSelect.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (retries > 0) {
        // If Google Translate hasn't finished loading yet, retry shortly
        setTimeout(() => applyTranslation(retries - 1), 300);
      }
    };

    applyTranslation();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname;
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
        window.location.hostname;

      if (!(window as any).__REACT_GOOGLE_TRANSLATE_PATCH__) {
        (window as any).__REACT_GOOGLE_TRANSLATE_PATCH__ = true;
        const originalRemoveChild = Node.prototype.removeChild;
        Node.prototype.removeChild = function (this: Node, child: any) {
          if (child.parentNode !== this) {
            return child;
          }
          return originalRemoveChild.apply(this, arguments as any);
        } as any;
        const originalInsertBefore = Node.prototype.insertBefore;
        Node.prototype.insertBefore = function (
          this: Node,
          newNode: any,
          referenceNode: any,
        ) {
          if (referenceNode && referenceNode.parentNode !== this) {
            return newNode;
          }
          return originalInsertBefore.apply(this, arguments as any);
        } as any;
      }

      if (!(window as any).googleTranslateElementInit) {
        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "zh-CN,zh-TW,ja,de,en",
            },
            "google_translate_element",
          );
        };
      }
    }
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    addGoogleTranslateScript();
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const getEditorHref = (href: string) => {
    if (!isPreview) return href || "#";

    if (!href || href === "#" || href === "/") return "/pages/home";

    const parts = href.split("/");
    const baseRoute = parts[1]; // e.g. "services" from "/services/patent-prosecution"

    // If it's a detail page link like /services/patent-prosecution, do not rewrite to the editor page
    if (parts.length > 2 && parts[2]) {
      return href;
    }

    const hasEditorPage = [
      "home",
      "about-us",
      "services",
      "practice-groups",
      "firm-professionals",
      "firm-leadership",
      "insights",
      "blogs",
      "careers",
      "contact-us",
      "who-we-serve",
      "privacy-policy",
      "terms-of-use",
      "disclaimer",
    ].includes(baseRoute);

    if (hasEditorPage) {
      // e.g. if the original url is /firm-professionals, the editor page is /pages/firm-professionals
      // Note: for firm-professionals specifically, the user has /manage-professionals and /pages/firm-professionals.
      // But the generic one is /pages/[slug]. Let's stick to /pages/baseRoute.
      return `/pages/${baseRoute}`;
    }
    return href;
  };

  return (
    <>
      <style>{`
        /* Hide the top banner without breaking its internal DOM */
        .goog-te-banner-frame,
        iframe.goog-te-banner-frame,
        .skiptranslate > iframe {
          visibility: hidden !important;
          position: absolute !important;
          top: -9999px !important;
          width: 0 !important;
          height: 0 !important;
        }
        body {
          top: 0px !important;
          position: relative !important;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Hide the new Google Translate widget banner classes */
        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
        }
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf {
          display: none !important;
        }
        /* Hide the "Powered by Google Translate" and Google logo */
        .goog-logo-link,
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0px !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        /* Hide the translation tooltip when hovering over text */
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        body.translating-blink *:not(#main-navbar):not(#main-navbar *) {
          color: transparent !important;
          text-shadow: none !important;
        }
      `}</style>
      <div id="main-navbar">
        <Box
          sx={{
            backgroundColor: COLORS.HEADER_BG,
            height: 100,
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              position="relative"
            >
              {/* Left: Language Selector */}
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}
              >
                <div
                  id="google_translate_element"
                  style={{ display: "none" }}
                ></div>
                <Autocomplete
                  className="notranslate"
                  options={LANGUAGES}
                  disableClearable
                  getOptionLabel={(option) => option.label}
                  value={
                    LANGUAGES.find((l) => l.code === currentLang) ||
                    LANGUAGES[0]
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleLangChange({ target: { value: newValue.code } });
                    }
                  }}
                  ListboxProps={{
                    className: "notranslate",
                  }}
                  renderOption={(props, option) => {
                    const { key, ...rest } = props as any;
                    return (
                      <Box
                        key={key}
                        component="li"
                        sx={{
                          color: "#000",
                          fontFamily: adelle.style.fontFamily,
                        }}
                        {...rest}
                      >
                        <img
                          src={option.flagUrl}
                          alt=""
                          width="20"
                          style={{ marginRight: "8px" }}
                        />
                        {option.label}
                      </Box>
                    );
                  }}
                  renderInput={(params) => {
                    const selected =
                      LANGUAGES.find((l) => l.code === currentLang) ||
                      LANGUAGES[0];
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <img
                                src={selected.flagUrl}
                                alt=""
                                width="20"
                                style={{
                                  marginLeft: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        inputProps={{
                          ...params.inputProps,
                          readOnly: true,
                          style: {
                            ...params.inputProps.style,
                            cursor: "pointer",
                          },
                        }}
                        sx={{
                          width: 170,
                          backgroundColor: COLORS.WHITE,
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": {
                            color: COLORS.PRIMARY_GREEN,
                            fontFamily: adelle.style.fontFamily,
                            fontSize: "14px",
                            border: `1px solid ${COLORS.PRIMARY_BLUE}`,
                            borderRadius: "8px",
                            paddingRight: "39px !important",
                            paddingLeft: "0px",
                            "& fieldset": { border: "none" },
                          },
                          "& .MuiSvgIcon-root": { color: COLORS.PRIMARY_BLUE },
                        }}
                      />
                    );
                  }}
                />
              </Box>

              {/* Center: Logo */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link href="/">
                  <Image src={logo} alt="Slater Matsil logo" priority />
                </Link>
              </Box>

              {/* Right: Menu */}
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  onClick={handleMenuToggle}
                  sx={{ cursor: "pointer" }}
                >
                  <IconButton sx={{ p: 0.5 }}>
                    {menuOpen ? (
                      <Close sx={{ color: COLORS.PRIMARY_BLUE }} />
                    ) : (
                      <Menu sx={{ color: COLORS.PRIMARY_BLUE }} />
                    )}
                  </IconButton>
                  <Typography
                    sx={{
                      mt: 0.6,
                      color: COLORS.PRIMARY_GREEN,
                      textTransform: "uppercase",
                      fontFamily: adelle.style.fontFamily,
                      fontSize: 18,
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    {menuOpen ? "CLOSE" : "MENU"}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: isPreview ? 0 : "50%",
            transform: isPreview
              ? menuOpen
                ? "scaleX(1)"
                : "scaleX(0)"
              : menuOpen
                ? "translateX(-50%) scaleX(1)"
                : "translateX(-50%) scaleX(0)",
            width: isPreview ? "100%" : "100vw",
            height: isPreview ? "100%" : "100vh",
            backgroundColor: COLORS.WHITE,
            zIndex: menuOpen ? 9 : -1,
            transition:
              "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
            transformOrigin: isPreview ? "center" : "center center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          <Container maxWidth="lg">
            <Grid container>
              {HEADER_DATA.map((val, i) => (
                <Grid size={4} key={i}>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontFamily: tradeGothic.style.fontFamily,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {val.HEADING}
                  </Typography>
                  <List>
                    {val.DATA?.map((item, index) => (
                      <Link
                        key={index}
                        href={getEditorHref(item.href || "#")}
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleMenuToggle}
                      >
                        <ListItemButton
                          sx={{ width: "fit-content", margin: "auto" }}
                        >
                          <ListItemText
                            primary={item.text}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontFamily: tradeGothic.style.fontFamily,
                                  fontWeight: 400,
                                  textAlign: "center",
                                },
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default Navbar;
