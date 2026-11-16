import { test, expect } from '../fixtures/practice.fixture';

test('Part A — Form Interactions and Assertions', async ({ page, practice }) => {
  test.setTimeout(180_000);

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
  await practice.fillDetails(details);
  await expect.soft(
    practice.name,
    'Name field should contain the entered name',
  ).toHaveValue(details.name);
  await expect.soft(
    practice.email,
    'Email field should contain the entered email',
  ).toHaveValue(details.email);
  await expect.soft(
    practice.phone,
    'Phone field should contain the entered phone number',
  ).toHaveValue(details.phone);
  await expect.soft(
    practice.address,
    'Address field should contain the entered address',
  ).toHaveValue(details.address);

  // A3: clear the name and enter a different name
  await practice.enterName('Alex Example');
  await expect.soft(
    practice.name,
    'Initial name should be present before clearing',
  ).toHaveValue('Alex Example');
  await practice.clearName();
  await expect.soft(
    practice.name,
    'Name field should be empty after clearing',
  ).toBeEmpty();
  await practice.enterName('Taylor Example');
  await expect.soft(
    practice.name,
    'Name field should contain the updated name',
  ).toHaveValue('Taylor Example');

  // A4: switch gender and verify selected and unselected states
  await practice.selectGender('male');
  await expect.soft(
    practice.male,
    'Male should be selected',
  ).toBeChecked();
  await expect.soft(
    practice.female,
    'Female should be unselected when Male is selected',
  ).not.toBeChecked();
  await practice.selectGender('female');
  await expect.soft(
    practice.female,
    'Female should be selected after switching',
  ).toBeChecked();
  await expect.soft(
    practice.male,
    'Male should be unselected after switching to Female',
  ).not.toBeChecked();

  // A5: select Sunday, Wednesday and Saturday
  await practice.selectDays();
  await expect.soft(
    practice.sunday,
    'Sunday should be checked',
  ).toBeChecked();
  await expect.soft(
    practice.wednesday,
    'Wednesday should be checked',
  ).toBeChecked();
  await expect.soft(
    practice.saturday,
    'Saturday should be checked',
  ).toBeChecked();

  // A6: uncheck Sunday while keeping Wednesday and Saturday checked
  await practice.selectDays();
  await expect.soft(
    practice.sunday,
    'Sunday should initially be checked',
  ).toBeChecked();
  await expect.soft(
    practice.wednesday,
    'Wednesday should initially be checked',
  ).toBeChecked();
  await expect.soft(
    practice.saturday,
    'Saturday should initially be checked',
  ).toBeChecked();
  await practice.uncheckSunday();
  await expect.soft(
    practice.sunday,
    'Sunday should be unchecked',
  ).not.toBeChecked();
  await expect.soft(
    practice.wednesday,
    'Wednesday should remain checked',
  ).toBeChecked();
  await expect.soft(
    practice.saturday,
    'Saturday should remain checked',
  ).toBeChecked();

  // A7: select a country and verify its value
  await practice.selectCountry('india');
  await expect.soft(
    practice.country,
    'Country dropdown should have India selected',
  ).toHaveValue('india');

  // A8: select multiple colors and verify their values
  await practice.selectColors(['blue', 'yellow']);
  await expect.soft(
    practice.colors,
    'Colors list should have exactly Blue and Yellow selected',
  ).toHaveValues(['blue', 'yellow']);

  // A9: verify a text field gains and loses focus
  await practice.focusName();
  await expect.soft(
    practice.name,
    'Name field should have focus',
  ).toBeFocused();
  await practice.focusEmail();
  await expect.soft(
    practice.email,
    'Email field should receive focus',
  ).toBeFocused();
  await expect.soft(
    practice.name,
    'Name field should no longer have focus',
  ).not.toBeFocused();
});
