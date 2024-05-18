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

type OpenFeedbackModel = {
    sessions: OpenFeedbackSessions;
    speakers: any; // Define a more detailed type based on available data
};