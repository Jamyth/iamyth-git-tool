import { spawnSync } from "child_process";

function runCommand(command: string, args: string[]): (string | null)[] {
    const result = spawnSync(command, args, { encoding: "utf-8" });
    return result.output;
}

export const CommandUtil = Object.freeze({
    runCommand,
});
