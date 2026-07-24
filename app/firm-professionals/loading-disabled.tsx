"use client";

import loadingData from "@/public/images/loading2.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
    >
      <DotLottieReact
        data={loadingData}
        loop
        autoplay
        style={{ width: 250, height: 250 }}
      />
    </div>
  );
}
