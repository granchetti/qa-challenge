# Wikipedia Test Automation with Playwright and Cucumber

[![Playwright](https://img.shields.io/badge/Playwright-1.50.1-blue?logo=playwright)](https://playwright.dev)
[![Cucumber](https://img.shields.io/badge/Cucumber-11.2.0-green?logo=cucumber)](https://cucumber.io)

End-to-end test automation project for Wikipedia's critical workflows using:
- **Playwright**: Modern browser automation
- **Cucumber**: Behavior-Driven Development (BDD) framework
- **TypeScript**: Static typing for robust code

## 🚀 Validated Features
1. User authentication
2. Content menu verification
3. Article edit history validation

## 📋 Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x
- Browsers: Chromium, Firefox, WebKit

## 🧩 Project Structure

```bash
.
├── features/
│   ├── login.feature         # Authentication scenarios
│   ├── content_menu.feature  # Menu validation
│   └── history.feature       # Edit history tests
├── src/
│   ├── environments/         # Environment configuration
│   ├── pages/                # Page Object Models
│   ├── steps/                # Step definitions
│   └── support/              # Global configuration
├── reports/                  # Test reports
└── cucumber.js               # Cucumber configuration
```

## ⚙️ Installation
```bash
# Clone repository
git clone https://github.com/granchetti/qa-challenge.git
cd qa-challenge

# Install dependencies
npm install
```

## ▶️ Local Test Execution

```bash
# Run all tests
npm test

# Run only login tests
npm run test:login

# Run content menu tests
npm run test:content

# Run view history tests
npm run test:history
```
## 🚦 CI/CD (GitHub Actions)

[![GitHub Actions](https://github.com/granchetti/qa-challenge/actions/workflows/tests.yml/badge.svg)](https://github.com/granchetti/qa-challenge/actions/workflows/tests.yml)

The project includes GitHub Actions configuration for on-demand test execution. The workflow is manually triggered through the GitHub Actions interface.

