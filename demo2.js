const puppeteer = require('puppeteer')
const fs = require('fs')
let news = []

;(async () => {
  const Num = 2

  // 生成Browser实例
  const browser = await puppeteer.launch({
    // excutablePath: './chromium/chrome.exe',
    // headless: false
  })

  // 创建tab页，一个Browser可以有多个Page
  const page = await browser.newPage()

  // on监听页面事件，once监听一次，removeListener移除监听
  // response 当页面接收到请求的respnse时触发
  // error | request | console | load | pageerror ...
  page.on('response', res => {
    // console.log('response', res._request.url)
    let mathStr = res._request.url.indexOf('www.toutiao.com/api/pc/')
    if (mathStr > -1) {
      // console.log(res._url)
      res.json().then(json => {
        // console.log('json', json)
        let data = json.data
        if (data) {
          data.forEach(v => {
            news.push(v)
          })
        }
      })
    }
  })

  // 打开网站
  await page.goto('https://www.toutiao.com/')

  async function loadPage(pageNum) {
    // 延迟3000ms加载一屏
    await sleep(3000)
    
    await page.evaluate(_ => {
      window.scrollBy(0, document.body.scrollHeight)
    })
  console.log(`${pageNum} onepage loader success ${new Date()}`)
 }


  for( let i = 0; i < Num; i++) {
    await loadPage(i)
  }

 let fileDate = new Date()
 let fileName = `news${fileDate.getFullYear()}${fileDate.getDate()}`

 objToJsonFile(news, fileName)
 await sleep(3000)
 await page.close()
 await browser.close()

 console.log('browser close success')
})()

// 延迟函数
const sleep = time => new Promise((res, rej) => {
  setTimeout(() => {
    res()
  }, time)
})

// 生成json文件并写入数据
const objToJsonFile = (obj, fileName) => {
  fs.open(`${__dirname}/${fileName}.json`, 'w', (err, fd) => {
    if (err) {
      throw new Error("file Open Error: " + err)
    }
    let jsonStr = JSON.stringify(obj)
    fs.write(fd, jsonStr, 0, 'utf8', (err, written, string) => {
      if(err) {
        throw new Error("file write Error: " + err)
      }
    })
    fs.close(fd, function(err) {
      if(err) {
        throw new Error("file write Error: " + err)
      }
    })
  })
}

