import { test, expect } from '@playwright/test';

test('Part A — Form Interactions and Assertions', async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto('https://testautomationpractice.blogspot.com/');

  // A1: verify the page title and URL
  await expect.soft(
    page,
    'Page title should be Automation Testing Practice',
  ).toHaveTitle('Automation Testing Practice');
  await expect.soft(
    page,
    'Page URL should match the practice website',
  ).toHaveURL('https://testautomationpractice.blogspot.com/');

  // A2: enter fictional details and verify all field values
  const details = {
    name: 'Alex Example',
    email: 'alex@example.com',
    phone: '2025550148',
    address: '42 Fictional Lane, Example City',
  };
  await page.locator('#name').fill(details.name);
  await page.locator('#email').fill(details.email);
  await page.locator('#phone').fill(details.phone);
  await page.locator('#textarea').fill(details.address);
  await expect.soft(
    page.locator('#name'),
    'Name field should contain the entered name',
  ).toHaveValue(details.name);
  await expect.soft(
    page.locator('#email'),
    'Email field should contain the entered email',
  ).toHaveValue(details.email);
  await expect.soft(
    page.locator('#phone'),
    'Phone field should contain the entered phone number',
  ).toHaveValue(details.phone);
  await expect.soft(
    page.locator('#textarea'),
    'Address field should contain the entered address',
  ).toHaveValue(details.address);

  // A3: clear the name and enter a different name
  await page.locator('#name').fill('Alex Example');
  await expect.soft(
    page.locator('#name'),
    'Initial name should be present before clearing',
  ).toHaveValue('Alex Example');
  await page.locator('#name').clear();
  await expect.soft(
    page.locator('#name'),
    'Name field should be empty after clearing',
  ).toBeEmpty();
  await page.locator('#name').fill('Taylor Example');
  await expect.soft(
    page.locator('#name'),
    'Name field should contain the updated name',
  ).toHaveValue('Taylor Example');

  // A4: switch gender and verify selected and unselected states
  await page.locator('#male').check();
  await expect.soft(
    page.locator('#male'),
    'Male should be selected',
  ).toBeChecked();
  await expect.soft(
    page.locator('#female'),
    'Female should be unselected when Male is selected',
  ).not.toBeChecked();
  await page.locator('#female').check();
  await expect.soft(
    page.locator('#female'),
    'Female should be selected after switching',
  ).toBeChecked();
  await expect.soft(
    page.locator('#male'),
    'Male should be unselected after switching to Female',
  ).not.toBeChecked();

  // A5: select Sunday, Wednesday and Saturday
  await page.locator('#sunday').check();
  await page.locator('#wednesday').check();
  await page.locator('#saturday').check();
  await expect.soft(
    page.locator('#sunday'),
    'Sunday should be checked',
  ).toBeChecked();
  await expect.soft(
    page.locator('#wednesday'),
    'Wednesday should be checked',
  ).toBeChecked();
  await expect.soft(
    page.locator('#saturday'),
    'Saturday should be checked',
  ).toBeChecked();

  // A6: uncheck Sunday while keeping Wednesday and Saturday checked
  await page.locator('#sunday').check();
  await page.locator('#wednesday').check();
  await page.locator('#saturday').check();
  await expect.soft(
    page.locator('#sunday'),
    'Sunday should initially be checked',
  ).toBeChecked();
  await expect.soft(
    page.locator('#wednesday'),
    'Wednesday should initially be checked',
  ).toBeChecked();
  await expect.soft(
    page.locator('#saturday'),
    'Saturday should initially be checked',
  ).toBeChecked();
  await page.locator('#sunday').uncheck();
  await expect.soft(
    page.locator('#sunday'),
    'Sunday should be unchecked',
  ).not.toBeChecked();
  await expect.soft(
    page.locator('#wednesday'),
    'Wednesday should remain checked',
  ).toBeChecked();
  await expect.soft(
    page.locator('#saturday'),
    'Saturday should remain checked',
  ).toBeChecked();

  // A7: select a country and verify its value
  await page.locator('#country').selectOption('india');
  await expect.soft(
    page.locator('#country'),
    'Country dropdown should have India selected',
  ).toHaveValue('india');

  // A8: select multiple colors and verify their values
  await page.locator('#colors').selectOption(['blue', 'yellow']);
  await expect.soft(
    page.locator('#colors'),
    'Colors list should have exactly Blue and Yellow selected',
  ).toHaveValues(['blue', 'yellow']);

  // A9: verify a text field gains and loses focus
  await page.locator('#name').focus();
  await expect.soft(
    page.locator('#name'),
    'Name field should have focus',
  ).toBeFocused();
  await page.locator('#email').focus();
  await expect.soft(
    page.locator('#email'),
    'Email field should receive focus',
  ).toBeFocused();
  await expect.soft(
    page.locator('#name'),
    'Name field should no longer have focus',
  ).not.toBeFocused();
});
