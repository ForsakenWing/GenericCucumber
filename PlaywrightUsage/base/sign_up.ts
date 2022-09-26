"use strict";

import { faker } from '@faker-js/faker';
import Base from '../base/basic'
import sample from 'underscore/modules/sample.js'


export default class Register extends Base {
    constructor(
        public firstname = faker.name.firstName(), 
        public lastname = faker.name.lastName(), 
        public email = faker.internet.email(firstname, lastname), 
        public phonenumber = faker.phone.number('#'.repeat(10)), 
        public occupation?: string, 
        public gender: | keyof {'Male', 'Female'} = sample(['Male', 'Female']), 
        public password = faker.internet.password(undefined, undefined, undefined, "S@1s"),
        ) {
        super();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.occupation = occupation;
        this.gender = gender;
        this.password = password; 
    }

    locators = {
        FirstName: "//input[@id='firstName']",
        LastName: "//input[@id='lastName']",
        Email: "//input[@id='userEmail']",
        PhoneNumber: "//input[@id='userMobile']",
        Occupation: (() => {
            let option_locator = "//select[@formcontrolname='occupation']";
            return {
                locator: option_locator,
                options: `${option_locator}/option[not(@disabled)]`,
            };
        })(),
        Gender: `//input[@formcontrolname='gender'][@value='${this.gender}']`,
        Password: "//input[@id='userPassword']",
        ConfirmPassword: "//input[@id='confirmPassword']",
        AgeConfirmation: "//input[@formcontrolname='required']",
        RegisterConfirmation: "//input[@id='login']",
        SuccessfulRegistration: "//h1[@class='headcolor']",
        MoveToSignUpForm: "//a[contains(@class, 'btn1')]",
    };
    
};