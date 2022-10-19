// CustomWorld.js
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Page, BrowserContext, Browser } from '@playwright/test';
import { AxiosInstance } from 'axios';

export interface ICustomWorld extends World {
  page?: Page;
  context?: BrowserContext;
  browser?: Browser;
  testObject?: Object;
  apiClient?: AxiosInstance;
  debug: boolean;
  testName?: string;
  startTime?: Date;
}

export class CustomWorld extends World implements ICustomWorld{

  constructor(options: IWorldOptions<any>) {
    super(options);
  }
  debug =  true;
};

setWorldConstructor(CustomWorld);