import {NextResponse} from 'next/server';
import {
    convertSessionizeToOpenFeedback,
    fetchSessionizeData
} from "@/components/open-feedback-adapter";

export async function GET(request: Request, {params}: {params: Promise<{year: string}>}) {
    const { year } = await params;
    const sessionizeUrl = process.env[`SESSIONIZE_URL_${year}`];
    
    if (!sessionizeUrl) {
        return NextResponse.json({ error: "Configuration not found for the given year" }, { status: 404 });
    }

    const payload = await fetchSessionizeData(sessionizeUrl);

    const converted = convertSessionizeToOpenFeedback(payload);
    const response = NextResponse.json(converted);

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
}
