import { Page } from '@playwright/test';
import { binding, when } from 'cucumber-tsflow';
import { DataTable } from '@cucumber/cucumber';
import { ICustomWorld } from '../custom_world';


@binding()
class Fill {
    @when("Enter values to {string} from User")
    async fillValuesFromUserToObject (this: ICustomWorld, obj: string) {
        var selectors = Object.entries(this._worldObj.tmp_object[obj])
        var User = this._worldObj.User
        for (const index in selectors) {
            const [field_name, selector] = selectors[index]
            let locator = this._worldObj.page.locator(selector)
            await locator.fill(User[field_name])
        }
    }
} 