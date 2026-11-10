# Playwright Assessment

Automated tests for [Automation Testing Practice](https://testautomationpractice.blogspot.com/), written in TypeScript using Playwright Test and a Page Object Model.

## Setup

Install Node.js with npm, then run these commands from the project folder:

```bash
npm ci
npx playwright install chromium
```

## Run tests

Run all tests headlessly:

```bash
npm test
```

Watch both parts in a visible browser, with a 700 ms delay between browser actions and one test running at a time:

```bash
npm run test:headed
```

Run either part separately in the visible browser:

```bash
npm run test:headed -- tests/partA.spec.ts
npm run test:headed -- tests/partB.spec.ts
```

The headed script uses macOS/Linux environment variable syntax. On Windows PowerShell, use:

```powershell
$env:SLOW_MO = '700'
npx playwright test --headed --workers=1
```

Open the interactive test runner or step through tests with the debugger:

```bash
npm run test:ui
npm run test:debug
```

Check TypeScript and open the report from the most recent test run:

```bash
npx tsc --noEmit
npm run report
```

## Test coverage

Both parts belong to the same project. There are 18 tests in total.

### Part A — Form Interactions and Assertions

Nine tests cover:

1. Page title and URL.
2. Fictional name, email, phone number, and address, with value assertions.
3. Clearing and replacing the name.
4. Switching gender and checking selected and unselected radio states.
5. Selecting Sunday, Wednesday, and Saturday.
6. Unchecking Sunday while keeping Wednesday and Saturday checked.
7. Selecting a country and checking its value.
8. Selecting multiple colors and checking their values.
9. Moving focus between fields and checking focused and unfocused states.

### Part B — Interactive Controls

Nine tests cover eight requirements; confirmation acceptance and dismissal are separate tests:

1. Double-clicking Copy Text and checking that Field2 matches Field1.
2. Hovering over Point Me to reveal a menu option.
3. Dragging an element onto its target and checking the completed state.
4. Handling a simple alert and checking its type and message.
5. Accepting and dismissing a confirmation, with feedback assertions.
6. Entering fictional prompt text and checking feedback.
7. Capturing a new tab and checking its destination URL.
8. Selecting a prepared sample file, checking its filename, and checking upload feedback.

## Project structure

```text
fixtures/practice.fixture.ts   Shared fixture that opens the practice page
pages/PracticePage.ts          Page locators and reusable actions
tests/partA.spec.ts            Form interaction tests
tests/partB.spec.ts            Interactive control tests
tests/data/sample-upload.txt  Prepared upload sample
playwright.config.ts          Browser, timeout, and report configuration
tsconfig.json                 TypeScript configuration
```

Tests use Chromium and require internet access to the practice website and the new-tab destination. Each test opens a fresh page through the shared fixture and can run independently.

Generated reports, test results, and `node_modules` are excluded from Git. Screenshots and traces are retained for failed tests.
