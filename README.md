# Playwright Assessment

Automated tests for [Automation Testing Practice](https://testautomationpractice.blogspot.com/), written in TypeScript using Playwright Test. Each part runs in its own single test block, with each exercise grouped using `test.step()`, simple ID and role locators, and soft assertions.

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

Watch the assessment in a visible browser, with a 700 ms delay between browser actions and one test running at a time:

```bash
npm run test:headed
```

Run either part separately:

```bash
npx playwright test tests/partA.spec.ts
npx playwright test tests/partB.spec.ts
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

Part A and Part B run independently, with one test block per file. Every assertion uses `expect.soft()` so assertion failures are recorded while the test continues. Action failures can still stop execution.

### Part A — Form Interactions and Assertions

The form exercises cover:

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

The interactive exercises cover eight requirements, including both confirmation responses:

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
tests/partA.spec.ts            Part A in a single test block
tests/partB.spec.ts            Part B in a single test block
tests/data/sample-upload.txt  Prepared upload sample
playwright.config.ts          Browser, timeout, and report configuration
tsconfig.json                 TypeScript configuration
```

Tests use Chromium and require internet access to the practice website and the new-tab destination. Each part opens its own practice page and completes its exercises in order.

Generated reports, test results, and `node_modules` are excluded from Git. Screenshots and traces are retained for failed tests.
