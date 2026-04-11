# Playwright Test Automation Framework

A robust, scalable test automation framework built with Playwright and TypeScript, implementing the Page Object Model (POM) design pattern with custom fixtures and data-driven testing.

## 🚀 Features

- ✅ **Page Object Model (POM)** - Clean separation of test logic and page elements
- ✅ **Custom Fixtures** - Reusable test setup with fixture composition
- ✅ **Data-Driven Testing** - External JSON test data management
- ✅ **API & UI Testing** - Comprehensive test coverage
- ✅ **Secure Credentials** - Encrypted credentials using crypto-js
- ✅ **Multi-Browser Support** - Chromium, Firefox, and WebKit
- ✅ **CI/CD Ready** - Azure Pipelines integration
- ✅ **Error Handling** - Robust error handling in utilities
- ✅ **Negative Testing** - Comprehensive negative API scenarios

## 📁 Project Structure

```
GitPracticeforTask-main/
├── data/
│   ├── api-data/              # API test data (JSON)
│   └── ui-data/               # UI test data (JSON)
├── env-files/
│   └── .env.demo              # Environment variables
├── fixtures/
│   ├── common-fixture.ts      # Common utilities fixture
│   ├── hooks-fixture.ts       # Test hooks fixture
│   └── pom-fixture.ts         # Page Object fixtures
├── pages/
│   ├── LoginPage.ts           # Login page objects
│   ├── ProductPage.ts         # Product page objects
│   ├── AddtocartPage.ts       # Cart page objects
│   ├── CheckoutPage.ts        # Checkout page objects
│   └── LogoutPage.ts          # Logout page objects
├── tests/
│   ├── api-tests/             # API test specifications
│   │   └── restful-booker-api-module.spec.ts
│   └── ui-tests/              # UI test specifications
│       ├── login-module.spec.ts
│       ├── product-module.spec.ts
│       └── E2E-module.spec.ts
├── utils/
│   ├── CommonUtils.ts         # Common utility functions
│   └── CommonapiUtils.ts      # API utility functions
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies
└── azure-pipelines.yml        # CI/CD pipeline

```

## 🛠️ Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GitPracticeforTask-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure environment variables**
   - Copy `.env.demo` in `env-files/` directory
   - Update credentials (encrypted using crypto-js)

## 🏃 Running Tests

### UI Tests

```bash
# Run UI tests in Chromium (headed mode)
npm run test-dev-chrome

# Run UI tests in Chromium (headless for CI/CD)
npm run test-pipeline-chrome
```

### API Tests

```bash
# Run API tests
npm run test-api
```

### Run Specific Tests

```bash
# Run tests by tag
npx playwright test --grep @UAT

# Run specific test file
npx playwright test tests/ui-tests/login-module.spec.ts

# Run in specific browser
npx playwright test --project=firefox

# Debug mode
npx playwright test --debug
```

## 📊 Test Reports

After test execution, reports are generated:

- **HTML Report**: `playwright-report/index.html`
- **JUnit Report**: `test-results/junit-report.xml`

View HTML report:
```bash
npx playwright show-report
```

## 🔐 Security Features

### Credential Encryption

The framework uses AES encryption for sensitive data:

```typescript
import CommonUtils from './utils/CommonUtils';

const utils = new CommonUtils();
const encrypted = utils.encryptData('password123');
const decrypted = utils.decryptData(encrypted);
```

### Environment Variables

- `BASE_URL` - Application base URL
- `UI_SECRET_KEY` - Secret key for UI credential decryption
- `ENCRYPTED_USERNAME` - Encrypted username
- `ENCRYPTED_PASSWORD` - Encrypted password
- `API_BASE_URL` - API base URL
- `SECRET_KEY` - Secret key for API credential decryption
- `ENCRYPTED_APIUSERNAME` - Encrypted API username
- `ENCRYPTED_APIPASSWORD` - Encrypted API password

