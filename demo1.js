const puppeteer = require('puppeteer')

;(async () => {
  // 生成浏览器
  const browser = await puppeteer.launch({
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
    // executablePath: '/Users/huqiyang/Documents/project/z/chromium/Chromium.app/Contents/MacOS/Chromium',
    timeout: 15000,  //设置超时时间
    ignoreHTTPSErrors: true, //如果是访问https页面 此属性会忽略https错误
    devtools: false,  // 打开开发者工具, 当此值为true时, headless总为false
    // headless: false // 关闭headless模式, 不会打开浏览器
  })

  // 打开空白页
  const page = await browser.newPage()

  // 打开地址
  await page.goto('http://www.vpgame.com/')

  // 生成截图
  await page.screenshot({
    path: 'vpgame.png',
    type: 'png',
    // quality: 100, 只对jpg有效
    fullPage: true,
    // 指定区域截图，clip和fullPage两者只能设置一个
    // clip: {
    //   x: 0,
    //   y: 0,
    //   width: 1000,
    //   height: 40
    // }
  })

  // 生成PDF // 与chromium版本有关，无头模式下才行
  // await page.pdf({
  //   path: 'vpgame.pdf',
  //   format: 'A4'  // 保存尺寸
  // })

  // 关闭浏览器
  browser.close()
})()