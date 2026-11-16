import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  await test.step('Read and verify the default page ARIA snapshot', async () => {
    const snapshot = await page.locator('body').ariaSnapshot();
    await testInfo.attach('default-page-aria.yml', {
      body: snapshot,
      contentType: 'text/yaml',
    });

    // Verify stable default controls; dynamic table values change on every load.
    await expect.soft(page.locator('body')).toMatchAriaSnapshot(`
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
});

test.afterEach(async ({ page }, testInfo) => {
  await testInfo.attach('final-page.png', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('Part B — Interactive Controls', async ({ page }) => {
  test.setTimeout(180_000);
  await test.step("B1: Double-click to copy text.", async () => {
    await page.locator('#field1').fill('Fictional copy text');
    await page.locator('#field2').fill('Previous value');
    const originalText = await page.locator('#field1').inputValue();
    await page.getByRole('button', { name: 'Copy Text', exact: true }).dblclick();
    await expect.soft(page.locator('#field2')).toHaveValue(originalText);
  });

  await test.step("B2: Hover to reveal the menu.", async () => {
    await expect.soft(page.getByRole('link', { name: 'Mobiles', exact: true })).toBeHidden();
    await page.getByRole('button', { name: 'Point Me', exact: true }).hover();
    await expect.soft(page.getByRole('link', { name: 'Mobiles', exact: true })).toBeVisible();
  });

  await test.step("B3: Drag and drop.", async () => {
    await expect.soft(page.locator('#droppable')).toHaveText('Drop here');
    await page.locator('#draggable').dragTo(page.locator('#droppable'));
    await expect.soft(page.locator('#droppable')).toHaveText('Dropped!');
    await expect.soft(page.locator('#droppable')).toHaveClass(/ui-state-highlight/);
  });

  await test.step("B4: Accept the simple alert.", async () => {
    const alertHandled = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('alert');
      expect.soft(dialog.message()).toBe('I am an alert box!');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Simple Alert', exact: true }).click();
    await alertHandled;
  });

  await test.step("B5a: Accept the confirmation.", async () => {
    const confirmAccepted = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('confirm');
      expect.soft(dialog.message()).toBe('Press a button!');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Confirmation Alert', exact: true }).click();
    await confirmAccepted;
    await expect.soft(page.locator('#demo')).toHaveText('You pressed OK!');
  });

  await test.step("B5b: Dismiss the confirmation.", async () => {
    const confirmDismissed = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('confirm');
      expect.soft(dialog.message()).toBe('Press a button!');
      await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Confirmation Alert', exact: true }).click();
    await confirmDismissed;
    await expect.soft(page.locator('#demo')).toHaveText('You pressed Cancel!');
  });

  await test.step("B6: Enter text in the prompt.", async () => {
    const promptHandled = page.waitForEvent('dialog').then(async (dialog) => {
      expect.soft(dialog.type()).toBe('prompt');
      expect.soft(dialog.message()).toBe('Please enter your name:');
      await dialog.accept('Taylor Example');
    });
    await page.getByRole('button', { name: 'Prompt Alert', exact: true }).click();
    await promptHandled;
    await expect.soft(page.locator('#demo')).toHaveText('Hello Taylor Example! How are you today?');
  });

  await test.step("B7: Open and verify the new tab.", async () => {
    const newTabPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'New Tab', exact: true }).click();
    const newTab = await newTabPromise;
    await expect.soft(newTab).toHaveURL('https://www.pavantestingtools.com/');
    await newTab.close();
  });

  await test.step("B8: Select and upload the sample file.", async () => {
    await page.locator('#singleFileInput').setInputFiles(
      resolve(__dirname, 'data', 'sample-upload.txt'),
    );
    await expect.soft(page.locator('#singleFileInput')).toHaveValue(/sample-upload\.txt$/);
    await page.getByRole('button', { name: 'Upload Single File', exact: true }).click();
    await expect.soft(page.locator('#singleFileStatus')).toContainText('Single file selected: sample-upload.txt');
    await expect.soft(page.locator('#singleFileStatus')).toContainText('Type: text/plain');
  });
});
