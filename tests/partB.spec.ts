import { type Locator, type Page } from '@playwright/test';
import { resolve } from 'node:path';
import { test, expect } from '../fixtures/practice.fixture';
async function respondToDialog(
  page: Page,
  button: Locator,
  response: 'accept' | 'dismiss',
  promptText?: string,
) {
  const handledDialog = page.waitForEvent('dialog').then(async (dialog) => {
    const details = { type: dialog.type(), message: dialog.message() };
    if (response === 'accept') {
      await dialog.accept(promptText);
    } else {
      await dialog.dismiss();
    }
    return details;
  });
  await button.click();
  return await handledDialog;
}
test.describe('Part B — Interactive Controls', () => {
  test('B1: double-click Copy Text and verify Field2 matches Field1', async ({ practice }) => {
    await practice.field1.fill('Fictional copy text');
    await practice.field2.fill('Previous value');
    const originalText = await practice.field1.inputValue();
    await practice.copyFieldText();
    await expect(practice.field2).toHaveValue(originalText);
  });

  test('B2: hover over Point Me to reveal a menu option', async ({ practice }) => {
    await expect(practice.mobilesOption).toBeHidden();
    await practice.hoverOverPointMe();
    await expect(practice.mobilesOption).toBeVisible();
  });

  test('B3: drag the element onto its target', async ({ practice }) => {
    await expect(practice.dropTarget).toHaveText('Drop here');
    await practice.dragToTarget();
    await expect(practice.dropTarget).toHaveText('Dropped!');
    await expect(practice.dropTarget).toHaveClass(/ui-state-highlight/);
  });

  test('B4: handle the simple alert and verify its type and message', async ({ practice }) => {
    const dialog = await respondToDialog(practice.page, practice.simpleAlert, 'accept');
    expect(dialog.type).toBe('alert');
    expect(dialog.message).toBe('I am an alert box!');
  });

  test('B5a: accept the confirmation and verify feedback', async ({ practice }) => {
    const dialog = await respondToDialog(practice.page, practice.confirmationAlert, 'accept');
    expect(dialog.type).toBe('confirm');
    expect(dialog.message).toBe('Press a button!');
    await expect(practice.dialogFeedback).toHaveText('You pressed OK!');
  });

  test('B5b: dismiss the confirmation and verify feedback', async ({ practice }) => {
    const dialog = await respondToDialog(practice.page, practice.confirmationAlert, 'dismiss');
    expect(dialog.type).toBe('confirm');
    expect(dialog.message).toBe('Press a button!');
    await expect(practice.dialogFeedback).toHaveText('You pressed Cancel!');
  });

  test('B6: enter fictional text in the prompt and verify feedback', async ({ practice }) => {
    const name = 'Taylor Example';
    const dialog = await respondToDialog(practice.page, practice.promptAlert, 'accept', name);
    expect(dialog.type).toBe('prompt');
    expect(dialog.message).toBe('Please enter your name:');
    await expect(practice.dialogFeedback).toHaveText(`Hello ${name}! How are you today?`);
  });

  test('B7: capture the new tab and verify its destination', async ({ practice }) => {
    const newTab = await practice.openNewTab();
    try {
      await expect(newTab).toHaveURL('https://www.pavantestingtools.com/');
    } finally {
      await newTab.close();
    }
  });

  test('B8: select a sample file and verify its filename and upload feedback', async ({ practice }) => {
    const filename = 'sample-upload.txt';
    const filePath = resolve(__dirname, 'data', filename);
    await practice.selectSampleFile(filePath);
    const selectedNames = await practice.singleFileInput.evaluate(
      (input: HTMLInputElement) => Array.from(input.files ?? [], file => file.name),
    );
    expect(selectedNames).toEqual([filename]);
    await practice.uploadSingleFile.click();
    await expect(practice.uploadFeedback).toContainText(`Single file selected: ${filename}`);
    await expect(practice.uploadFeedback).toContainText('Type: text/plain');
  });
});
