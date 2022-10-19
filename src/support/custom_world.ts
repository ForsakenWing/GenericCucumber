// CustomWorld.js
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Page, BrowserContext, Browser } from '@playwright/test';
import { AxiosInstance } from 'axios';
import { config as cfg } from '../../config';

export interface ICustomWorld extends World {
  page?: Page;
  context?: BrowserContext;
  browser?: Browser;
  testObject?: {[key: string]: any};
  apiClient?: AxiosInstance;
  debug: boolean;
  testName?: string;
  startTime?: Date;
  config?: { [key: string]: any };
}

export class CustomWorld extends World implements ICustomWorld{

  constructor(options: IWorldOptions<any>) {
    super(options);
  }
  debug =  true;
  config = cfg;
};

setWorldConstructor(CustomWorld);