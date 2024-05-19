import {
    CategoryItem,
    QuestionAnswers,
    Sessionize,
    Speaker
} from "@/app/api/2024/schedule/sessionize.type";
import axios from "axios";

export const extractSessionTags = (
    questionAnswers: QuestionAnswers[],
) => {
    return questionAnswers
        .filter((question) => question.questionId === 66341)
        .map((question) => question.answerValue)
        .at(0)?.split(",");
};

const fetchSpeakerDetails = (speakers: Speaker[], speakerId: string): OpenFeedbackSpeaker => {
    const speaker = speakers.filter((speaker) => speaker.id === speakerId).at(0);

    return {
        id: speakerId,
        name: speaker?.fullName,
        photoUrl: speaker?.profilePicture,
        socials: [
            {
                name: "Twitter",
                link: speaker?.links
                    .filter((link) => link.linkType === "Twitter")
                    .at(0)?.url,
            },
            {
                name: "LinkedIn",
                link: speaker?.links
                    .filter((link) => link.linkType === "LinkedIn")
                    .at(0)?.url,
            },
        ],
    };
};

const fetchSessionizeData = async (): Promise<Sessionize> => {

    console.log("Fetching sessionize data", process.env.SESSIONIZE_URL);

    if (process.env.SESSIONIZE_URL) {
        const data = await axios.get<Sessionize>(
            process.env.SESSIONIZE_URL,
        );
        return data.data;
    }
    throw new Error("No sessionize url found");
};

const extractSessionizeTracks = (sessionizeJson: Sessionize): CategoryItem | undefined => {
    return sessionizeJson.categories.filter((category) => category.title === "Track").at(0);
}

const matchSessionTrack = (tracks: CategoryItem | undefined, categoryItems: number[]): string | undefined => {
    return tracks?.items.filter((track) => categoryItems.includes(track.id)).at(0)?.name;
}

const convertSessionizeToOpenFeedback = (
    sessionizeJson: Sessionize,
): OpenFeedbackModel => {
    const openFeedbackModel: OpenFeedbackModel = {sessions: {}, speakers: {}};

    sessionizeJson.sessions.forEach((session) => {
        const sessionId = session.id;

        openFeedbackModel.sessions[sessionId] = {
            speakers: session.speakers,
            title: session.title,
            id: sessionId,
            startTime: session.startsAt ?? "",
            endTime: session.endsAt ?? "",
            tags: extractSessionTags(session.questionAnswers),
            trackTitle: matchSessionTrack(extractSessionizeTracks(sessionizeJson), session.categoryItems),
        };

        session.speakers.forEach((speakerId) => {
            openFeedbackModel.speakers[speakerId] = fetchSpeakerDetails(
                sessionizeJson.speakers,
                speakerId,
            );
        });
    });

    return openFeedbackModel;
};

export {convertSessionizeToOpenFeedback, fetchSessionizeData};