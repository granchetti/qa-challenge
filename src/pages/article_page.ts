import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base_page";

export class ArticlePage extends BasePage {
  private readonly contentMenuButton: Locator = this.page.locator(
    "#vector-page-titlebar-toc-checkbox"
  );
  private readonly usernameElement: Locator =
    this.page.locator("#pt-userpage-2");

  private readonly historyButton: Locator = this.page.locator("#ca-history");
  private readonly revisionHistoryTitle = this.page.getByRole("heading", {
    name: "Revision history",
  });
  private readonly link500: Locator = this.page
    .getByRole("link", { name: "500" })
    .first();

  async navigate({ articleName }: { articleName: string }): Promise<this> {
    await this.navigateTo(`/wiki/${articleName}`);
    return this;
  }

  async isUserLoggedIn({
    isAuthenticated = false,
  }: { isAuthenticated?: boolean } = {}): Promise<void> {
    if (isAuthenticated!) {
      await expect(this.usernameElement).toBeVisible();
    } else {
      await expect(this.usernameElement).not.toBeVisible();
    }
  }

  async clickContentMenu(): Promise<void> {
    await this.contentMenuButton.click();
  }

  async checkContentMenuWorkProperly({
    section,
  }: {
    section: string;
  }): Promise<void> {
    const { sectionName, headingLevel } = this.parseSection(section);
    await this.clickSection(sectionName);
    await this.verifySectionVisibility(sectionName, headingLevel);
  }

  private parseSection(section: string): {
    sectionName: string;
    headingLevel: number;
  } {
    const [mainSection, subSection] = section.split(".");
    return subSection
      ? { sectionName: subSection, headingLevel: 3 }
      : { sectionName: mainSection, headingLevel: 2 };
  }

  private async clickSection(sectionName: string): Promise<void> {
    await this.page.locator(`#toc-${sectionName}`).click();
  }

  private async verifySectionVisibility(
    sectionName: string,
    headingLevel: number
  ): Promise<void> {
    await expect(
      this.page.locator(`h${headingLevel}#${sectionName}`)
    ).toBeVisible();
  }

  async clickViewHistoryButton(): Promise<void> {
    await expect(this.historyButton).toBeVisible();
    await this.historyButton.click();
    await expect(this.revisionHistoryTitle).toBeVisible();
  }

  async verifyRedirection(relativeUrl: string): Promise<void> {
    const expectedUrl = `${this.baseUrl}${relativeUrl}`;
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 15000 });
  }

  async clickLink500(): Promise<void> {
    await expect(this.link500).toBeVisible();
    await this.link500.click();
    await expect(this.page).toHaveURL(/limit=500/);
  }

  async verifyEditInfo(editTime: string, relatedInfo: string): Promise<void> {
    await this.clickLink500();
    const dateElement = this.page.getByText(editTime, { exact: true });
    await expect(dateElement).toBeVisible();
    const historyListItem = dateElement
      .locator("..")
      .locator("..")
      .locator("..");
    const text = await historyListItem.innerText();
    expect(text).toContain(relatedInfo);
  }

  async verifyEditFromLastMonth(): Promise<void> {
    const lastMonthFormatted = this.getlastMonthDate();
    const lastMonthElements = await this.page
      .locator("#pagehistory")
      .filter({ hasText: lastMonthFormatted })
      .count();
    expect(lastMonthElements).toBeGreaterThan(0);
  }

  private getlastMonthDate(): string {
    const now = new Date();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return lastMonthDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
}
