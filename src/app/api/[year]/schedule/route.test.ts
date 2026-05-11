import { GET } from "@/app/api/[year]/schedule/route";

describe("GET schedule api", () => {
    it("should return schedule for a valid year", async () => {
        const mockRequest = new Request("http://localhost/api/2024/schedule");
        const params = Promise.resolve({ year: "2024" });

        const response = await GET(mockRequest, { params });
        
        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json).not.toBeNull();
    });

    it("should return 404 for an invalid year", async () => {
        const mockRequest = new Request("http://localhost/api/1999/schedule");
        const params = Promise.resolve({ year: "1999" });

        const response = await GET(mockRequest, { params });
        
        expect(response.status).toBe(404);
        const json = await response.json();
        expect(json.error).toBe("Configuration not found for the given year");
    });
});
