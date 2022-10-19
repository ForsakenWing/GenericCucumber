// class BasePage {
//     url: string

//     constructor()
// }

import { When } from "@cucumber/cucumber";
import { evaluateParameters } from "../../src/helpers/evaluateParameters";
import { ICustomWorld } from "../../src/support/custom_world";

When('I open page with url(:)( ){string}', async function goTo(this: ICustomWorld, url: string) {
    url = evaluateParameters(this.config, url);
    const { page } = this;
    await page.goto(url);
})