import { test, expect } from "../../fixtures/hooks-fixture";
import sortingData from "../../data/ui-data/productsorting-module-data.json";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe(
  "[ProductItem] Verifying the sorting functionality of the products",
  {
    tag: ["@Sorting","@UAT"],
    annotation: {
      type: "Story Link",
      description: "This block contains all the sorting functionality",
    },
  },
  () => {
    test(
      "[ProductItem] verify that the products are sorted based sorted based on Name (A to Z) option selected",
      {
        tag: ["@Sorting","@UAT"],
        annotation: {
          type: "Test Link",
          description:
            "This test verifies that the products are sorted based on Name (A to Z) option selected",
        },
      },
      async ({ gotoLoginPage, commonUtils, productPage }) => {
        // Data Intialization
        const username = commonUtils.decryptData(
          process.env.ENCRYPTED_USERNAME!,
        );
        const password = commonUtils.decryptData(
          process.env.ENCRYPTED_PASSWORD!,
        );
        //Actions
        await gotoLoginPage.loginSwagLabs(username, password);
        await productPage.sortProducts(
          sortingData.sortingOptions["Name (A to Z)"],
        );
        const productNames = await productPage.getProductNames();
        const sortedProductNames = [...productNames].sort();

        // Assertions
        console.log(productNames);
        console.log(sortedProductNames);
        expect(productNames).toEqual(sortedProductNames);
      },
    );
     test(
      "[ProductItem] verify that the products are sorted based sorted based on Name (Z to A) option selected",
      {
        tag: ["@Sorting","@UAT"],
        annotation: {
          type: "Test Link",
          description:
            "This test verifies that the products are sorted based on Name (Z to A) option selected",
        },
      },
      async ({ gotoLoginPage, commonUtils, productPage }) => {
        // Data Intialization
        const username = commonUtils.decryptData(
          process.env.ENCRYPTED_USERNAME!,
        );
        const password = commonUtils.decryptData(
          process.env.ENCRYPTED_PASSWORD!,
        );
        //Actions
        await gotoLoginPage.loginSwagLabs(username, password);
        await productPage.sortProducts(
          sortingData.sortingOptions["Name (Z to A)"],
        );
        const productNames = await productPage.getProductNames();
        const sortedProductNames = [...productNames].sort().reverse();

        // Assertions
        console.log(productNames);
        console.log(sortedProductNames);
        expect(productNames).toEqual(sortedProductNames);
      },
    );
     test(
      "[ProductItem] verify that the products are sorted based sorted based on Price (low to high) option selected",
      {
        tag: ["@Sorting","@UAT"],
        annotation: {
          type: "Test Link",
          description:
            "This test verifies that the products are sorted based on Price (low to high) option selected",
        },
      },
      async ({ gotoLoginPage, commonUtils, productPage }) => {
        // Data Intialization
        const username = commonUtils.decryptData(
          process.env.ENCRYPTED_USERNAME!,
        );
        const password = commonUtils.decryptData(
          process.env.ENCRYPTED_PASSWORD!,
        );
        //Actions
        await gotoLoginPage.loginSwagLabs(username, password);
        await productPage.sortProducts(
          sortingData.sortingOptions["Price (low to high)"],
        );
        const productPrice = await productPage.getProductPrices();
        const sortedproductPrice = [...productPrice].sort((a, b) => a - b);

        // Assertions
        console.log(productPrice);
        console.log(sortedproductPrice);
        expect(productPrice).toEqual(sortedproductPrice);
      },
    );
         test(
      "[ProductItem] verify that the products are sorted based sorted based on Price (high to low) option selected",
      {
        tag: ["@Sorting","@UAT"],
        annotation: {
          type: "Test Link",
          description:
            "This test verifies that the products are sorted based on Price (high to low) option selected",
        },
      },
      async ({ gotoLoginPage, commonUtils, productPage }) => {
        // Data Intialization
        const username = commonUtils.decryptData(
          process.env.ENCRYPTED_USERNAME!,
        );
        const password = commonUtils.decryptData(
          process.env.ENCRYPTED_PASSWORD!,
        );
        //Actions
        await gotoLoginPage.loginSwagLabs(username, password);
        await productPage.sortProducts(
          sortingData.sortingOptions["Price (high to low)"],
        );
        const productPrice = await productPage.getProductPrices();
        const sortedproductPrice = [...productPrice].sort().sort((a, b) => b - a);

        // Assertions
        console.log(productPrice);
        console.log(sortedproductPrice);
        expect(productPrice).toEqual(sortedproductPrice);
      },
    );
  },
);
