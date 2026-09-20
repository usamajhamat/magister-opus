import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#1B3654",
          color: "#B8954A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontFamily: "Georgia",
        }}
      >
        MO
      </div>
    ),
    size,
  );
}
