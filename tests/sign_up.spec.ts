"use strict";

import { test } from '@playwright/test';
import { User } from '../support/models/user';
import { SignUpPage } from '../pages/sign_up.page';

export const user = new User();
test('TC#1 User has opportunity to create account with valid input data', async ({ page }) => {
    const signUpPage = new SignUpPage(page, user)
    await signUpPage.goto();
    await signUpPage.hasLetsShopTitle();
    await signUpPage.clickOnRegisterButton(); // Go to sign up page
    await signUpPage.hasRegisterInURI(); // Check that we are on register page
    await signUpPage.createUser();
    await signUpPage.checkThatAccountWasCreatedSuccessfuly();
}); 