import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
    /* Place for browser options if needed */
};

export const config = {
    browser: process.env.BROWSER || 'chromium',
    browserOptions,
    BASE_URL: 'https://rahulshettyacademy.com/client/',
    BASE_API_URL: 'https://rahulshettyacademy.com/api/ecom/auth/',
};
