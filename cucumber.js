module.exports = {
  default: {
    parallel: 1,
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],
    require: [
      "src/support/hooks.ts",
      "src/steps/**/*.ts"
    ],
    requireModule: [
      "ts-node/register",
      "dotenv/config"
    ],
    worldParameters: {
      baseURL: ""
    }
  }
};
