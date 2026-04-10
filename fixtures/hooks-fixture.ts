/**
 * This file is used to test the hooks functionality of the framework. 
 * It contains a simple hook that logs a message when it is called.
 */

import { test as baseTest } from '../fixtures/common-fixture';

type HooksFixture = {
     gotoLoginPage:any;
     logout:any;
};

export const test = baseTest.extend<HooksFixture>({
    gotoLoginPage:async ({ loginPage }:any, use:any) => {
        await loginPage.gotoSwagLabsPage();
        await use(loginPage);
    },
    logout:async ({ logoutPage }:any, use:any) => {
        await logoutPage.logout();
        await use(logoutPage);
    } 
}); 

export { expect } from '@playwright/test';