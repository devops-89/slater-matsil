import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { STRENGTH_CARD_PROPS } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const StrengthCard = ({ img, title, description }: STRENGTH_CARD_PROPS) => {
  return (
    <Box
      component={motion.div}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      sx={{ height: "100%" }}
    >
      <Box
        sx={{
          backgroundColor: COLORS.PRIMARY_BLUE_LIGHT,
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          height: "100%", // Switch to 100% instead of 220 fixed
          minHeight: 200, // Add minHeight instead of fixed height
          transition: "all 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            backgroundColor: COLORS.WHITE,
            border: `1px solid ${COLORS.PRIMARY_BLUE}`,
          },
        }}
      >
        <Box
          className="icon-box"
          sx={{
            backgroundColor: COLORS.WHITE,
            width: 50,
            height: 50,
            padding: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
          }}
        >
          <Image src={img} alt="settings" />
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            color: COLORS.BLACK,
            lineHeight: "43px",
            textAlign: "center",
            mt: 2,
          }}
        >
          {" "}
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 400,
            color: COLORS.TEXT_PRIMARY_4,
            lineHeight: "26px",
            textAlign: "center",
            mt: 2,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StrengthCard;