## 🎯 Test Tags

### UI Tests
- `@UI` - UI test cases
- `@UAT` - User acceptance tests
- `@InvalidLogin` - Negative login scenarios
- `@Sorting` - Product sorting tests
- `@E2E` - End-to-end tests

### API Tests
- `@API` - API test cases
- `@GET`, `@POST`, `@PUT`, `@PATCH`, `@DELETE` - HTTP methods
- `@Restful-Booker` - Restful Booker API tests
- `@NegativeAPI` - Negative API scenarios
- `@403`, `@404`, `@Validation` - Error handling tests

## 🏗️ Framework Architecture

### Fixture Hierarchy

```
common-fixture (base)
    ├── CommonUtils (encryption/decryption)
    └── CommonapiUtils (API utilities)
        ↓
pom-fixture (extends common-fixture)
    ├── LoginPage
    ├── ProductPage
    ├── AddtocartPage
    ├── CheckoutPage
    └── LogoutPage
        ↓
hooks-fixture (extends pom-fixture)
    ├── gotoLoginPage (auto-navigate)
    └── logout (cleanup)
```

### Page Object Model

Each page class encapsulates:
- **Locators** - Element selectors
- **Actions** - Page interactions
- **Assertions** - Page-specific validations

Example:
```typescript
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
  }
  
  async loginSwagLabs(username: string, password: string) {
    await this.usernameInput.fill(username);
    // ... more actions
  }
}
```

## 🔄 CI/CD Integration

### Azure Pipelines

The framework includes Azure Pipeline configuration:

- **Scheduled Runs**: Daily at 21:10 UTC
- **Node.js Version**: 25.x
- **OS**: Ubuntu Latest
- **Browser Installation**: Automated
- **Reports**: JUnit XML for integration

Trigger pipeline:
```yaml
schedules:
  - cron: "10 21 * * *"
    displayName: "Daily Automatic Pipeline Run"
    branches:
      include:
        - main
```

## 📝 Writing Tests

### UI Test Example

```typescript
import { test, expect } from "../../fixtures/hooks-fixture";

test("[Login] verify successful login", {
  tag: ["@UI", "@UAT"],
  annotation: {
    type: "Test Case",
    description: "Verify user can login successfully"
  }
}, async ({ gotoLoginPage, commonUtils }) => {
  const username = commonUtils.decryptData(process.env.ENCRYPTED_USERNAME!);
  const password = commonUtils.decryptData(process.env.ENCRYPTED_PASSWORD!);
  
  await gotoLoginPage.loginSwagLabs(username, password);
  
  await expect(gotoLoginPage.page).toHaveURL(/inventory.html/);
});
```

### API Test Example

```typescript
test("[API] verify GET request", {
  tag: ['@API', '@GET'],
}, async ({ request }) => {
  const response = await request.get('/booking');
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).not.toBeNull();
});
```

## 🐛 Error Handling

All utility methods include comprehensive error handling:

```typescript
public encryptData(data: string): string {
  try {
    if (!data) {
      throw new Error('Data cannot be empty');
    }
    return cryptoJs.AES.encrypt(data, this.SecretKey).toString();
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}
```

## 📋 Best Practices

1. **Use TypeScript** - Strong typing prevents runtime errors
2. **Follow POM** - Keep page logic separate from tests
3. **Data-Driven** - Externalize test data in JSON
4. **Fixtures** - Reuse setup code
5. **Tags** - Organize tests with meaningful tags
6. **Async/Await** - Proper async handling
7. **Error Handling** - Robust error management
8. **Clean Code** - No console.logs in production
9. **Version Control** - Don't commit sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

ISC

## 👤 Author

**Pavan Sarath Kumar**

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Restful Booker API](https://restful-booker.herokuapp.com/)
- [Sauce Demo](https://www.saucedemo.com/) - UI Testing Application

---

**Happy Testing! 🎉**
