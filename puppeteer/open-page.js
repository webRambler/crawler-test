const puppeteer = require('puppeteer')

;(async function() {
    const browser = await puppeteer.launch({
        headless: false
    })
    const page = await browser.newPage()
    await page.goto('https://www.baidu.com/')
    await page.type('#kw', 'Amazon')
    await page.click('#su')
    await page.waitForTimeout(3000)
    await page.click('#\\31  > h3 > a')

})()
