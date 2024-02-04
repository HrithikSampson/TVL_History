import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export type ChainTVLData = {
  name: string;
  amount: number;
};

type ResponseData = {
  currentChainTvls: Record<string, number>;
};

const getTVLData = async () => {
  const response = await fetch(`https://api.llama.fi/protocol/timeswap`);
  const data: ResponseData = await response.json();
  const tvlData: ChainTVLData[] = Object.entries(data.currentChainTvls).map(
    ([key, value]) => ({
      name: key,
      amount: value,
    })
  );
  return tvlData;
};

export async function GET(req: NextRequest) {
  const tvlData = await getTVLData();

  return new ImageResponse(
    (
      <div
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "f4f4f4",
          padding: 50,
          lineHeight: 1.2,
          fontSize: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <h2 style={{ textAlign: "center", color: "lightgray" }}>
            Total Value Locked
          </h2>
          {...tvlData.map((opt, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 4,
                  width: "20%",
                  whiteSpace: "nowrap",
                  overflow: "visible",
                  display: "flex",
                }}
              >
                {opt.name} - {opt.amount}
              </div>
            );
          })}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
