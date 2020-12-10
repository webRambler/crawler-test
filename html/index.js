const request = require('request')
const fs = require('fs')

const url = 'http://www.foshan.gov.cn/'
request(url, (err, res, body) => {
    console.log(body)
    fs.writeFileSync('index.html', body)
})
