import { spawn } from "child_process";
import type { SpawnOptionsWithoutStdio } from "child_process";

async function runCommand(command: string): Promise<string | null> {
    const options: SpawnOptionsWithoutStdio = {
        stdio: "pipe",
        cwd: process.cwd(),
    };

    try {
        const child = spawn("sh", ["-c", command], options);

        return new Promise((res) => {
            const stdoutList: string[] = [];

            if (child.stdout) {
                child.stdout.on("data", (data) => {
                    if (Buffer.isBuffer(data)) {
                        stdoutList.push(data.toString());
                    } else {
                        stdoutList.push(data);
                    }
                });
            }

            child.on("error", () => res(null));
            child.on("close", () => {
                if (stdoutList.length) {
                    res(stdoutList.join(""));
                } else {
                    res(null);
                }
            });
        });
    } catch (error) {
        return Promise.resolve(null);
    }
}

export const CommandUtil = Object.freeze({
    runCommand,
});
