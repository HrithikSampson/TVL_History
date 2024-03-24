
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get('name')!;
    return new ImageResponse(
      (
        
        <div className="italic" style={{
            display: 'flex',
            justifyContent: 'center',
            textShadow: '0 0 3px white', 
            fontWeight: "bold",
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'black'
        }}
        >
            <div style={{
                textAlign: 'center',
                color: '#d6d8da'
            }}>
            {name}
            </div>
        </div>
  
      ),
      { width: 60, height: 60 }
    );
  }
  