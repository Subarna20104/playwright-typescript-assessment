import { test as base } from '@playwright/test';
import { PracticePage } from '../pages/PracticePage';
type PracticeFixtures = {
  practice: PracticePage;
};
export const test = base.extend<PracticeFixtures>({
  practice: async ({ page }, use) => {
    const practice = new PracticePage(page);
    await practice.open();
    await use(practice);
  },
});
export { expect } from '@playwright/test';