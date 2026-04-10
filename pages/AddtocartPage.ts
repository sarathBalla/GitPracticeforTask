import { Locator, Page } from "@playwright/test";

export class AddtocartPage {
  /**
   * Defined the page and the locators for the product title
   */
  readonly page: Page;
  readonly checkOut: Locator;
  readonly removeCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOut = this.page.locator("#checkout");
    this.removeCart = this.page.locator("[data-test^='remove']");
  }

  /**
   * This method to click the checkout button
   */
  async clickCheckout() {
    await this.checkOut.click();
  }

  /**
   * This method to click the lastItem Remove button
   */
  async removeLastItem() {
    const count = await this.removeCart.count();
    await this.removeCart.nth(count - 1).click();
  }
}
