import {NextResponse} from 'next/server';
import {
    fetchSessionizeData
} from "@/components/open-feedback-adapter";

export async function GET() {
    const payload = await fetchSessionizeData(process.env.SESSIONIZE_URL_2025!);

    const response = NextResponse.json(payload);

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

}
