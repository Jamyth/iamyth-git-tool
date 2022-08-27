export interface IGitTool {
    run(): void;
    checkHasGit(): void;
    getLatestVersion(): Promise<string>;
}

export type VersionReference = "git" | "npm";

export interface GitToolOptions {
    projectDirectory: string;
    versionReference: VersionReference;
    gitVersionMapper?: (branchName: string) => string;
}
