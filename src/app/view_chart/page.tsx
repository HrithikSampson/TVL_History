import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(
  { searchParams: { chainId } }: { searchParams: { chainId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log(chainId);
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  return {
    title: "Total Value Locked Chart",
    openGraph: {
      images: [
        {
          url: `${protocal}://${host}/api/get_tvl_data_image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": `${protocal}://${host}/api/get_tvl_data_image`,
      "fc:frame:button:1": "Back",
      "fc:frame:post_url": `${protocal}://${host}`,
    },
  };
}

export default function Page() {
  return <main></main>;
}