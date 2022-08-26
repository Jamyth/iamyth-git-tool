// @ts-check

/** @type {import('@jest/types').Config.InitialOptionsWithRootDir} */
const config = {
    moduleFileExtensions: ["js", "ts", "json"],
    rootDir: ".",
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/config/tsconfig.test.json",
        },
    },
    roots: ["<rootDir>"],
    testEnvironment: "node",
    testRegex: [String.raw`\.test\.ts$`],
    transform: {
        [String.raw`^.+\.ts$`]: "ts-jest",
    },
};

module.exports = config;
