import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/login_page";
import { page } from "../support/hooks";
import fs from "fs";

Given("I am in the Wikipedia Login page", async function () {
  this.loginPage = new LoginPage(page);
  await this.loginPage.navigate();
});

When("I sign in with {string} user", async function (userKey: string) {
  const authFile = `auth/${userKey}.json`;

  this.artcilePage = await this.loginPage.performLogin(userKey);
  if (!fs.existsSync(authFile)) {
    await page.context().storageState({ path: authFile });
  }
});

Then("I should successfully login to Wikipedia", async function () {
  await this.artcilePage.isUserLoggedIn({ isAuthenticated: true });
});
