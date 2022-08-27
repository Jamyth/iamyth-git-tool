import path from "path";
import fs from "fs";
import { CommandUtil } from "./util/CommandUtil";
import { createConsoleLogger } from "@iamyth/logger";
import { VersionUtil } from "./util/VersionUtil";
import type { IGitTool, GitToolOptions, VersionReference } from "./type";

export class GitTool implements IGitTool {
    private readonly projectDirectory: string;
    private readonly versionReference: VersionReference;
    private readonly gitVersionMapper: (branchName: string) => string;
    private readonly logger = createConsoleLogger("Git Tool");

    constructor({ projectDirectory, versionReference, gitVersionMapper }: GitToolOptions) {
        this.projectDirectory = projectDirectory;
        this.versionReference = versionReference;
        this.gitVersionMapper = gitVersionMapper ?? ((_: string) => _);
    }

    run() {
        try {
            this.getLatestVersion();
        } catch (error) {
            this.logger.error(error as Error);
            process.exit(1);
        }
    }

    async getLatestVersion() {
        if (this.versionReference === "npm") {
            const packageJSONPath = path.join(this.projectDirectory, "./package.json");
            if (!fs.existsSync(packageJSONPath)) {
                throw new Error(`Package.json is not found, searching: ${packageJSONPath}`);
            }
            // eslint-disable-next-line import/no-dynamic-require -- file resolved
            const packageJSON = require(packageJSONPath);
            const version: string = packageJSON.version;
            const name: string = packageJSON.name;
            const registryVersion = await CommandUtil.runCommand(`npm show ${name} version`);
            if (registryVersion) {
                const latestVersion = [version, registryVersion.split("\n")[0]].sort(VersionUtil.compare);
                console.info(latestVersion);
            } else {
                return version;
            }
        } else {
            await this.checkHasGit();
        }
        return "Test";
    }

    async checkHasGit() {
        const result = await CommandUtil.runCommand("git --version");
        if (!result) {
            throw new Error("git is not installed");
        }
    }

    async getAllBranch() {
        const result = await CommandUtil.runCommand("git branch -a");
        if (!result) {
            throw new Error("git branch not found");
        }
        const branches = result.split("\n").map(this.gitVersionMapper);

        const sortedBranches = branches.sort(VersionUtil.compare);

        console.info(sortedBranches);
    }

    async getRemotes() {
        const remotes = await CommandUtil.runCommand("git remote");
        if (!remotes) {
            return null;
        }
        return remotes.split("\n");
    }

    private async filterBranch(branch: string) {
        const remotes = await this.getRemotes();
    }
}
