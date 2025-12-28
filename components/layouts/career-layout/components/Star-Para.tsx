import star from "@/common/heading-star.png";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import Image from "next/image";
interface Props {
  title?: string;
  description: string;
  sx?: SxProps<Theme>;
}
const StarPara = ({ title, description, sx }: Props) => {
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_GREEN,
            width: { lg: 40, xs: 30 },
            height: { lg: 40, xs: 30 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <Image src={star} alt="" />
        </Box>
        <Typography
          sx={{
            fontSize: { lg: 16, xs: 12 },
            fontFamily: adelle.style.fontFamily,
            textTransform: "uppercase",
            fontWeight: 400,
            lineHeight: "26px",
            color: COLORS.PRIMARY_GREEN,
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography sx={sx}>{description}</Typography>
    </Box>
  );
};

export default StarPara;
