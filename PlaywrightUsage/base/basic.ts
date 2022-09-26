"use strict";

import { Locator } from '@playwright/test'
import random  from 'underscore/modules/random.js'

export default class Base {

    async getRandomOption(locator: Locator ) {
        let values = await locator.allTextContents()
        let [index, value] = (ind => [ind + 1, `${ind + 1}: ${values[ind]}`])(random(values.length - 1));
        return [index, value]
    };

}
