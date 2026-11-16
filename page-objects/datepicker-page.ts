import { expect, Page } from '@playwright/test';

export class DatepickerPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
// Method to select a date from the common datepicker and verify the selected date
    async selectDateFromCommonDatePicker(daysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();

        const expectedDateString = await this.SelectDateInTheCalendar(daysFromToday);

        await expect(calendarInputField).toHaveValue(expectedDateString);
    }

// Method to select a date range from the datepicker with range and verify the selected dates
    async selectDatePickerWithRange(daysFromTodayStart: number, daysFromTodayEnd: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();

        const expectedFirstDateString = await this.SelectDateInTheCalendar(daysFromTodayStart);
        const expectedSecondDateString = await this.SelectDateInTheCalendar(daysFromTodayEnd);
        const expectedDateRangeString = `${expectedFirstDateString} - ${expectedSecondDateString}`;

        await expect(calendarInputField).toHaveValue(expectedDateRangeString);
    }

// A private method to select a date in the calendar based on a given number of days from today
    private async SelectDateInTheCalendar(daysFromToday: number) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday);

        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
        const expectedYear = date.getFullYear().toString();
        const expectedDateString = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

        while (!currentMonthAndYear?.includes(expectedMonthAndYear)) {
            await this.page.locator('.next-month').click();
            currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDate, { exact: true }).click();
        return expectedDateString;
    }
}