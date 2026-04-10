import { test, expect } from "../../fixtures/hooks-fixture";
import loginModuleData from "../../data/ui-data/login-module-data.json";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test("[Login] verify that the user can successfully login to the login page",
    {
    tag: ["@UI", "@UAT"],
    annotation: {
      type: "Positive Test Case",
      description:
        "This test case verifies that the user can successfully login to the login page",
    },
},async ({ gotoLoginPage,commonUtils }) => {
    // Data Intialization
    const username = commonUtils.decryptData(
      process.env.ENCRYPTED_USERNAME!,
    );
    const password = commonUtils.decryptData(
      process.env.ENCRYPTED_PASSWORD!,
    );
    //Actions
    await gotoLoginPage.loginSwagLabs(username, password);
    //Assertions
    await expect(gotoLoginPage.page).toHaveURL(`${process.env.BASE_URL}inventory.html`);
    await expect(gotoLoginPage.productTitle).toHaveText(loginModuleData.positiveLoginData.Title_text);

});


test.describe(
  "[Login] Negative Test Cases",
  {
    tag: ["@InvalidLogin", "@UAT"],
    annotation: {
      type: "Story Link",
      description:
        "This block contains all the negative test cases related to login functionality",
    },
  },
  () => {
    test(
      "[Login] verify that the user cannot login with invalid username",
      {
        tag: ["@UI", "@UAT"],
        annotation: {
          type: "Negative Test Case",
          description:
            "This test case verifies that the user cannot login with invalid username",
        },
      },
      async ({ gotoLoginPage, commonUtils }) => {

        // Data Intialization
        const password = commonUtils.decryptData(
          process.env.ENCRYPTED_PASSWORD!,
        );
        //Actions

        await gotoLoginPage.loginSwagLabs(loginModuleData.negativeLoginData.wrongUsername, password);

        //Assertions
        await expect(gotoLoginPage.invalidCredentialsErrorPopup).toHaveText(
          loginModuleData.negativeLoginData.InvalidCredentials_text,
        );
        await expect(gotoLoginPage.usernameInput).toBeVisible();
      },
    );

    test(
      "[Login] verify that the user cannot login with invalid password",
      {
        tag: ["@UI", "@UAT"],
        annotation: {
          type: "Negative Test Case",
          description:
            "This test case verifies that the user cannot login with invalid password",
        },
      },
      async ({ gotoLoginPage, commonUtils }) => {
        // Data Intialization
        const username = commonUtils.decryptData(
          process.env.ENCRYPTED_USERNAME!,
        );
        // Actions
        await gotoLoginPage.loginSwagLabs(username, loginModuleData.negativeLoginData.wrongPassword);

        // Assertions
        await expect(gotoLoginPage.invalidCredentialsErrorPopup).toHaveText(
          loginModuleData.negativeLoginData.InvalidCredentials_text,
        );
        await expect(gotoLoginPage.usernameInput).toBeVisible();
      },
    );

    test(
      "[Login] verify that the user cannot login with invalid username and password",
      {
        tag: ["@UI", "@UAT"],
        annotation: {
          type: "Negative Test Case",
          description:
            "This test case verifies that the user cannot login with invalid username",
        },
      },
      async ({ gotoLoginPage, commonUtils }) => {
        // Actions
        await gotoLoginPage.loginSwagLabs(
          loginModuleData.negativeLoginData.wrongUsername,
          loginModuleData.negativeLoginData.wrongPassword,
        );

        // Assertions
        await expect(gotoLoginPage.invalidCredentialsErrorPopup).toHaveText(
          loginModuleData.negativeLoginData.InvalidCredentials_text,
        );

        await expect(gotoLoginPage.usernameInput).toBeVisible();
      },
    );
  },
);
