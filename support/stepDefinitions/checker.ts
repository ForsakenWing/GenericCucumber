import { Then } from "@cucumber/cucumber";
import { Locator, expect } from "@playwright/test";
import { ICustomWorld } from "../../src/support/custom_world";


Then('Check that locator={string} ha(s)(ve) text={string}',
async function checkThatElementHasText(this: ICustomWorld, selector: string, text: string) {
    let element: Locator | undefined = this.page?.locator(selector);
    await expect(element!).toHaveText(text)
})