import { test } from '@playwright/test';
import { DatepickerPage } from '../page-objects/datepicker-page';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
});

test('Select a date from the common datepicker and verify the selected date', async ({ page }) => {
    const datepickerPage = new DatepickerPage(page);
    await datepickerPage.selectDateFromCommonDatePicker(2);
});

test ('Select a date range from the datepicker with range and verify the selected dates', async ({ page }) => {
    const datepickerPage = new DatepickerPage(page);
    await datepickerPage.selectDatePickerWithRange(2, 5);
});