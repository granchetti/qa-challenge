import { Page } from "@playwright/test";
import { EnvironmentConfig } from "../environments/environment_config";

export class BasePage {
  protected page: Page;
  protected config = EnvironmentConfig.getInstance();
  protected baseUrl: string;
  protected users!: { username: string; password: string };
  protected pageTimeout: number = 15000;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = this.config.getBaseUrl();
    this.users = this.config.getUserCredentials();
    this.page.setDefaultTimeout(this.pageTimeout);
  }

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`, { timeout: 30000 });
  }
}
