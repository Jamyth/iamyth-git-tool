export interface IGitTool {
    run(): void;
    checkHasGit(): void;
    getLatestVersion(): string;
}

export type VersionReference = "git" | "npm";

export interface GitToolOptions {
    projectDirectory: string;
    versionReference: VersionReference;
}
