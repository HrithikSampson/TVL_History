import { headers as requestHeaders } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data:{untrustedData?:{inputText?: String}} = await req.json();
  const chain = data?.untrustedData?.inputText;


  const host = requestHeaders().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const cfg = data;
  
  return NextResponse.redirect(`${protocal}://${host}/api/chain/chainId=${chain}`, 302);

}
