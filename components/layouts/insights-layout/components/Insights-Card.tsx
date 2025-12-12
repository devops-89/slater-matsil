import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { INSIGHTS_DATA_PROPS } from "@/utils/types";
import { ArrowForward, CallMade } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

const InsightsCard = ({ bgColor, category, title }: INSIGHTS_DATA_PROPS) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundColor: bgColor,
          height: "347px",
          borderRadius: "10px",
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "72px",
            height: "26px",
            padding: "10px",
            borderRadius: "54px",
            backgroundColor: category ? "#DFFFFF" : "",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.BLACK,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
            fontSize: 14,
            textTransform: "capitalize",
          }}
        >
          {category}
        </Box>
        <Box sx={{ height: "90%", display: "grid", alignItems: "end" }}>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                color:
                  bgColor === COLORS.PRIMARY_BLUE ? COLORS.WHITE : COLORS.BLACK,
              }}
            >
              {title}
            </Typography>
            <Button
              sx={{
                color:
                  bgColor === COLORS.PRIMARY_BLUE
                    ? COLORS.WHITE
                    : COLORS.PRIMARY_BLUE,
                fontSize: 16,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                mt: 3,
              }}
              endIcon={<ArrowForward />}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
      <Stack
        sx={{
          position: "absolute",
          top: -5,
          right: -10,
          backgroundColor: COLORS.WHITE,
          borderRadius: 6,
          padding: "10px",
        }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          sx={{
            width: 20,
            height: 20,
            padding: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "20/20",
            borderRadius: "50%",
            backgroundColor: COLORS.BLACK,
          }}
        >
          <CallMade sx={{ color: COLORS.WHITE }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default InsightsCard;
