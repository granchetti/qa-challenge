import { When, Then } from "@cucumber/cucumber";

When("I select View history", async function () {
  await this.articlePage.clickViewHistoryButton();
});

Then("I should be redirected to {string}", async function (link: string) {
  await this.articlePage.verifyRedirection(link);
});

Then(
  "I should be able to see that the wiki was edited on {string} with {string} info",
  async function (editTime: string, relatedInfo: string) {
    await this.articlePage.verifyEditInfo(editTime, relatedInfo);
  }
);

Then("I should see that the wiki was edited on last month", async function () {
  await this.articlePage.verifyEditFromLastMonth();
});
