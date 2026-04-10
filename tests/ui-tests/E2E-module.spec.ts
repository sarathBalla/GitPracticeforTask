import { test, expect } from "../../fixtures/hooks-fixture";
import sortingData from "../../data/ui-data/productsorting-module-data.json";
import checkoutData from "../../data/ui-data/checkout-module-data.json";
import { LoginPage } from "../../pages/LoginPage";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test(
  "[E2E] verify that the products are sorted based sorted based on Price (low to high) and checkout the details",
  {
    tag: "@E2E",
    annotation: {
      type: "Test Link",
      description:
        "This test verifies that the products are sorted based on Price (low to high) and checkout the details",
    },
  },
  async ({
    gotoLoginPage,
    commonUtils,
    productPage,
    addtocartPage,
    checkoutPage,
    logoutPage,
    loginPage
  }) => {
    // Data Intialization
    const username = commonUtils.decryptData(process.env.ENCRYPTED_USERNAME!);
    const password = commonUtils.decryptData(process.env.ENCRYPTED_PASSWORD!);
    await gotoLoginPage.loginSwagLabs(username, password);
    //Actions
    await test.step("Sorting the Products and add/remove from Cart", async () => {
      await productPage.sortProducts(
        sortingData.sortingOptions["Price (low to high)"],
      );
      const productPrice = await productPage.getProductPrices();
      const sortedproductPrice = [...productPrice].sort((a, b) => a - b);

      // Assertions
      console.log(productPrice);
      console.log(sortedproductPrice);
      expect(productPrice).toEqual(sortedproductPrice);
      const addToCartButtons = productPage.addtoCartButton;
      for (let i = 0; i < 3; i++) {
        await addToCartButtons.nth(i).click();
      }
      await productPage.shoppingcartIconclick();
      await addtocartPage.removeLastItem();
      await addtocartPage.clickCheckout();
    });

    await test.step("Adding Details in checkout page", async () => {
      await checkoutPage.fillinthecheckoutDetails();
      await checkoutPage.clickthecountinue();
      await checkoutPage.clickthefinish();
      await expect(checkoutPage.sucessmsg).toHaveText(checkoutData.successmsg);
    });

    await logoutPage.logout();
    await expect(loginPage.usernameInput).toBeChecked();
  },
);
