/**
 * This file is used to test the pom functionality of the framework.
 * It contains the custom fixtures for the Page Object Model (POM) design pattern.
 */

import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { ProductPage } from "../pages/ProductPage";
import { AddtocartPage } from "../pages/AddtocartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type POMFixtureTypes = {
  loginPage: LoginPage;
  logoutPage: LogoutPage;
  productPage: ProductPage;
  addtocartPage:AddtocartPage;
  checkoutPage:CheckoutPage;
};

export const test = baseTest.extend<POMFixtureTypes>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  addtocartPage:async ({ page }, use) => {
    await use(new AddtocartPage(page));
  },
  checkoutPage:async({ page }, use) => {
    await use(new CheckoutPage(page));
  }
});
