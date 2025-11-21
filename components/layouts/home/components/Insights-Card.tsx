import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { INSIGHTS_CARD_DATA } from "@/utils/types";
import { Add } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const InsightsCard = ({ heading, category, ctaButton }: INSIGHTS_CARD_DATA) => {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        border: "1px solid #EAEAEA",
        boxShadow: "0 5px 14px 0 rgba(8, 15, 52, 0.04)",
        height: 250,
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 600,
          }}
        >
          {heading}
        </Typography>
        <Button
          sx={{
            textDecoration: "underline",
            fontFamily: adelle.style.fontFamily,
            fontSize: 14,
            textTransform: "lowercase",
            color: COLORS.BLACK,
          }}
          startIcon={<Add sx={{ fontSize: 10 }} />}
        >
          {category?.text}
        </Button>

        <Box sx={{ textAlign: "center" }}>
          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              borderRadius: "54px",
              padding: "12px 30px",
              fontSize: 13,
              fontWeight: 400,
              color: COLORS.WHITE,
              width: 150,
              mt: 2,
            }}
          >
            {ctaButton?.text}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
