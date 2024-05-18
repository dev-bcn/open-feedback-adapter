export interface Sessionize {
    readonly sessions: Session[];
    readonly speakers: Speaker[];
    readonly questions: any[];
    readonly categories: any[];
    readonly rooms: Room[];
}

export interface Room {
    readonly id: number;
    readonly name: string;
    readonly sort: number;
}

export interface Session {
    readonly id: string;
    readonly title: string;
    readonly description: null | string;
    readonly startsAt: string | null;
    readonly endsAt: string | null;
    readonly isServiceSession: boolean;
    readonly isPlenumSession: boolean;
    readonly speakers: string[];
    readonly categoryItems: any[];
    readonly questionAnswers: any[];
    readonly roomID: number | null;
    readonly liveURL: null;
    readonly recordingURL: null;
    readonly status: "Accepted";
    readonly isInformed: boolean;
    readonly isConfirmed: boolean;
}

export interface Speaker {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly bio: null;
    readonly tagLine: string;
    readonly profilePicture: string;
    readonly isTopSpeaker: boolean;
    readonly links: Link[];
    readonly sessions: number[];
    readonly fullName: string;
    readonly categoryItems: any[];
    readonly questionAnswers: QuestionAnswers[];
}

export interface Link {
    readonly title: LinkType;
    readonly url: string;
    readonly linkType: LinkType;
}

export type LinkType = "Twitter" | "LinkedIn";


export interface QuestionAnswers {
    questionId: number;
    answerValue: string;
}