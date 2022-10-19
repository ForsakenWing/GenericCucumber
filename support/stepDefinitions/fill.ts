import { DataTable, When } from '@cucumber/cucumber';
import { ICustomWorld } from '../../src/support/custom_world';
import { evaluateParameters } from '../../src/helpers/evaluateParameters'
import { isJSON, parseJson } from '../../src/helpers/json';
import { stringify } from 'querystring';
import log from '../../src/logging';


When("I enter values to {string} from {string}",
async function fillValuesFromObjectrToForm(this: ICustomWorld, key: string, value: string) {
    var selectors: any = evaluateParameters(this.testObject, key)
    var obj = evaluateParameters(this.testObject, value)
    if (isJSON(selectors)) {
        selectors = Object.entries(parseJson(selectors))
    };
    if (isJSON(obj)) {
        obj = parseJson(obj)
    }
    for (const [field_name, selector] of selectors) {
        let locator = this.page.locator(selector)
        try {
            await locator.fill(obj[field_name])
        }
        catch(error) {
            log.error(error)
            
        }
    }
});
 