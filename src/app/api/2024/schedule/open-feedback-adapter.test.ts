import {
    convertSessionizeToOpenFeedback
} from "@/app/api/2024/schedule/open-feedback-adapter";
import {Sessionize} from "@/app/api/2024/schedule/sessionize.type";

describe("Open Feedback adapter tests", () => {

    it("should convert sessionize data to open feedback", () => {
        const sampleData: Sessionize = {
            sessions: [
                {
                    id: "637197",
                    title: "Acelerando la incorporación de perfiles en el equipo:  lecciones basadas en una historia real",
                    description: "En el ámbito del desarrollo de software, la rápida incorporación de personas nuevas es esencial para mantener el ritmo de los proyectos y garantizar la eficiencia del equipo.\r\n\r\nEn esta charla exploraremos una historia real que ofrece lecciones útiles sobre cómo incorporar personas al equipo de manera efectiva y natural.",
                    startsAt: null,
                    endsAt: null,
                    isServiceSession: false,
                    isPlenumSession: false,
                    speakers: [
                        "c3fc49e6-cead-46ee-80ca-cfc763282ef6"
                    ],
                    categoryItems: [
                        233785,
                        233793,
                        233795,
                        233799
                    ],
                    questionAnswers: [
                        {
                            "questionId": 66341,
                            "answerValue": "Lean, Agile, TeamManagement"
                        },
                        {
                            "questionId": 66342,
                            "answerValue": "https://docs.google.com/presentation/d/1tX4sqmXqtRM-Tn-mKe35kEUVN7zt2j_7Ske_1obOTjc/edit?usp=sharing"
                        }
                    ],
                    roomID: null,
                    liveURL: null,
                    recordingURL: null,
                    status: "Accepted",
                    isInformed: true,
                    isConfirmed: true
                }
            ],
            speakers: [{
                id: "c3fc49e6-cead-46ee-80ca-cfc763282ef6",
                firstName: "John",
                lastName: "Doe",
                bio: "John Doe is a software engineer at Google.",
                tagLine: "John Doe is a software engineer at Google.",
                profilePicture: "https://avatars.githubusercontent.com/u/12345678?v=4",
                isTopSpeaker: true,
                links: [
                    {
                        title: "LinkedIn",
                        linkType: "LinkedIn",
                        url: "https://www.linkedin.com/in/john-doe-12345678/"
                    },
                    {
                        title: "Twitter",
                        linkType: "Twitter",
                        url: "https://twitter.com/johndoe12345678"
                    }],
                sessions: [],
                fullName: "John Doe",
                categoryItems: [
                    {
                        id: 0,
                        title: "Track",
                        items: [{id: 1, sort: 0, name: "Test track"}
                        ]
                    }],
                questionAnswers: [
                    {questionId: 0, answerValue: "test"}
                ]
            }],
            questions: [],
            categories: [
                {
                    id: 66333,
                    title: "Track",
                    items: [
                        {
                            "id": 233809,
                            "name": "Java & JVM (core frameworks & libraries, Kotlin, Scala, Groovy, Architecture)",
                            "sort": 1
                        },
                        {
                            "id": 233789,
                            "name": "FrontEnd (TypeScript, JavaScript, AngularJS, ReactJS, ....)",
                            "sort": 2
                        },
                        {
                            "id": 233790,
                            "name": "DevOps, Kubernetes & Cloud (VMs, Docker, Security, ...)",
                            "sort": 3
                        },
                        {
                            "id": 233791,
                            "name": "AI, ML, Bigdata, Python",
                            "sort": 4
                        },
                        {
                            "id": 233793,
                            "name": "Agile, leadership, diversity (Management techniques, diversity and inclusivity, ...)",
                            "sort": 5
                        }
                    ]
                }
            ],
            rooms: [{
                name: "test room",
                id: 1,
                sort: 0
            }]
        };
        const expectedResult: OpenFeedbackModel = {
            sessions: {
                "637197": {
                    id: "637197",
                    title: "Acelerando la incorporación de perfiles en el equipo:  lecciones basadas en una historia real",
                    speakers: ["c3fc49e6-cead-46ee-80ca-cfc763282ef6"],
                    trackTitle: "Agile, leadership, diversity (Management techniques, diversity and inclusivity, ...)",
                    endTime: "",
                    startTime: "",
                    tags: ["Lean", "Agile", "TeamManagement"],
                }
            },
            speakers: {
                "c3fc49e6-cead-46ee-80ca-cfc763282ef6": {
                    name: "John Doe",
                    id: "c3fc49e6-cead-46ee-80ca-cfc763282ef6",
                    socials: [
                        {
                            name: "Twitter",
                            link: "https://twitter.com/johndoe12345678"
                        },
                        {
                            name: "LinkedIn",
                            link: "https://www.linkedin.com/in/john-doe-12345678/"
                        }
                    ],
                    photoUrl: "https://avatars.githubusercontent.com/u/12345678?v=4"
                }

            }
        };
        const result: OpenFeedbackModel = convertSessionizeToOpenFeedback(sampleData)

        expect(result).not.toBeNull();
        expect(result).toStrictEqual(expectedResult);
    });

});