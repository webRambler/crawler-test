const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')

const url = 'https://www.amazon.cn/s?k=longines&__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&ref=nb_sb_noss'
request(url, (err, res, body) => {
    fs.writeFileSync('cheerio/index.html', body)

    const $ = cheerio.load(body)

    fs.writeFileSync('cheerio/test.html', $('#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row').children())

    const obj = []
    console.log($('.a-section.a-spacing-medium').length, 77)
    $('.a-section.a-spacing-medium').each((i, item) => {
        obj[i] = {}
        obj[i].picSrc = $('img', item).attr('src')
        obj[i].price = $('.a-offscreen', item).text()
        obj[i].title = $('.a-size-base-plus.a-color-base.a-text-normal', item).text()
    })
    fs.writeFileSync('cheerio/data.json', JSON.stringify(obj))

})
