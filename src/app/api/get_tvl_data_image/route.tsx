import { CHAINS } from "@/utils/chains";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
export const runtime = "edge";
export const dynamic = "force-dynamic";

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
          flexDirection: "column", // Set the main container to column
          width: "100%",
          height: "100%",
          backgroundColor: "f4f4f4",
          padding: 20,
          lineHeight: 1.2,
          fontSize: 24,
        }}
      >
        <h2 style={{ textAlign: "center", color: "lightgray" }}>
          Total Value Locked
        </h2>
        {tvlData.map((opt, index) => {
          if (index % 2 === 0) {
            return (
              <div
                key={index}
                style={{
                  marginTop: index === 0 ? "24px" : "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  gap: "16px", 
                }}
              >
                <ItemComponent opt={tvlData[index]} />
                {tvlData[index + 1] && (
                  <ItemComponent opt={tvlData[index + 1]} />
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    ),
    { width: 1720, height: 900 }
  );
}

function ItemComponent({ opt }: { opt: ChainTVLData }) {
  
  const host = headers().get("host");
  
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  return (
    <div
      style={{
        color: "#fff",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        width: "40%",
        whiteSpace: "nowrap",
        overflow: "visible",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {(opt.name in CHAINS)?
        <>
          <img
            src={CHAINS[opt.name as keyof typeof CHAINS].icon}
            alt={opt.name}
            height={60}
            width={60}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: '16px' }}>
            <h3>{opt.name}</h3>
            <div style={{ display: "flex", margin: 0, padding: 0, height: 30, gap: '16px' }}>
              TVL: ~ USD {Math.round(opt.amount)}
              {' '}
              (ID: {CHAINS[opt.name as keyof typeof CHAINS].id})
            </div>
          </div>
        </>:<>
          
        <img
            src={`${protocal}://${host}/api/chain_image?name=${opt.name}`}
            alt={opt.name}
            height={60}
            width={60}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: '16px' }}>
            <h3>{opt.name}</h3>
            <div style={{ display: "flex", margin: 0, padding: 0, height: 30, gap: '16px' }}>
              TVL: ~ USD {Math.round(opt.amount)}
              {' '}
              (ID: )
            </div>
          </div>
        </>}
    </div>
  );
}
