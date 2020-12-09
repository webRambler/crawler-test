# 一.爬取内容

## 1. 爬取接口数据

使用http，axios等爬取api接口数据，for example：

```javascript
const axios = require('axios')
const fs = require('fs')

;(async function () {
  const { data } = await axios.get('https://api.juejin.cn/user_api/v1/author/recommend?category_id=&cursor=0&limit=20')
  console.log(data, 996)
  fs.writeFileSync('./data.json', JSON.stringify(data))
})()
```

## 2. 爬取html页面

有些页面是服务端渲染的，很多数据并不是通过api接口获取的，此时爬虫api接口是无法拿到想要的数据的，此时可以使用request、crawl等爬取整个html页面，然后再从中寻找想要的数据，for example：

```javascript

```

