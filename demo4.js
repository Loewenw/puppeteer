const fs = require('fs')
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await (puppeteer.launch({
    defaultViewport: {
      width: 1620,
      height: 900
    },
    headless: false
  }))

  const page = await browser.newPage()

  page.setViewport({width: 1220, height: 900})

  // 进入页面
  await page.goto('http://www.vpgame.com/featured/dibevent')

  // 等待元素加载出来
  await page.waitForSelector('.container-wrapper')

  await sleep(1000)

  // 获取页面标题
  let title = await page.title()
  
  console.log(`已经打开 ${title}`)

  console.log("点击钥匙发放记录")

  await page.tap('.content-sum-body .open-modal')

  console.log("等待弹出框渲染出来")

  // 等待弹出框渲染出来

  await page.waitForSelector('.record-modal-btn')

  await sleep(2000)

  console.log("滚动钥匙发放记录")

  // 滚动钥匙发放记录
  for(let i = 0; i < 6; i++) {
    await page.evaluate(_ => {
      document.querySelector('.ant-table-body').scrollBy(0, 30)
    })

    await sleep(100)
  }

  await sleep(2000)

  console.log("点击确定关闭弹窗")

  const recordModalBtn = await page.$('.record-modal-btn')

  // console.log('recordModalBtn', recordModalBtn)

  await recordModalBtn.click()

  // await page.tap('.record-modal-btn')

  await sleep(2000)

  console.log("点击我的领取记录")

  // 点击我的领取记录
  await page.tap('.btn-box .open-modal')

  await sleep(1000)

  // console.log("点击确定关闭弹窗")

  console.log("选中账号输入框")

  // 选中账号输入框
  await page.tap('#account1')

  await sleep(500)

  console.log("输入账号")
  
  // 输入账号
  await page.type('#account1', '填写帐号', {delay: 80})

  await sleep(1000)

  console.log("选择密码框")

  // 选择密码框
  await page.tap('#password1')

  await sleep(500)

  console.log("输入密码")

  // 输入密码
  await page.type('#password1', '填写密码', {delay: 80})

  await sleep(1000)

  console.log("点击已满18岁")

  // 点击已满18岁
  // await page.tap('#years')

  await sleep(1000)

  console.log("点击登录按钮")

  // 点击登录按钮
  await page.tap('.login-form [type=submit]')

  await sleep(1500)

  console.log("点击我的领取记录")

  // 等待我的领取记录按钮渲染完
  await page.waitForSelector('.btn-box .open-modal')

  // 点击我的领取记录
  await page.tap('.btn-box .open-modal')

  await sleep(1000)

  console.log("点击确定关闭弹窗")

  await page.tap('.record-modal-btn')

  await sleep(2000)

  console.log("跳到兑换列表")

  await page.tap('.nav-item-2')

  await sleep(2000)

  for(let i = 0; i < 8; i++) {
    await page.evaluate(_ => {
      window.scrollBy(0, document.body.scrollHeight / 12)
    })

    await sleep(100)
  }

  await sleep(2000)

  browser.close()
  console.log('browser close')
})()

// 延迟函数
const sleep = time => new Promise((res, rej) => {
  setTimeout(() => {
    res()
  }, time)
})
