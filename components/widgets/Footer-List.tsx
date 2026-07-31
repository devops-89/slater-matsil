import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { FOOTER_LIST_DATA } from "@/utils/types";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterList = ({ HEADING, DATA }: FOOTER_LIST_DATA) => {
  const pathname = usePathname();

  const getEditorHref = (href: string) => {
    const isPreview = pathname?.includes("/pages") || pathname?.includes("/manage-");
    if (!isPreview) return href || "#";
    if (!href || href === "#" || href === "/") return "/pages/home";
    
    const parts = href.split("/");
    const baseRoute = parts[1];
    
    // If it's a detail page link like /services/patent-prosecution, do not rewrite to the editor page
    if (parts.length > 2 && parts[2]) {
      return href;
    }

    const hasEditorPage = [
      "home", "about-us", "services", "practice-groups", "professionals", 
      "leadership", "insights", "blogs", "careers", "contact", 
      "who-we-serve", "privacy-policy", "terms-of-use", "disclaimer"
    ].includes(baseRoute);

    if (hasEditorPage) {
      return `/pages/${baseRoute}`;
    }
    return href;
  };
  return (
    <Box>
      <Typography
        sx={{
          color: COLORS.WHITE,
          fontSize: 16,
          fontFamily: tradeGothic.style.fontFamily,
          fontWeight: 700,
          lineHeight: "26px",
        }}
      >
        {HEADING}
      </Typography>
      <List>
        {DATA?.map((item, i) => (
          <ListItem disablePadding key={i}>
            <ListItemButton sx={{ px: 1, width: "fit-content", py: 0 }}>
              <Link href={getEditorHref(item.href || "")} style={{ textDecoration: "none" }}>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        color: COLORS.FOOTER_TEXT_COLOR,
                        fontSize: 16,
                        fontFamily: adelle.style.fontFamily,
                        fontWeight: 400,
                        lineHeight: "26px",
                        opacity: 1,
                        py: 0.5,
                        transition: "color 0.2s",
                        "&:hover": {
                          color: COLORS.WHITE,
                          opacity: 1,
                        },
                      },
                    },
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FooterList;
