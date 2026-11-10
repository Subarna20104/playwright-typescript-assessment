import { test, expect } from '../fixtures/practice.fixture';

test.describe('Part A — Form Interactions and Assertions', () => {
  test('A1: verify the page title and URL', async ({ practice }) => {
    await expect(
      practice.page,
      'Page title should be Automation Testing Practice',
    ).toHaveTitle('Automation Testing Practice');
    await expect(
      practice.page,
      'Page URL should match the practice website',
    ).toHaveURL(practice.url);
  });
  test('A2: enter fictional details and verify all field values', async ({
    practice,
  }) => {
    const details = {
      name: 'Alex Example',
      email: 'alex@example.com',
      phone: '2025550148',
      address: '42 Fictional Lane, Example City',
    };
    await practice.fillDetails(details);
    await expect(
      practice.name,
      'Name field should contain the entered name',
    ).toHaveValue(details.name);
    await expect(
      practice.email,
      'Email field should contain the entered email',
    ).toHaveValue(details.email);
    await expect(
      practice.phone,
      'Phone field should contain the entered phone number',
    ).toHaveValue(details.phone);
    await expect(
      practice.address,
      'Address field should contain the entered address',
    ).toHaveValue(details.address);
  });
  test('A3: clear the name and enter a different name', async ({
    practice,
  }) => {
    await practice.enterName('Alex Example');
    await expect(
      practice.name,
      'Initial name should be present before clearing',
    ).toHaveValue('Alex Example');
    await practice.clearName();
    await expect(
      practice.name,
      'Name field should be empty after clearing',
    ).toBeEmpty();
    await practice.enterName('Taylor Example');
    await expect(
      practice.name,
      'Name field should contain the updated name',
    ).toHaveValue('Taylor Example');
  });
  test('A4: switch gender and verify selected and unselected states', async ({
    practice,
  }) => {
    await practice.selectGender('male');
    await expect(
      practice.male,
      'Male should be selected',
    ).toBeChecked();
    await expect(
      practice.female,
      'Female should be unselected when Male is selected',
    ).not.toBeChecked();
    await practice.selectGender('female');
    await expect(
      practice.female,
      'Female should be selected after switching',
    ).toBeChecked();
    await expect(
      practice.male,
      'Male should be unselected after switching to Female',
    ).not.toBeChecked();
  });
  test('A5: select Sunday, Wednesday and Saturday', async ({
    practice,
  }) => {
    await practice.selectDays();
    await expect(
      practice.sunday,
      'Sunday should be checked',
    ).toBeChecked();
    await expect(
      practice.wednesday,
      'Wednesday should be checked',
    ).toBeChecked();
    await expect(
      practice.saturday,
      'Saturday should be checked',
    ).toBeChecked();
  });
  test('A6: uncheck Sunday while keeping Wednesday and Saturday checked', async ({
    practice,
  }) => {
    await practice.selectDays();
    await expect(
      practice.sunday,
      'Sunday should initially be checked',
    ).toBeChecked();
    await expect(
      practice.wednesday,
      'Wednesday should initially be checked',
    ).toBeChecked();
    await expect(
      practice.saturday,
      'Saturday should initially be checked',
    ).toBeChecked();
    await practice.uncheckSunday();
    await expect(
      practice.sunday,
      'Sunday should be unchecked',
    ).not.toBeChecked();
    await expect(
      practice.wednesday,
      'Wednesday should remain checked',
    ).toBeChecked();
    await expect(
      practice.saturday,
      'Saturday should remain checked',
    ).toBeChecked();
  });
  test('A7: select a country and verify its value', async ({
    practice,
  }) => {
    await practice.selectCountry('india');
    await expect(
      practice.country,
      'Country dropdown should have India selected',
    ).toHaveValue('india');
  });
  test('A8: select multiple colors and verify their values', async ({
    practice,
  }) => {
    await practice.selectColors(['blue', 'yellow']);
    await expect(
      practice.colors,
      'Colors list should have exactly Blue and Yellow selected',
    ).toHaveValues(['blue', 'yellow']);
  });
  test('A9: verify a text field gains and loses focus', async ({
    practice,
  }) => {
    await practice.focusName();
    await expect(
      practice.name,
      'Name field should have focus',
    ).toBeFocused();
    await practice.focusEmail();
    await expect(
      practice.email,
      'Email field should receive focus',
    ).toBeFocused();
    await expect(
      practice.name,
      'Name field should no longer have focus',
    ).not.toBeFocused();
  });
});