import { Locator, Page } from "@playwright/test";

export class ProductPage {
  /**
   * Defined the page and the locators for the product title
   */
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly addtoCartButton: Locator;
  readonly shoppingcartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = this.page.locator(".product_sort_container");
    this.itemNames = this.page.locator(".inventory_item_name");
    this.itemPrices = this.page.locator(".inventory_item_price");
    this.addtoCartButton = this.page.locator("[data-test^='add-to-cart']");
    this.shoppingcartIcon = this.page.locator(".shopping_cart_link");
  }

  /**
   * This method will sort the products based on the sort option passed as a parameter
   * @param sortOption
   */
  async sortProducts(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * This method will return the names of the products as an array
   * @returns {Promise<string[]>}
   */
  async getProductNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  /**
   * This method will return the prices of the products as an array
   * @returns {Promise<string[]>}
   * */
  async getProductPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  /**
   * This method belongs to click to shoppingcartIcon
   */

  async shoppingcartIconclick() {
    await this.shoppingcartIcon.click();
  }
}
