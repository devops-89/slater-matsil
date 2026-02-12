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
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: `1px solid ${COLORS.PRIMARY_BLUE}`,
          "& .add-icon": {
            color: COLORS.PRIMARY_BLUE,
          },
        },
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
            "&:hover": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            },
          }}
          startIcon={
            <Add
              className="add-icon"
              sx={{
                fontSize: 10,
                transition: "color 0.3s ease",
              }}
            />
          }
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
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: COLORS.PRIMARY_GREEN,
              },
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
