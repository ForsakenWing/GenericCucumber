import { DataTable } from "@cucumber/cucumber";
import { binding, given } from "cucumber-tsflow/dist";
import { ICustomWorld } from "../custom_world";
import { User } from "../models/user";

@binding()
class Storage {

    @given('(v)(V)(alid )(U)(u)ser( with default values)', 'front-end')
    async createDefaultUser(this: ICustomWorld) {
        this._worldObj.User = new User();

    }
    @given('{string}( )(with)(:)', 'front-end')
    async createCustomObject(this: ICustomWorld, obj_name: string, table: DataTable) {
        this._worldObj.tmp_object[obj_name] = table.rowsHash();
    }

    @given('{string} have locators(:)', 'front-end')
    async saveLocators(this: ICustomWorld, obj_name: string, table: DataTable) {
        this._worldObj.tmp_object[obj_name] = table.rowsHash();
    }

    @given('{string} ha(s)(ve) locator(:)( ){string}', 'front-end')
    async saveLocator(this: ICustomWorld, obj_name: string, locator: string) {
        this._worldObj.locators[obj_name] = locator;
    }

    @given('(u)(U)ser( )(with)(:)', 'front-end')
    async createUserObjectFromDT(this: ICustomWorld, table: DataTable) {
        let { firstname, lastname, email, phonenumber, occupation, gender, password } = table.rowsHash();
        this._worldObj.User = new User(firstname, lastname, email, phonenumber, occupation, gender, password);
    }
}

export = Storage;