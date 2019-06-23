# 安装

`npm i`

如果遇到安装失败的情况
先切到淘宝源 
`cnpm i`
如果还是安装失败的情况
`npm install`

设置环境变量跳过下载

` Chromium set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 `

或者可以这样干，只下载模块而不build 

`npm i --save puppeteer --ignore-scripts`

然后再去手动下载Chromium，下载完后将压缩包解压到自定义的路径中

https://download-chromium.appspot.com/


或者更换国内Chromium源

`PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org`
`npm i puppeteer`

#结构

demo1 -- 网页生成图片或PDF

demo2 -- 接口爬虫

demo3 -- 页面内容抓取爬虫

demo4 -- 自动化测试

demo5 -- puppeteer trace


