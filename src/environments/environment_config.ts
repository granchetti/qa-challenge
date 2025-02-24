import fs from "fs";
import path from "path";

export class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private config: any;
  private environment: string;

  private constructor(environment: string) {
    this.environment = environment ?? "integration";
    this.config = this.loadConfiguration();
  }

  public static getInstance(environment: string = "integration"): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig(environment);
    }
    return EnvironmentConfig.instance;
  }

  private loadConfiguration(): any {
    const filePath = path.resolve(__dirname, `${this.environment}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Configuration file not found: ${this.environment}.json`);
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  }

  public getBaseUrl(): string {
    if (!this.config.baseUrl) {
      throw new Error("Base URL is missing in configuration file.");
    }
    return this.config.baseUrl;
  }

  public getUserCredentials(userKey: string = "default"): {
    username: string;
    password: string;
  } {
    if (!this.config.users || !this.config.users[userKey]) {
      throw new Error(
        `No credentials found for the user "${userKey}" in configuration file`
      );
    }
    return this.config.users[userKey];
  }
}