
import React, { useState } from 'react';
import Head from 'next/head';
import { Metadata } from 'next';
import { ChainTVLData } from './api/get_tvl_data/route';

export default async function Home () {
  // const data: ChainTVLData[] = await fetch(`${process.env.API_URL}/api/get_tvl_data`).then((res)=>res.json());
  // const tvlHTML = data.map(async (obj)=>{
  //   try{
  //     const image = await fetch(`${process.env.API_URL}/get_image?text=${obj.name}:+${obj.amount}`);
  //     const TVLhtml = await image.text();
  //     return {TVLhtml:TVLhtml,obj:obj}
  //   }
  //   catch(err){
  //     return {TVLhtml:`<p>Error Loading the Image</p>`,obj:obj}
  //   }
  // })
  return (
    <div>
      {/* {tvlHTML.map(async (element)=>{
        const {TVLhtml:html,obj:obj} = await element;
        return(<div key={obj.name} dangerouslySetInnerHTML={{ __html: html }} />)
      })} */}
    </div>
  );
};

