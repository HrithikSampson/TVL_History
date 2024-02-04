import { NextRequest, NextResponse } from "next/server";

export type ChainTVLData = {
    name: string,
    amount: number;
  };
  
  type ResponseData = {
      currentChainTvls: Record<string, number>;
  };
const getTVLData = async () => {
    const response = await fetch(`https://api.llama.fi/protocol/timeswap`);
    const data: ResponseData = await response.json();
    const tvlData: ChainTVLData[] = Object.entries(data.currentChainTvls).map(([key, value]) => ({
      name: key,
      amount: value,
    }));
  
    return tvlData;
};
export async function GET(req: NextRequest) {
    try{
        const data = await getTVLData();
        return NextResponse.json(
            data
            ,
            { status: 200 }
        )
        
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {message:'Error Loading the Image'},{status: 500}
        );
    }
}