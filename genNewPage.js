const fs = require('fs')
const { resolve } = require('path')
const currentDir = process.cwd()
const webPagesDir = resolve(currentDir, './src/pages')
const wechatPagesDir = resolve(currentDir, './wechat/pages')
const apps = process.argv.slice(2)

apps.forEach(page=>{
  console.log(page)
  const pageNameUC = ucFirst(page)

  fs.mkdir(`${webPagesDir}/${pageNameUC}`, err=>{
    if (err) {
      console.log(`目录${webPagesDir}/${pageNameUC}已存在`)
      return;
    }
    copy()

  })


})

// 首字母大写
function ucFirst (str) {
  return str.replace(/^([a-z])(.+)/, (m, m1, m2) => {
    return m1.toUpperCase() + m2
  })
}

function copy (srcDir, descDir, cb) {
  fs.readdir(srcDir, function (err, files) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    files.forEach(function (file) {
      const src = path.join(srcDir, file)
      const desc = path.join(descDir, file)
      const stat = fs.statSync(src)
      if (stat.isFile()) {
        fs.copyFile(src, desc, COPYFILE_EXCL, function (err) {
          if (err) {
            console.log(`文件${desc}已经存在,不会覆盖！`)
          }
          cb && cb(desc)
        })
      } else if (stat.isDirectory()) {
        // 创建目录
        fs.mkdir(desc, function (err) {
          if (err) {
            console.log(`目录${desc}已经存在`)
          }
          copy(src, desc)
        })
      }
    })
  })
}

