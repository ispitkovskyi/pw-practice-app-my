import {expect} from '@playwright/test'
import {test} from '../test-options'

test('drag and drop with iframe', async({page, globalsQaURL}) => {
    await page.goto(globalsQaURL) // see test-options.ts and playwright.config.ts using TestOptions

    // drag by using .dragTo() method
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe') // locator of iframe
    await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash')) // fails, because the element is inside an iframe

    // more presice control of mouse drag - by hover/down/up methods of mouse object
    await frame.locator('li', {hasText: 'High Tatras 4'}).hover()
    await page.mouse.down() // press Left mouse button
    await frame.locator('#trash').hover()
    await page.mouse.up() // release Left mouse button

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})