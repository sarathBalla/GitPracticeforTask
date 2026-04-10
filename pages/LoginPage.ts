import { Locator, Page } from "@playwright/test";

export class LoginPage {
  /**
   * Defined the page and the locators for the username, password, and login button
   */
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsErrorPopup: Locator;
  readonly productTitle: Locator;

  // Initialize the page and the locators in the constructor and we need to send the page as a parameter to the constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
    this.invalidCredentialsErrorPopup = this.page.locator("xpath=//div[@class='error-message-container error']/h3");
    this.productTitle = this.page.locator(".title");
  }
  /**
   * This method will navigate to the login page
   */
  async gotoSwagLabsPage() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }

  /**
   * To login to the SwagLabs application, we need to fill the username and password and click on the login button
   * @param username
   * @param password
   */
  async loginSwagLabs(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * This method will return the error msg text for invalid credentials
    * @returns {Promise<string | null>}
   */
  async getInvalidCredentialsError(): Promise<string | null> {
    return await this.invalidCredentialsErrorPopup.textContent();
  }

      /**
   * This method will return the product title text after successful login
    * @returns {Promise<string | null>}
   */
  async getProductTitle(){
    return await this.productTitle.textContent();
  }

}
