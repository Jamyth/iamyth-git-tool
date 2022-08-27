import { CommandUtil } from "./util/CommandUtil";
import { createConsoleLogger } from "@iamyth/logger";
import type { IGitTool, GitToolOptions, VersionReference } from "./type";

export class GitTool implements IGitTool {
    private readonly projectDirectory: string;
    private readonly versionReference: VersionReference;
    private readonly logger = createConsoleLogger("Git Tool");

    constructor({ projectDirectory, versionReference }: GitToolOptions) {
        this.projectDirectory = projectDirectory;
        this.versionReference = versionReference;
    }

    run() {
        try {
            this.getLatestVersion();
        } catch (error) {
            this.logger.error(error as Error);
            process.exit(1);
        }
    }

    getLatestVersion(): string {
        if (this.versionReference === "npm") {
            //
        } else {
            this.checkHasGit();
        }
        return "Test";
    }

    checkHasGit() {
        const result = CommandUtil.runCommand("git", ["--version"]);
        if (!result.every(Boolean)) {
            throw new Error("git is not installed");
        }
    }

    getAllBranch() {
        const result = CommandUtil.runCommand("git", ["branch", "-a"]);
    }
}
