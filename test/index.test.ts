import path from "path";
import { GitTool } from "../src";

describe("GitTool", () => {
    const gitTool = new GitTool({
        projectDirectory: path.join(__dirname, "../"),
        versionReference: "npm",
    });
    test("hasGit", async () => {
        const value = await gitTool.getLatestVersion();
        expect(value).toBe("1.1.1");
    });
});
