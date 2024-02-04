import { headers as requestHeaders } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  const host = requestHeaders().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  return NextResponse.redirect(`${protocal}://${host}/view_chart?chainId=${data?.unTrustedData?.inputText}`, 302);
//   const headers = new Headers();
//   headers.set("Location", `${process.env.NEXT_PUBLIC_BASE_URL}/`);
//   const response = NextResponse.redirect(
//     `${protocal}://${host}/view_chart?chainId=${data?.unTrustedData?.inputText}`,
//     {
//       headers: headers,
//       status: 302,
//     }
//   );
//   return response;
}
