import { LaunchOptions } from '@playwright/test';
import { LogTypes } from './src/logging';
const browserOptions: LaunchOptions = {
    /* Place for browser options if needed */
    headless: true
};

type ENV = {
    LOGGING_ENABLED: boolean,
    HIDE_SECRETS: boolean,
    LOG_LEVEL: LogTypes
}

type Config = {
    browser: string,
    browserOptions: LaunchOptions,
    BASE_URL?: string,
    BASE_API_URL?: string,
    fixturesPath?: string,
    testDataPath?: string,
    secretsPath?: string,
    endpoints: Object,
    env?: ENV
}

export const config: Config = {
    browser: process.env.BROWSER || 'chromium',
    browserOptions,
    BASE_URL: 'https://rahulshettyacademy.com/client',
    BASE_API_URL: 'https://rahulshettyacademy.com/api/ecom/auth/',
    endpoints: {
        register: "register",
    },
    fixturesPath: 'fixtures/',
    testDataPath: 'test-data/',
    env: {
        LOGGING_ENABLED: false,
        HIDE_SECRETS: false,
        LOG_LEVEL: "test"
    },
    secretsPath: 'secrets/'
};
