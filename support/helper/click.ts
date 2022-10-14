import { Page } from '@playwright/test';
import { binding, when } from 'cucumber-tsflow';
import { DataTable } from '@cucumber/cucumber';
import { ICustomWorld } from '../custom_world';
import { sample } from 'underscore';


@binding()
class BaseClick {

    page!: Page


    @when('Click on locator={string}', 'front-end')
    async clickOnelement(this: ICustomWorld, locator: string) {
        let element = this._worldObj.page?.locator(locator);
        await element?.click();
    }

    @when('Click on {string} from {string}', 'front-end')
    async clickOnElementFromObject(this: ICustomWorld, obj: string, key: string) {
        let selector = this._worldObj.tmp_object[obj][key];
        let element = this._worldObj.page?.locator(selector);
        await element?.click();
    }

    @when('Click on {string}', 'front-end')
    async clickOnElementFromVar(this: ICustomWorld, key: string) {
        let selector = this._worldObj.locators[key];
        let element = this._worldObj.page?.locator(selector);
        await element?.click();
    }

    @when('Click on random( )(value) from {string}', 'front-end')
    async clickOnRandomElement(this: ICustomWorld, obj: string) {
        let element = this._worldObj.page.locator(sample(Object.values(this._worldObj.tmp_object[obj])));
        await element.click();
    }
};

@binding()
class ClickWithOptions extends BaseClick {

    @when('Click on locator={string} with options(:)', 'front-end')
    async clickWithOptions(this: ICustomWorld, locator: string, table: DataTable) {
        let element = this._worldObj.page?.locator(locator);
        await element?.click({ options: table.rowsHash() });
    }

}

@binding()
class BaseSelect {

    @when('Select random option from {string} select', 'front-end')
    async selectRandomOption(this: ICustomWorld, obj: string) {
        const dropdown_selector = this._worldObj.locators[obj]
        const dropdown_options = `${dropdown_selector}/option[not(@hidden) and not(@disabled)]`
        const option = sample(await this._worldObj.page.$$eval(dropdown_options, (els) => {
            return els.map(option => option.textContent)
        }))
        const dropdown_value = await this._worldObj.page.locator(dropdown_options, { hasText: option }).getAttribute('value')
        const dropdown_locator = this._worldObj.page.locator(dropdown_selector)
        await dropdown_locator.selectOption({ value: dropdown_value })
    }
}

export = [ClickWithOptions, ClickWithOptions];