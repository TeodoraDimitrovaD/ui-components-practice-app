import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});


test('Fill in the Inline form and click the checkbox', async ({ page }) => {
    const userName = 'Test User';
    const email = 'test@test.com';
    const inlineFormCard = page.locator('nb-card').filter({ hasText: 'Inline form' });

    await inlineFormCard.getByPlaceholder('Jane Doe').fill(userName);
    await inlineFormCard.getByPlaceholder('Email').first().fill(email);
    await inlineFormCard.locator('.custom-checkbox').click(); //The native checkbox is hidden, so we need to click on the custom checkbox instead, so I'm using it's class

    await expect(inlineFormCard.getByPlaceholder('Jane Doe')).toHaveValue(userName);
    await expect(inlineFormCard.getByPlaceholder('Email').first()).toHaveValue(email);
    await expect(inlineFormCard.locator('input[type="checkbox"]')).toBeChecked();

    await inlineFormCard.getByRole('button', { name: 'Submit' }).click();
});

test('Fill in the Grid form and verify radio button states', async ({ page }) => {
    const email = 'test@test.com';
    const password = 'TestPassword123';
    const gridFormCard = page.locator('nb-card').filter({ hasText: 'Using the Grid' });

    await gridFormCard.getByPlaceholder('Email').fill(email);
    await gridFormCard.getByPlaceholder('Password').fill(password);
    await gridFormCard.getByRole('radio', { name: 'Option 1' }).check({ force: true }); // The native radio button is hidden, so we need to force the check action cause the element will never be visible

    await expect(gridFormCard.getByPlaceholder('Email')).toHaveValue(email);
    await expect(gridFormCard.getByPlaceholder('Password')).toHaveValue(password);
    await expect(gridFormCard.getByRole('radio', { name: 'Option 1' })).toBeChecked();
    await expect(gridFormCard.getByRole('radio', { name: 'Option 2' })).not.toBeChecked();
    await expect(gridFormCard.getByRole('radio', { name: 'Disabled Option' })).toBeDisabled();

    await gridFormCard.getByRole('button', { name: 'Sign in' }).click();
})

test('Fill in the Form without labels', async ({ page }) => {
    const recipient = 'Test Recipient';
    const subject = 'Test Subject';
    const message = 'Hello,\nThis is my first textarea test.\nBest regards!';
    const formWithoutLabelsCard = page.locator('nb-card').filter({ hasText: 'Form without labels' });

    await formWithoutLabelsCard.getByPlaceholder('Recipients').fill(recipient);
    await formWithoutLabelsCard.getByPlaceholder('Subject').fill(subject);
    await formWithoutLabelsCard.getByPlaceholder('Message').fill(message);


    await expect(formWithoutLabelsCard.getByPlaceholder('Recipient')).toHaveValue(recipient);
    await expect(formWithoutLabelsCard.getByPlaceholder('Subject')).toHaveValue(subject);
    await expect(formWithoutLabelsCard.getByPlaceholder('Message')).toHaveValue(message);

    await formWithoutLabelsCard.getByRole('button', { name: 'Send' }).click();
})