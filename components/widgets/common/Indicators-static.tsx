import { COLORS } from "@/utils/enum";
import { Circle } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import React from "react";

const StaticIndicators = () => {
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
        <Circle sx={{ color: COLORS.PRIMARY_BLUE, width: 10 }} />
        <Box
          sx={{
            backgroundColor: COLORS.PRIMARY_BLUE,
            width: 100,
            height: 5,
            borderRadius: "5px",
          }}
        ></Box>
      </Stack>
    </div>
  );
};

export default StaticIndicators;
