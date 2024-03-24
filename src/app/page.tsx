import React from "react";
import type { Metadata, ResolvingMetadata } from 'next'
import { headers } from "next/headers";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
 
  return {
    title: 'Total Value Locked Homepage',
    openGraph: {
      images: [{
        url: `${protocal}://${host}/api/get_tvl_data_image`,
        width: 1200,
        height: 630
      }],
    },
    other: {
      'of:version': 'vNext',
      'of:accepts:farcaster':'vNext',
      "of:image": `${protocal}://${host}/api/get_tvl_data_image`,
      'of:input:text': 'Enter the chain name',
      'of:button:1': 'View chart',
      'of:accepts:xmtp': '2024-02-01',
      'of:accepts:lens': '1.1',
      'of:image:alt':'All Chains TVL data',
      'of:post_url': `${protocal}://${host}/api/process_signature`,
    }
  }
}

export default function Home() {
  
  return <main />
}
