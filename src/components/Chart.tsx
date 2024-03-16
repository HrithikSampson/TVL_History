
import React, { useState } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { Line } from "react-chartjs-2";

export async function generateMetadata(
  { searchParams: { chainId } }: { searchParams: { chainId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(chainId);
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";

  return {
    title: "Total Value Locked Chart",
  };
}

type ChartProps = {
  data: {
    labels: number[];
    datasets: {
      data: number[];
    }[];
  };
};

const Chart: React.FC<ChartProps> = ({ data }: ChartProps) => {
  

  return (
    <main>
      <Line
        data={data}
      />
    </main>
  );
};

export default Chart;
