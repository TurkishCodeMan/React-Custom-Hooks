module.exports = {
    displayName: "REACT HOOKS",
    collectCoverageFrom: [
        "**/src/**/*.js"
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    modulePaths: ['<rootDir>/src', '<rootDir>/test'],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 13,
            functions: 19,
            lines: 18
        }
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy",
        //"\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/src/utils/___mocks___/file.mock.js"


    },
    coveragePathIgnorePatterns: [
        "/src/index.js",
        "/src/reportWebVitals.js",
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],


}