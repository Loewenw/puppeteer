const fs = require('fs')
const puppeteer = require('puppeteer')

const devices = require('puppeteer/DeviceDescriptors')
const iPhone6 = devices['iPhone 6']

;(async () => {
  const browser = await (puppeteer.launch({ 
    headless: false
  }))

  const page = await browser.newPage()

  // 模拟移动端设备
  await page.emulate(iPhone6)
  // 设置浏览器视图大小
  page.setViewport({width: 1200, height: 600})

  // 进入页面
  await page.goto('http://www.vpgame.com/prediction')

  // 等待元素加载出来
  await page.waitForSelector('.match-tab-list')

  // 添加script
  await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

  await sleep(3000)

  // 获取页面标题
  let title = await page.title()
  
  console.log(`已经打开 ${title}`)

  const TRUE = '.match-tab-list li'

  // 创建浏览器上下文
  const brands = await page.evaluate(sel => {
    const ulList = [...$(sel)]
    const ctn = ulList.map(_ => {
        const tab_item = $(_).find('.match-tab-item')
        const left_team = tab_item.find('.left-team')
        const middle_content = tab_item.find('.middle-content')
        const right_team = tab_item.find('.right-team')
        const title = [...middle_content.find('p').first().find('span')].map(item => $(item)[0].innerText).join(' ')
        const isPred = middle_content.find('.type').hasClass('match-mode-normal')
        const time = middle_content.find('.time')[0].innerText
        const leftImg = left_team.find('img').attr('src')
        const leftTitle = left_team.find('span')[0].innerTextdo
        const rightImg = right_team.find('img').attr('src')
        const rightTitle = right_team.find('span')[0].innerText
  
        const schedule_item = [...$(_).find('.match-schedule-list .match-schedule-item')]
        const schedule = schedule_item.map(item => {
          const left_odds = $(item).find('.left-odds .odds')[0].innerText
          const right_odds = $(item).find('.right-odds .odds')[0].innerText
          const status = $(item).find('.status')[0].innerText
          return {
            left_odds,
            right_odds,
            status
          }
        })
        return {
          leftTitle,
          rightTitle,
          leftImg,
          rightImg,
          title,
          isPred,
          time,
          schedule
        }
    })
    return ctn
  }, TRUE)

  objToJsonFile(brands, 'prediction')
  // await bodyHandle.dispose()
// cosnt a = page.$('a')
// cosnt a = page.$$('a')

  browser.close()
  console.log('browser close')
})()

// 延迟函数
const sleep = time => new Promise((res, rej) => {
  setTimeout(() => {
    res()
  }, time)
})


// 
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