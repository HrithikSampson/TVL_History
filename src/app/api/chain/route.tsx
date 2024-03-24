import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
// import dynamic from "next/dynamic";
const { Chart,registerables } = require('chart.js');
const { createCanvas } = require('canvas');

// export const runtime = "edge";
// export const dynamic = 'force-dynamic';
// Make sure to register the necessary components for Chart.js

Chart.register(...registerables);


export type ChainTVLData = {
  date: Number,
  tvl: Number
};


const getTVLData = async (s: string) => {
  // console.log(`https://api.llama.fi/v2/historicalChainTvl/${s}`)
  const response = await fetch(`https://api.llama.fi/v2/historicalChainTvl/${s}`);
  const data: ChainTVLData[] = await response.json();
  const tvlData: ChainTVLData[] = data;
  // console.log(data)
  return tvlData;
};



export async function GET(req: NextRequest) {
  
  const s = req.nextUrl.searchParams.get('chainId')!;
  // console.log(req.nextUrl.searchParams);
  const tvlData = await getTVLData(s);
  // console.log('tvlData',tvlData)
  const data = await tvlData
  // console.log(data.slice(0,10));
  // const data1 = data.slice(0,10)
  const labels = tvlData.map(data => data.date);
  const dataPoints = tvlData.map(data => data.tvl);
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  const chartConfiguration = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Value Locked',
        data: dataPoints,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 5,
        fill: false,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
        }
      },
      animation: {
        duration: 0,
      },
      devicePixelRatio: 3,
    },
  };

  // Now you can use `chart.js` to draw on this canvas
  const chart = new Chart(ctx, chartConfiguration);
  const buffer = canvas.toBuffer('image/png');
  return new Response(buffer,{
    headers:{
      'Content-Type': 'image/png'
    }
  });
}