import { type Page, type Locator } from '@playwright/test';
export class PracticePage {
  readonly url = 'https://testautomationpractice.blogspot.com/';
  readonly name: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly address: Locator;
  readonly male: Locator;
  readonly female: Locator;
  readonly sunday: Locator;
  readonly wednesday: Locator;
  readonly saturday: Locator;
  readonly country: Locator;
  readonly colors: Locator;
  readonly field1: Locator;
  readonly field2: Locator;
  readonly copyText: Locator;
  readonly pointMe: Locator;
  readonly mobilesOption: Locator;
  readonly draggable: Locator;
  readonly dropTarget: Locator;
  readonly simpleAlert: Locator;
  readonly confirmationAlert: Locator;
  readonly promptAlert: Locator;
  readonly dialogFeedback: Locator;
  readonly newTab: Locator;
  readonly singleFileInput: Locator;
  readonly uploadSingleFile: Locator;
  readonly uploadFeedback: Locator;
  constructor(readonly page: Page) {
    this.name = page.locator('#name');
    this.email = page.locator('#email');
    this.phone = page.locator('#phone');
    this.address = page.locator('#textarea');
    this.male = page.locator('#male');
    this.female = page.locator('#female');
    this.sunday = page.locator('#sunday');
    this.wednesday = page.locator('#wednesday');
    this.saturday = page.locator('#saturday');
    this.country = page.locator('#country');
    this.colors = page.locator('#colors');
    this.field1 = page.locator('#field1');
    this.field2 = page.locator('#field2');
    this.copyText = page.getByRole('button', { name: 'Copy Text', exact: true });
    this.pointMe = page.getByRole('button', { name: 'Point Me', exact: true });
    this.mobilesOption = page.getByRole('link', { name: 'Mobiles', exact: true });
    this.draggable = page.locator('#draggable');
    this.dropTarget = page.locator('#droppable');
    this.simpleAlert = page.getByRole('button', { name: 'Simple Alert', exact: true });
    this.confirmationAlert = page.getByRole('button', { name: 'Confirmation Alert', exact: true });
    this.promptAlert = page.getByRole('button', { name: 'Prompt Alert', exact: true });
    this.dialogFeedback = page.locator('#demo');
    this.newTab = page.getByRole('button', { name: 'New Tab', exact: true });
    this.singleFileInput = page.locator('#singleFileInput');
    this.uploadSingleFile = page.getByRole('button', { name: 'Upload Single File', exact: true });
    this.uploadFeedback = page.locator('#singleFileStatus');
  }
  async open() {
    await this.page.goto(this.url);
  }
  async fillDetails(details: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    await this.name.fill(details.name);
    await this.email.fill(details.email);
    await this.phone.fill(details.phone);
    await this.address.fill(details.address);
  }
  async enterName(value: string) {
    await this.name.fill(value);
  }
  async clearName() {
    await this.name.clear();
  }
  async selectGender(gender: 'male' | 'female') {
    if (gender === 'male') {
      await this.male.check();
    } else {
      await this.female.check();
    }
  }
  async selectDays() {
    await this.sunday.check();
    await this.wednesday.check();
    await this.saturday.check();
  }
  async uncheckSunday() {
    await this.sunday.uncheck();
  }
  async selectCountry(value: string) {
    await this.country.selectOption(value);
  }
  async selectColors(values: string[]) {
    await this.colors.selectOption(values);
  }
  async focusName() {
    await this.name.focus();
  }
  async focusEmail() {
    await this.email.focus();
  }
  async copyFieldText() {
    await this.copyText.dblclick();
  }
  async hoverOverPointMe() {
    await this.pointMe.hover();
  }
  async dragToTarget() {
    await this.draggable.dragTo(this.dropTarget);
  }
  async openNewTab() {
    const popupPromise = this.page.waitForEvent('popup');
    await this.newTab.click();
    return await popupPromise;
  }
  async selectSampleFile(filePath: string) {
    await this.singleFileInput.setInputFiles(filePath);
  }
}
