type OpenFeedbackSessions = {
    [id: string]: {
        speakers: string[];
        tags?: string[];
        title: string;
        id: string;
        startTime: string;
        endTime: string;
        trackTitle?: string;
    };
};

type SocialLink = {
    name: string;
    link: string | undefined;
}

type OpenFeedbackSpeakers = {
    [id: string]: OpenFeedbackSpeaker;
}

type OpenFeedbackSpeaker = {
    id: string;
    name: string | undefined;
    photoUrl: string | undefined;
    socials: SocialLink[];

}

type OpenFeedbackModel = {
    sessions: OpenFeedbackSessions;
    speakers: OpenFeedbackSpeakers; // Define a more detailed type based on available data
};