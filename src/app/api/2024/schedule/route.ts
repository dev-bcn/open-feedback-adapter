import {NextResponse} from 'next/server';
import {
    convertSessionizeToOpenFeedback,
    fetchSessionizeData
} from "@/app/api/2024/schedule/open-feedback-adapter";

export async function GET() {
    const payload = await fetchSessionizeData();

    const converted = convertSessionizeToOpenFeedback(payload);
    return NextResponse.json(converted);
}
