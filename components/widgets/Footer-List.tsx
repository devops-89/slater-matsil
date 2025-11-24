import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { FOOTER_LIST_DATA } from "@/utils/types";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

const FooterList = ({ HEADING, DATA }: FOOTER_LIST_DATA) => {
  return (
    <Box>
      <Typography
        sx={{
          color: COLORS.FOOTER_TEXT_COLOR,
          fontSize: 16,
          fontFamily: tradeGothic.style.fontFamily,
          fontWeight: 700,
          lineHeight: "26px",
        }}
      >
        {HEADING}
      </Typography>
      <List>
        {DATA?.map((item) => (
          <ListItemButton sx={{ p: 0 }}>
            <Link href={item.href || ""} style={{ textDecoration: "none" }}>
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
                      opacity: 0.5,
                      py: 1,
                    },
                  },
                }}
              />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default FooterList;
