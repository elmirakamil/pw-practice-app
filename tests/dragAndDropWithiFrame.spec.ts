import {test, expect} from '@playwright/test'

test('drag and drop with iframe', async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: "High Tatras"}).first().dragTo(frame.locator('#trash'))

    //more precise control 
    await frame.locator('li', {hasText:"High Tatras 3"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras","High Tatras 3"])
})