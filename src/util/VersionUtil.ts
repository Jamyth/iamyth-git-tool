function compare(a: string, b: string): 1 | -1 | 0 {
    assertVersion(a);
    assertVersion(b);
    const [aMajor, aMinor, aPatch] = extractVersion(a);
    const [bMajor, bMinor, bPatch] = extractVersion(b);

    if (aMajor > bMajor) {
        return -1;
    } else if (bMajor > aMajor) {
        return 1;
    }

    if (aMinor > bMinor) {
        return -1;
    } else if (bMinor > aMinor) {
        return 1;
    }

    if (typeof bPatch === "number" && typeof aPatch === "number") {
        if (aPatch > bPatch) {
            return -1;
        } else if (bPatch > aPatch) {
            return 1;
        }
    }

    return 0;
}

function assertVersion(value: string) {
    if (value.split(".").length !== 3) {
        throw new Error(`[VersionUtil]: version pattern is not match "Major.Minor.Patch" as "1.0.0", but got ${value}`);
    }
}

function extractVersion(value: string): [number, number, string | number] {
    const version = value.split(".");
    if (version.some((_) => _ === undefined)) {
        throw new Error(
            `[VersionUtil]: extractVersion: input does not match type "Major.Minor.Patch" format, got ${value}`,
        );
    }
    const [major, minor, patch] = version;

    if (Number.isNaN(Number(major))) {
        throw new Error(`[VersionUtil]: extractVersion: major version should be numeric`);
    }

    if (Number.isNaN(Number(minor))) {
        throw new Error(`[VersionUtil]: extractVersion: minor version should be numeric`);
    }

    const parsedPatch = Number(patch);

    return [Number(major), Number(minor), Number.isNaN(parsedPatch) ? patch : parsedPatch];
}

export const VersionUtil = Object.freeze({ compare });
