import localFont from "next/font/local";

export const tradeGothic = localFont({
  src: [
    {
      path: "../public/fonts/Trade Gothic LT Std Extended/Trade Gothic LT Std Extended.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const adelle = localFont({
  src: [
    {
      path: "../public/fonts/Adelle Font/Adelle Reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Adelle Font/Adelle Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Adelle Font/Adelle Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
});
