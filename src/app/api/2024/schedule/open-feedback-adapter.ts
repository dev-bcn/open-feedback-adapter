import {Sessionize, Speaker} from "@/app/api/2024/schedule/sessionize.type";
import axios from "axios";


const fetchSpeakerDetails = (speakers: Speaker[], speakerId: string) => {
    const speaker = speakers.filter((speaker) => speaker.id === speakerId).at(0);

    return {
        id: speakerId,
        name: speaker?.fullName,
        photoUrl: speaker?.profilePicture,
        socials: [
            {
                name: "twitter",
                link: speaker?.links
                    .filter((link) => link.linkType === "Twitter")
                    .at(0),
            },
            {
                name: "linkedin",
                link: speaker?.links
                    .filter((link) => link.linkType === "LinkedIn")
                    .at(0),
            },
        ],
    };
};

const fetchSessionizeData = async (): Promise<Sessionize> => {
    const data = await axios.get<Sessionize>(
        "https://sessionize.com/api/v2/ncjn5vz9/view/All",
    );
    console.log("Data fetch");
    return data.data;
};

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
            tags: [],
            trackTitle: "",
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