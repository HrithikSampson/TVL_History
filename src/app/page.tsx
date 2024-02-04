import React from "react";
import { ChainTVLData } from "./api/get_tvl_data/route";
import { headers } from "next/headers";
import { Metadata } from "next";

export default async function Home() {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocal}://${host}/api/get_tvl_data`, {
    method: "GET",
  });
  const data: ChainTVLData[] = await res.json();

  const tvlHTML = data.map(async (obj) => {
    try {
      const image = await fetch(
        `${protocal}://${host}/api/get_image?text=${obj.name}:+${obj.amount}`
      );
      const TVLhtml = await image.text();
      return { TVLhtml: TVLhtml, obj: obj };
    } catch (err) {
      return { TVLhtml: `<p>Error Loading the Image</p>`, obj: obj };
    }
  });
  return (
    <div>
      {tvlHTML.map(async (element) => {
        const { TVLhtml: html, obj: obj } = await element;
        return (
          <div key={obj.name} dangerouslySetInnerHTML={{ __html: html }} />
        );
      })}
    </div>
  );
}
