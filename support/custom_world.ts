// CustomWorld.js
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, webkit, firefox, Page, BrowserContext, Browser } from '@playwright/test';


/*
 * The only method to be inherited from the default world is
 * the constructor, so if you want to handle the options in
 * an entirely customized manner you don't have to extend from
 * World as seen here.
 */

export interface ICustomWorld extends World {
  table: Object;
  _worldObj: any;
  context?: BrowserContext;
  page?: Page;
  browser?: Browser
}

export class CustomWorld extends World {
    
    page?: Page;
    context?: BrowserContext;
    browser?: Browser;
    tmp_object: Object;
    locators: Object;
    User: Object;

  /*
   * A constructor is only needed if you have custom actions
   * to take after the Cucumber parses the options or you
   * want to override how the options are parsed.
   * 
   * The options are an object with three members
   * {
   *   log: Cucumber log function,
   *   attach: Cucumber attachment function,
   *   params: World Parameters object
   * }
   */
  constructor(options: IWorldOptions<any>) {
    /*
     * If you don't call the super method you will need
     * to bind the options here as you see fit.
     */
    super(options);
    this.tmp_object = {}
    this.locators = {}
    // Custom actions go here.;

  /*
   * Constructors cannot be asynchronous! To work around this we'll
   * use an init method with the Before hook
   */
  }
};

setWorldConstructor(CustomWorld);