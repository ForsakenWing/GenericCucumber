import { chromium, firefox, webkit, ChromiumBrowser, FirefoxBrowser, WebKitBrowser } from '@playwright/test';
import { ICustomWorld } from './custom_world';
import { setDefaultTimeout, Before, BeforeAll, After, AfterAll } from '@cucumber/cucumber';
import { config } from '../../config';
import { ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import axios from 'axios';
import { testData } from '../../support/utilities/files';


const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? 15 * 1000 : 60 * 1000);

BeforeAll(async function () {
  switch (((browser: string | undefined) => {
    if (typeof browser == 'string') {
      return browser.toLowerCase()
    };
  })(config.browser)) {
    case 'webkit':
      global.browser = await webkit.launch(config.browserOptions)
      break
    case 'firefox':
      global.browser = await firefox.launch(config.browserOptions)
      break
    default:
      global.browser = await chromium.launch(config.browserOptions)
      break
  };
})

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: { width: 1200, height: 800 },
  });
  this.page = await this.context.newPage();
  this.testObject = testData;
  this.apiClient = axios.create();
  this.apiClient.defaults.headers.post = {
    'Content-Type': 'application/json',
  };
})

  // use login and set authorization if needed
  // this.server.defaults.headers.common.Authorization = 'Bearer ' + token;

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${this.startTime?.toISOString().split('.')[0]}trace.zip`,
      });
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await global.browser.close();
});

