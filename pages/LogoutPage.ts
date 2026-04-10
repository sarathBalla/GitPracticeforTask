import { Page, Locator } from "@playwright/test";

export class LogoutPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = this.page.getByRole("button", { name: "Open Menu" });
    this.logoutButton = this.page.locator("#logout_sidebar_link");
  }

  /**
   * This method will logout from the SwagLabs application
   */
  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }
}
