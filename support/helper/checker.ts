import { Locator, expect } from "@playwright/test";
import { binding, then } from "cucumber-tsflow/dist";
import { ICustomWorld } from "../custom_world";

@binding()
class Asserter {

    @then('Check that locator={string} ha(s)(ve) text={string}', 'front-end')
    async checkThatElementHasText(this: ICustomWorld, selector: string, text: string) {
        let element: Locator | undefined = this.page?.locator(selector);
        await expect(element!).toHaveText(text)
    }

}