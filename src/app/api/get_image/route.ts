
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic';
export function GET(req: NextRequest) {
    try{
        const text = req.nextUrl.searchParams.get('text');
        
        
        
        return new NextResponse(
            `
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>TVL of Chain</title>
                    <meta property="og:title" content="Total Value">
                    <meta name="fc:frame" content="vNext"/>
                    <meta name="image" property="og:image" content="https://placehold.co/400x209?text=${text}"/>
                  </head>
       
                    <body>
                        <h1>Hello, World!</h1>
                        <p>Welcome to our website.</p>
                    </body>
                </html>
            `,
            { status: 200, headers: { 'content-type': 'text/html' } }
        )
        
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {message:'Error Loading the Image'},{status: 500}
        );
    }
}