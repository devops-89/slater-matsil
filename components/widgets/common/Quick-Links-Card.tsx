import { adelle } from "@/utils/fonts";
import { QUICK_LINKS_CARD_PROPS } from "@/utils/types";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
const QuickLinksCard = ({ title, img }: QUICK_LINKS_CARD_PROPS) => {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px",
            borderRadius: "4.87px",
            backgroundColor: "#ECF8F8",
          }}
        >
          <Image src={img} alt="building" />
        </Box>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#231F20",
            fontFamily: adelle.style.fontFamily,
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default QuickLinksCard;
