const request = require('request')
const fs = require('fs')

const url = 'https://www.csdn.net/nav/python?spm=1000.2115.3001.4125'
request(url, (err, res, body) => {
    console.log(body)
    fs.writeFileSync('index.html', body)
})