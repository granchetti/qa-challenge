import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../support/hooks";
import { ArticlePage } from "../pages/article_page";

Given("I navigate to {string} page", async function (wikiName: string) {
 this.articlePage = new ArticlePage(page);
  await this.articlePage.navigate({ articleName: wikiName });
  await this.articlePage.isUserLoggedIn({ isAuthenticated: true });
});

When("I check the Content Menu", async function () {
  await this.articlePage.clickContentMenu();
});

Then("I should be able to click on {string} option", async function (section: string) {
    await this.articlePage.checkContentMenuWorkProperly({ section });
  }
);
