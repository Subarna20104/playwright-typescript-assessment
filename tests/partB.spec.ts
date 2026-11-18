import { test, expect } from '../fixtures/practice.fixture';
import { resolve } from 'node:path';

test.afterEach(async ({ page }, testInfo) => {
  await testInfo.attach('final-page.png', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('Part B — Interactive Controls', async ({ page, practice }, testInfo) => {
  test.setTimeout(180_000);

  await test.step('Read and verify the default page ARIA snapshot', async () => {
    const snapshot = await practice.body.ariaSnapshot();
    await testInfo.attach('default-page-aria.yml', {
      body: snapshot,
      contentType: 'text/yaml',
    });

    // Verify stable default controls; dynamic table values change on every load.
    await expect.soft(practice.body).toMatchAriaSnapshot(`
      - banner:
        - heading "Automation Testing Practice" [level=1]
      - heading "Data Entry Form" [level=3]
      - textbox "Enter Name"
      - textbox "Enter EMail"
      - textbox "Enter Phone"
      - textbox "Address:"
      - radio "Male"
      - radio "Female"
      - checkbox "Sunday"
      - checkbox "Wednesday"
      - checkbox "Saturday"
      - combobox "Country:":
        - option "United States" [selected]
      - listbox "Colors:"
      - heading "Upload Files" [level=2]
      - button "Upload Single File"
      - complementary:
        - button "Simple Alert"
        - button "Confirmation Alert"
        - button "Prompt Alert"
        - button "New Tab"
        - button "Point Me"
        - button "Copy Text"
        - paragraph: Drag me to my target
        - paragraph: Drop here
    `);
  });

  await test.step("B1: Double-click to copy text.", async () => {
    await practice.field1.fill('Fictional copy text');
    await practice.field2.fill('Previous value');
    const originalText = await practice.field1.inputValue();
    await practice.copyFieldText();
    await expect.soft(practice.field2).toHaveValue(originalText);
  });

  await test.step("B2: Hover to reveal the menu.", async () => {
    await expect.soft(practice.mobilesOption).toBeHidden();
    await practice.hoverOverPointMe();
    await expect.soft(practice.mobilesOption).toBeVisible();
  });

  await test.step("B3: Drag and drop.", async () => {
    await expect.soft(practice.dropTarget).toHaveText('Drop here');
    await practice.dragToTarget();
    await expect.soft(practice.dropTarget).toHaveText('Dropped!');
    await expect.soft(practice.dropTarget).toHaveClass(/ui-state-highlight/);
  });

  await test.step("B4: Accept the simple alert.", async () => {
    const alertHandled = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('alert');
      expect.soft(dialog.message()).toBe('I am an alert box!');
      await dialog.accept();
    });
    await practice.simpleAlert.click();
    await alertHandled;
  });

  await test.step("B5a: Accept the confirmation.", async () => {
    const confirmAccepted = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('confirm');
      expect.soft(dialog.message()).toBe('Press a button!');
      await dialog.accept();
    });
    await practice.confirmationAlert.click();
    await confirmAccepted;
    await expect.soft(practice.dialogFeedback).toHaveText('You pressed OK!');
  });

  await test.step("B5b: Dismiss the confirmation.", async () => {
    const confirmDismissed = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('confirm');
      expect.soft(dialog.message()).toBe('Press a button!');
      await dialog.dismiss();
    });
    await practice.confirmationAlert.click();
    await confirmDismissed;
    await expect.soft(practice.dialogFeedback).toHaveText('You pressed Cancel!');
  });

  await test.step("B6: Enter text in the prompt.", async () => {
    const promptHandled = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('prompt');
      expect.soft(dialog.message()).toBe('Please enter your name:');
      await dialog.accept('Taylor Example');
    });
    await practice.promptAlert.click();
    await promptHandled;
    await expect.soft(practice.dialogFeedback).toHaveText('Hello Taylor Example! How are you today?');
  });

  await test.step("B7: Open and verify the new tab.", async () => {
    const newTab = await practice.openNewTab();
    await expect.soft(newTab).toHaveURL('https://www.pavantestingtools.com/');
    await newTab.close();
  });

  await test.step("B8: Select and upload the sample file.", async () => {
    await practice.selectSampleFile(
      resolve(__dirname, 'data', 'sample-upload.txt'),
    );
    await expect.soft(practice.singleFileInput).toHaveValue(/sample-upload\.txt$/);
    await practice.uploadSingleFile.click();
    await expect.soft(practice.uploadFeedback).toContainText('Single file selected: sample-upload.txt');
    await expect.soft(practice.uploadFeedback).toContainText('Type: text/plain');
  });
});
