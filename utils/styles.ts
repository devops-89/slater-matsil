import { COLORS } from "./enum";
import { adelle, tradeGothic } from "./fonts";

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
export const FLAT_TEXTFIELD_STYLES = {
  width: "100%",
  // height: "56px",
  // borderRadius: "28px",

  "& .MuiInputBase-input": {
    padding: "18px",
    "&.MuiAutocomplete-input": {
      paddingLeft: "18px",
      paddingTop: "18px",
      paddingBottom: "18px",
      paddingRight: "50px !important",
    },
  },
  // "& .MuiOutlinedInput-root": {
  //   borderRadius: "28px",
  // },

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

export const TAB_STYLES = {
  backgroundColor: COLORS.PRIMARY_BLUE,
  borderRadius: "36px",
  height: "72px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-list": {
    justifyContent: "space-around",
    alignItems: "center",
  },
  "& .MuiTab-root": {
    color: COLORS.WHITE,
    textAlign: "center",
    fontSize: 16,
    fontFamily: tradeGothic.style.fontFamily,
    fontWeight: 400,
    lineHeight: "32px",
  },
  "& .Mui-selected": {
    backgroundColor: COLORS.WHITE,
    color: `${COLORS.PRIMARY_BLUE} !important`,
    borderRadius: "32px",
  },
  display: "flex",
  alignItems: "center",
};

export const field_label_styles = {
  color: COLORS.PRIMARY_BLUE,
  fontFamily: adelle.style.fontFamily,
  fontSize: 18,
  fontWeight: 500,
  lineHeight: "30px",
};

export const para_field_styles = {
  color: COLORS.TEXT_PRIMARY_4,
  fontFamily: adelle.style.fontFamily,
  fontSize: { lg: 24, xs: 16 },
  fontWeight: 400,
  lineHeight: { lg: "36px", xs: "24px" },
};

export const contact_field_styles = {
  color: COLORS.PRIMARY_BLUE,
  fontFamily: adelle.style.fontFamily,
  fontSize: 20,
  fontWeight: 600,
};

export const contact_field_styles_2 = {
  color: COLORS.TEXT_PRIMARY_4,
  fontFamily: adelle.style.fontFamily,
  fontSize: 18,
  fontWeight: 400,
  // lineHeight: "48px",
  letterSpacing: "-0.48px",
};
