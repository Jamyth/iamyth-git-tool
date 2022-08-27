import { CommandUtil } from "../src";

describe("CommandUtil", () => {
    describe("runCommand", () => {
        test("test ls", async () => {
            const output = await CommandUtil.runCommand("ls -l");
            expect(typeof output).toBe("string");
        });

        test("test git version", async () => {
            const output = await CommandUtil.runCommand("git --version");
            expect(typeof output).toBe("string");
        });

        test("test non exist pkg", async () => {
            const output = await CommandUtil.runCommand("anoy-pkg");
            expect(output).toBe(null);
        });

        test("test npm info", async () => {
            const output = await CommandUtil.runCommand("npm show git-tool version");
            expect(typeof output).toBe("string");
        });
    });
});
