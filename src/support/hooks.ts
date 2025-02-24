import { Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

setDefaultTimeout(30000);

let browser: Browser;
export let context: BrowserContext;
export let page: Page;

Before(async function () {
  const isCI = process.env.CI === "true";
  browser = await chromium.launch({ headless: isCI });
  const userKey = this.parameters.userKey || "default";
  const authFilePath = path.resolve(`auth/${userKey}.json`);
  context = await browser.newContext(
    fs.existsSync(authFilePath) ? { storageState: authFilePath } : {}
  );
  page = await context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${scenario.pickle.name}.png`;
    await page.screenshot({ path: screenshotPath });
  }
  await context.close();
  await browser.close();
});
