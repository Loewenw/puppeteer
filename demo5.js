const puppeteer = require('puppeteer')
// const devices = require('puppeteer/DeviceDescriptors')
// const iPhone = devices['iPhone 6']

;(async () => {
  try{
    const browser = await puppeteer.launch()

    const page = await browser.newPage()

    // await page.emulate(iPhone)

    await page.tracing.start({path: './trace.json'})

    await page.goto('http://www.vpgame.com/featured/dibevent')

    await page.tracing.stop()

    browser.close()

    // 可以将生成的trance.js的文件上传到浏览器的performance
  } catch (e) {
      console.log(e.message)
  }
})()