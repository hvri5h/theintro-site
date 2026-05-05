import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Intro — One curated coffee intro a week in Melbourne";

export default async function OG() {
  const logo = await readFile(path.join(process.cwd(), "public/logo.svg"));
  const logoDataUri = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#EAE3D5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logoDataUri} width={700} height={139} alt="" />
      </div>
    ),
    { ...size }
  );
}
