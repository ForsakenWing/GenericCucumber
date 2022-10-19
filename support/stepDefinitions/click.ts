import { Page } from '@playwright/test';
import { binding, when } from 'cucumber-tsflow';
import { DataTable } from '@cucumber/cucumber';
import { ICustomWorld } from '../../src/support/custom_world';
import { sample } from 'underscore';
import { When } from '@cucumber/cucumber';
import { evaluateParameters } from '../../src/helpers/evaluateParameters';
import { isJSON, parseJson } from '../../src/helpers/json';




When('Click on locator={string}',
async function clickOnElement(this: ICustomWorld, locator: string) {
    let element = this.page?.locator(locator);
    await element?.click();
});

When('Click on {string} from {string}', 
async function clickOnElementFromObject(this: ICustomWorld, obj: string, key: string) {
    let selector = this.testObject?.obj[key];
    let element = this.page?.locator(selector);
    await element?.click();
});

When('Click on {string}', 
async function clickOnElementFromVar(this: ICustomWorld, key: string) {
    let selector = evaluateParameters(this.testObject, key);
    let element = this.page?.locator(selector);
    await element?.click();
});

When('Click on random( )(value) from {string}',
 async function clickOnRandomElement(this: ICustomWorld, obj: string) {
    let elements = evaluateParameters(this.testObject, obj)
    if (isJSON(elements)) {
        elements = parseJson(elements)
    }
    let element = this.page?.locator(sample(Object.values(elements)));
    await element?.click();
});


When('Click on locator={string} with options(:)', 
async function clickWithOptions(this: ICustomWorld, locator: string, table: DataTable) {
    let element = this.page?.locator(locator);
    await element?.click({ options: table.rowsHash() } as unknown);
});



When('Select random option from {string} select',
async function selectRandomOption(this: ICustomWorld, obj: string) {
    const dropdown_selector = evaluateParameters(this.testObject, obj)
    const dropdown_options = `${dropdown_selector}/option[not(@hidden) and not(@disabled)]`
    const option = sample(await this.page.$$eval(dropdown_options, (els) => {
        return els.map(option => option.textContent)
    }))
    const dropdown_value = await this.page.locator(dropdown_options, { hasText: option }).getAttribute('value')
    const dropdown_locator = this.page.locator(dropdown_selector)
    await dropdown_locator.selectOption({ value: dropdown_value })
});