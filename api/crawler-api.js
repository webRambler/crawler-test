const axios = require('axios')
const fs = require('fs')

;(async function () {
  const { data } = await axios.get('https://api.juejin.cn/user_api/v1/author/recommend?category_id=&cursor=0&limit=20')
  console.log(typeof data, 77)
  fs.writeFileSync('./data.json', JSON.stringify(data))
})()
