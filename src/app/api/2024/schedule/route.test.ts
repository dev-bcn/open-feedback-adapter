import {GET} from "@/app/api/2024/schedule/route";

describe("GET schedule api", () => {
    it("should return 2024 schedule", async () => {

        const response = await GET();
        const json = await response.json();
        console.log(json)

        expect(json).not.toBeNull();
    });
});