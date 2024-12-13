import { connectToDB } from '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';


export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<Response> {
    try {
        await connectToDB();
        return new Response("OK")
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return new Response(`Webhook error: ${errorMessage}`, {
            status: 400,
        });
    }
}
