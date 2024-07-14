import {test, expect} from '@playwright/test'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
   await page.locator('#inputEmail1').click()

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})


test('User facing locators', async({page})=> {
await page.getByRole('textbox', {name: 'Email'}).first().click()
await page.getByRole('button', {name: 'Sign in'}).first().click()


await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Jane Doe').click()
await page.getByPlaceholder('Email').first().click()

await page.getByText('Basic form').click()

await page.getByTestId('SignIn').click()

//await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..')
    .getByRole('textbox', {name: "Email"}).click()

    //Xpath - notrecommended
    await page.locator(':text-is("Block form")').locator('..')
    .getByRole('textbox', {name: "Email"}).click()
})
 