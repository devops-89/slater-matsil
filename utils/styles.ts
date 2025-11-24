import { COLORS } from "./enum";

export const TEXTFIELD_STYLES = {
  width: "100%",
  height: "56px",
  borderRadius: "28px",

  "& .MuiInputBase-input": {
    padding: "18px",
    "&.MuiAutocomplete-input": {
      paddingLeft: "18px",
      paddingTop: "18px",
      paddingBottom: "18px",
      paddingRight: "50px !important",
    },
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "28px",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(6, 50, 50, 0.15)",
  },

  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: COLORS.PRIMARY_BLUE,
  },
  "& label": {
    color: COLORS.LABEL_COLOR,
  },
};
