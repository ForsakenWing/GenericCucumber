"use strict";

import { Page, expect, Locator } from '@playwright/test'
import { User } from '../support/models/user';


export class SignUpPage {
    readonly page: Page;
    readonly _user: User;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phoneNumber: Locator;
    readonly occupationDropDown: Locator;
    readonly occupationOption: Locator;
    readonly gender: Locator;
    readonly password: Locator;
    readonly passwordConfirmation: Locator;
    readonly ageConfirmation: Locator;
    readonly registerConfirmation: Locator;
    readonly successfulRegistration: Locator;
    readonly registerButton: Locator;

    constructor(page: Page, user: User) {
        this._user = user;
        this.page = page;
        this.firstName = page.locator("//input[@id='firstName']");
        this.lastName = page.locator("//input[@id='lastName']");
        this.email = page.locator("//input[@id='userEmail']");
        this.phoneNumber = page.locator("//input[@id='userMobile']");
        this.occupationDropDown = page.locator("//select[@formcontrolname='occupation']")
        this.occupationOption = page.locator("//select[@formcontrolname='occupation']/option", { hasText: user.occupation });
        this.gender = page.locator(`//input[@formcontrolname='gender' and @value='${this._user.gender}']`);
        this.password = page.locator("//input[@id='userPassword']");
        this.passwordConfirmation = page.locator("//input[@id='confirmPassword']");
        this.ageConfirmation = page.locator("//input[@formcontrolname='required']");
        this.registerConfirmation = page.locator("//input[@id='login']");
        this.successfulRegistration = page.locator("//h1[@class='headcolor']");
        this.registerButton = page.locator("//a[contains(@class, 'btn1')]");
    };

    async goto(url?: string) {
        if (url === undefined) {
            url = './'
        };

        await this.page.goto(url);
    }

    async hasLetsShopTitle(title?: string | RegExp) {
        if (title === undefined) {
            title = /^Let's Shop$/
        };
        await expect(this.page).toHaveTitle(title)
    };

    async clickOnRegisterButton() {
        await this.registerButton.click()
    };

    async hasRegisterInURI(url?: string | RegExp) {
        if (url === undefined) {
            url = /register$/
        };
        await expect(this.page).toHaveURL(url)
    };

    async createUser() {
        await this.fillSignUpForm();
        await this.chooseGender();
        await this.chooseOccupation();
        await this.confirmAge();
        await this.checkThatSignUpFormIsFilled();
        await this.clickOnRegisterConfirmationButton();
    };

    async clickOnRegisterConfirmationButton() {
        await this.registerConfirmation.click();
    };
    async checkThatAccountWasCreatedSuccessfuly(text?: string) {
        if (text === undefined) {
            text = 'Account Created Successfully'
        };
        await expect(this.successfulRegistration).toHaveText(text);
    };
    async checkThatSignUpFormIsFilled() {
        await expect(this.firstName).toHaveValue(this._user.firstname);
        await expect(this.lastName).toHaveValue(this._user.lastname);
        await expect(this.email).toHaveValue(this._user.email);
        await expect(this.phoneNumber).toHaveValue(this._user.phonenumber);
        await expect(this.password).toHaveValue(this._user.password);
        await expect(this.passwordConfirmation).toHaveValue(this._user.password);
    };
    async chooseGender() {
        await this.gender.check();
    };
    async confirmAge() {
        await this.ageConfirmation.check();
    };
    async chooseOccupation() {
        let occupation_value = await this.occupationOption.getAttribute('value')
        await this.occupationDropDown.selectOption(occupation_value);
    };
    async checkThatOccupationIsChosen() {
        await expect(this.occupationDropDown).toHaveValue(this._user.occupation);
    };
    async checkThatAgeIsChecked() {
        await expect(this.ageConfirmation).toBeChecked();
    };
    async checkThatGenderIsChecked() {
        await expect(this.gender).toBeChecked();
    };
    async fillSignUpForm() {
        await this.firstName.fill(this._user.firstname);
        await this.lastName.fill(this._user.lastname);
        await this.email.fill(this._user.email);
        await this.phoneNumber.fill(this._user.phonenumber);
        await this.password.fill(this._user.password);
        await this.passwordConfirmation.fill(this._user.password);
    };
};