import { headers as requestHeaders } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const host = requestHeaders().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  const chainId = data?.untrustedData?.inputText

  return NextResponse.redirect(`${protocal}://${host}/view_chart?chainId=${chainId}`, 302);
}
