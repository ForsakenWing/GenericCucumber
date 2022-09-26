"use strict";

import { test, expect } from '@playwright/test';
import Base from '../base/basic';
import Register from '../base/sign_up';

test('Register button is available and user have opportunity to sign up', async ({ page }) => {
    const [register, base] = [new Register(), new Base()]
    // Go to home-page
    await page.goto('./');
    
    // Check that title Lets shop is present
    await expect(page).toHaveTitle(/^Let's Shop$/);
    
    // Go to sign up form   
    await page.click(register.locators.MoveToSignUpForm);

    // Check that we are on register page
    await expect(page).toHaveURL(/register$/);
    
    // Filling firstname and checking that it was filled
    await page.locator(register.locators.FirstName).fill(register.firstname);
    await expect(page.locator(register.locators.FirstName)).toHaveValue(register.firstname);
    
    // Filling lastname and checking that it was filled
    await page.locator(register.locators.LastName).fill(register.lastname);
    await expect(page.locator(register.locators.LastName)).toHaveValue(register.lastname);
    
    // Filling email and checking that it was filled
    await page.locator(register.locators.Email).fill(register.email);
    await expect(page.locator(register.locators.Email)).toHaveValue(register.email);
    
    // Filling phone number and checking that it was filled
    await page.locator(register.locators.PhoneNumber).fill(register.phonenumber);
    await expect(page.locator(register.locators.PhoneNumber)).toHaveValue(register.phonenumber);
    
    // Selecting occupation option and checking that it was selected
    const occupation_options_locator = await page.locator(register.locators.Occupation.options)
    const [occupation_option_index, value] = await base.getRandomOption(occupation_options_locator); // Use variable 'value' to retrieve occupation value
    await page.locator(register.locators.Occupation.locator).selectOption({index: occupation_option_index});
    await expect(page.locator(register.locators.Occupation.locator)).toHaveValue(value);

    
    // Selecting gender and checking that it was selected
    await page.locator(register.locators.Gender).check();
    await expect(page.locator(register.locators.Gender)).toHaveValue(register.gender);

    
    // Filling password and checking that value was filled
    await page.locator(register.locators.Password).fill(register.password);
    await expect(page.locator(register.locators.Password)).toHaveValue(register.password);
    
    // Filling confirmation password and checking that value was filled
    await page.locator(register.locators.ConfirmPassword).fill(register.password);
    await expect(page.locator(register.locators.ConfirmPassword)).toHaveValue(register.password);

    // Age confirming and checking that checkbox was filled
    await page.locator(register.locators.AgeConfirmation).check();
    await expect(page.locator(register.locators.AgeConfirmation)).toBeChecked();
    
    // Registration confirmation
    await page.locator(register.locators.RegisterConfirmation).click();
    
    // Checking that account was created successfuly
    await expect(page.locator(register.locators.SuccessfulRegistration)).toHaveText('Account Created Successfully');
});