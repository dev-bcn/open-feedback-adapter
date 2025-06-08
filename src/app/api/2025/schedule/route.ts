import {NextResponse} from 'next/server';
import {
    convertSessionizeToOpenFeedback,
    fetchSessionizeData
} from "@/components/open-feedback-adapter";

export async function GET() {
    const payload = await fetchSessionizeData(process.env.SESSIONIZE_URL_2025!);

    const converted = convertSessionizeToOpenFeedback(payload);
    return NextResponse.json(converted);
}
