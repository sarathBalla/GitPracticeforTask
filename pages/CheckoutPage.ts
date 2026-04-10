import { Locator, Page } from "@playwright/test";
import Checkoutdata from "../data/ui-data/checkout-module-data.json";

export class CheckoutPage {
  /**
   * Defined the page and the locators for the product title
   */
  readonly page: Page;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly postalcode: Locator;
  readonly continuebutton: Locator;
  readonly finishbutton: Locator;
  readonly sucessmsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstname = this.page.locator("#first-name");
    this.lastname = this.page.locator("#last-name");
    this.postalcode = this.page.locator("#postal-code");
    this.continuebutton = this.page.locator("#continue");
    this.finishbutton = this.page.locator("#finish");
    this.sucessmsg = this.page.locator(".complete-header");
  }
  /**
   * This method belongs to filling the checkout details
   */
  async fillinthecheckoutDetails() {
    await this.firstname.fill(Checkoutdata.positivecheckout.firstname);
    await this.lastname.fill(Checkoutdata.positivecheckout.lastname);
    await this.postalcode.fill(Checkoutdata.positivecheckout.postalcode);
  }

  /**
   * This method belongs to click on continue button on checkout page
   */

  async clickthecountinue() {
    await this.continuebutton.click();
  }

  /**
   * This method belongs to click on finish button on checkout page
   */

  async clickthefinish() {
    await this.finishbutton.click();
  }

  async getsuccessmsg() {
    return await this.sucessmsg.textContent();
  }
}
