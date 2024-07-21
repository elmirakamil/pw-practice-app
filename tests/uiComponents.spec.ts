import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 100 })

        //generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertations
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        //await usingTheGridForm.getByLabel('Option 1').check({force:true})
        await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        const radioButtonStatus = usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()
        expect(radioButtonStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()

        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()
    })

    test('checkbox', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
        await page.getByRole('checkbox', { name: 'Show toast with icon' }).uncheck({ force: true })
        //  await page.getByRole('checkbox', {name:'Show toast with icon'}).check({force:true})

        const allBoxes = page.getByRole('checkbox')
        for (const box of await allBoxes.all()) {
            await box.uncheck({ force: true })
            expect(await box.isChecked()).toBeFalsy()
        }

    })

})