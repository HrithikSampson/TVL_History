import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(
  { searchParams: { chainId } }: { searchParams: { chainId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(chainId);
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  
  return {
    title: "Total Value Locked Chart",
    openGraph: {
      images: [
        {
          url: `${protocal}://${host}/api/chain?chainId=${chainId}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      'of:version': 'vNext',
      'of:accepts:farcaster':'vNext',
      "of:image": `${protocal}://${host}/api/chain?chainId=${chainId}`,
      "of:button:1": "Back",
      'of:accepts:xmtp': '2024-02-01',
      'of:accepts:lens': '1.1',
      "of:post_url": `${protocal}://${host}`,
      'of:image:alt':'Chart for ${chainId}',
    },
  };
}

export default function Page() {
  return <main></main>;
}
