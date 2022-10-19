import { DataTable, Given, When } from "@cucumber/cucumber";
import { ICustomWorld } from "../../src/support/custom_world";
import { User } from "../models/user";
import * as generic from '../functions/generic';
import test from "node:test";


Given('(v)(V)(alid )(U)(u)ser( with default values)',
async function createDefaultUser(this: ICustomWorld) {
    this.testObject.User = new User();

});

Given('{string}( )(with)(:)',
async function createCustomObject(this: ICustomWorld, obj_name: string, table: DataTable) {
    this.testObject.tmp_object[obj_name] = table.rowsHash();
});

Given('{string} have locators(:)',
async function saveLocators(this: ICustomWorld, obj_name: string, table: DataTable) {
    this.testObject.tmp_object[obj_name] = table.rowsHash();
});

Given('{string} ha(s)(ve) locator(:)( ){string}',
async function saveLocator(this: ICustomWorld, obj_name: string, locator: string) {
    this.testObject.locators[obj_name] = locator;
});

Given('(u)(U)ser( )(with)(:)',
async function createUserObjectFromDT(this: ICustomWorld, table: DataTable) {
    let { firstname, lastname, email, phonenumber, password } = table.rowsHash();
    this.testObject.User = new User(firstname, lastname, email, phonenumber, password);
});

When('I wait for {int} seconds', 
async function (seconds: number) {
    return generic.iWaitSeconds(seconds);
});

When('I wait for {int} minutes', 
async function (minutes: number) {
    return generic.iWaitMinutes(minutes);
});

When('I wait for {int} milliseconds', 
async function (milliseconds: number) {
    return generic.iWaitMilliseconds(milliseconds);
});

When('I store {string} as {string}', 
async function (this: ICustomWorld, value: string, key: string) {
    return generic.iStoreAs(this, value, key);
});

When('I store table as {string}',
    async function (this: ICustomWorld, key: string, table: DataTable) {
    let collection = {testObject: {}};
    for (const [key, value] of Object.entries(table.rowsHash())) {
        generic.iStoreAs(collection as any, value, key)
    }
    const { testObject } = collection;
    this.testObject[key] = testObject;
});

When('I calculate {string} and store it in {string}', 
async function (this: ICustomWorld, evaluationStatement: string, key: string) {
    return generic.iCalculateAndStoreAs(this, evaluationStatement, key);
});

When('I import fixture file {string} as {string}', 
async function (this: ICustomWorld, filePath: string, key: string) {
    generic.importFixtureFile(this, filePath, key);
});