import { COLORS } from "@/utils/enum";
import { TAB_STYLES } from "@/utils/styles";
import { TAB_SWITCHING_PROPS } from "@/utils/types";
import { Tab, Tabs } from "@mui/material";
import React from "react";

const TabSwitching = ({ value, onChange, data, sx }: TAB_SWITCHING_PROPS) => {
  return (
    <div>
      <Tabs
        sx={{
          ...TAB_STYLES,
          px: 2,
          "& .MuiTab-root": {
            color: COLORS.WHITE,
            textAlign: "center",
            fontSize: { lg: 15, xs: 14 },
            fontWeight: 600,
            lineHeight: { lg: "32px", xs: "22px" },
          },
          ...sx,
        }}
        value={value}
        onChange={onChange}
      >
        {data.map((val, i) => (
          <Tab key={i} label={val.title} />
        ))}
      </Tabs>
    </div>
  );
};

export default TabSwitching;
