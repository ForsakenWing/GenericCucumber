import { chromium, firefox, webkit } from '@playwright/test';
import { after, before, binding, when } from 'cucumber-tsflow';
import { ICustomWorld } from './custom_world';


declare var process: {
  env: {
    BROWSER: string | undefined
  };
};

var { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30 * 1000);

@binding()
class BaseBrowsers {

  @before('front-end')
  async openBrowser(this: ICustomWorld) {
    switch (((browser: string | undefined) => {
      if (typeof browser == 'string') {
        return browser.toLowerCase()
      };
    })(process.env.BROWSER)) {
      case 'webkit':
        this._worldObj.browser = await webkit.launch()
        this._worldObj.context = await this._worldObj.browser.newContext()
        this._worldObj.page = await this._worldObj.context.newPage()
        break
      case 'firefox':
        this._worldObj.browser = await firefox.launch()
        this._worldObj.context = await this._worldObj.browser.newContext()
        this._worldObj.page = await this._worldObj.context.newPage()
        break
      default:
        this._worldObj.browser = await chromium.launch()
        this._worldObj.context = await this._worldObj.browser.newContext()
        this._worldObj.page = await this._worldObj.context.newPage()
        break
    };
  };

  @when('Open page with url {string}', 'front-end')
  async openPage(this: ICustomWorld, url: string) {
    await this._worldObj.page?.goto(url)
  };

  @after('front-end')
  async closeBrowser(this: ICustomWorld): Promise<void> {
    await this._worldObj.context.close()
    await this._worldObj.browser?.close()
  }
};

export = BaseBrowsers;
