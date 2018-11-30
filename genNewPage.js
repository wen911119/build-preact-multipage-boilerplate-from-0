const fse = require('fs-extra')
const currentDir = process.cwd()
const pages = process.argv.slice(2)

pages.forEach(async page => {
  // 创建web页面
  // 把模版复制到对应文件夹下
  await fse.copy(
    `${currentDir}/.template/web-page`,
    `${currentDir}/src/pages/${page}`
  )
  // 修改复制后的模版文件
  const appjsFilePath = `${currentDir}/src/pages/${page}/app.js`
  // 读取
  let appjscontent = await fse.readFile(appjsFilePath, 'utf8')
  // 修改
  appjscontent = appjscontent.replace(
    /###_page-name_###/g,
    `${ucFirst(page)}Page`
  )
  // 回写
  await fse.writeFile(appjsFilePath, appjscontent, 'utf8')

  // 创建小程序页面
  // 把模版复制到对应文件夹下
  await fse.copy(
    `${currentDir}/.template/wechat-page`,
    `${currentDir}/wechat/pages/${page}`
  )
  // 修改复制后的模版文件
  const indexjsFilePath = `${currentDir}/wechat/pages/${page}/index.js`
  // 读取
  let indexjscontent = await fse.readFile(indexjsFilePath, 'utf8')
  // 修改
  indexjscontent = indexjscontent.replace(/###_page-name_###/g, page)
  // 回写
  await fse.writeFile(indexjsFilePath, indexjscontent, 'utf8')

  // 给小程序增加一条路由
  const configFilePath = `${currentDir}/wechat/app.json`
  let appConfig = await fse.readJSON(configFilePath)
  appConfig.pages.push(`pages/${page}/index`)
  await fse.writeJSON(configFilePath, appConfig)
})

// 首字母大写
function ucFirst (str) {
  return str.replace(/^([a-z])(.+)/, (m, m1, m2) => {
    return m1.toUpperCase() + m2
  })
}
