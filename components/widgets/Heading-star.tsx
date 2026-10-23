import whiteStar from "@/public/images/common/heading-star.png";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
const HeadingStar = ({ title }: { title: string }) => {
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_GREEN,
            width: 10,
            height: 10,
            borderRadius: 20,
            padding: "11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={whiteStar} alt="" />
        </Box>
        <Typography
          sx={{
            fontSize: 16,
            fontFamily: adelle.style.fontFamily,
            fontWeight: 400,
            color: COLORS.PRIMARY_GREEN,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </div>
  );
};

export default HeadingStar;
