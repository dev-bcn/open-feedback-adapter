import {NextResponse} from 'next/server';
import {
    convertSessionizeToOpenFeedback,
    fetchSessionizeData
} from "@/components/open-feedback-adapter";

export async function GET() {
    const payload = await fetchSessionizeData(process.env.SESSIONIZE_URL_2025!);

    const converted = convertSessionizeToOpenFeedback(payload);
    const response = NextResponse.json(converted);

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;

}
