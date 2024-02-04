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
      'fc:frame': 'vNext',
      'fc:frame:image': `${protocal}://${host}/api/get_tvl_data_image`,
      'fc:frame:input:text': 'Enter the chain ID',
      'fc:frame:button:1': 'View chart',
    }
  }
}

export default function Home() {
  
  return <main />
}
