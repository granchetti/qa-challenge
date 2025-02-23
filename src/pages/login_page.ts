import { Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { ArticlePage } from "./article_page";

export class LoginPage extends BasePage {
  private readonly usernameField: Locator = this.page.locator("#wpName1");
  private readonly passwordField: Locator = this.page.locator("#wpPassword1");
  private readonly loginButton: Locator = this.page.locator("#wpLoginAttempt");
  private readonly loginTitle: Locator = this.page.locator("#firstHeading");
  private loginUrl = "/wiki/Special:UserLogin";

  async navigate(): Promise<this> {
    await this.navigateTo(this.loginUrl);
    return this;
  }

  async performLogin(userKey: string): Promise<ArticlePage> {
    const { username, password } = this.config.getUserCredentials(userKey);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    return new ArticlePage(this.page);
  }
}
