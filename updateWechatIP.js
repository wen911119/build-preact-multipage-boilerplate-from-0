console.log('+++++++++++================================>>>>>>>>>>>>>')
const globby = require('globby');
const ip = require("ip");

const fse = require('fs-extra');
(async ()=>{
  const paths = await globby('wechat/pages/*/*.wxml')
  
  const rets = await Promise.all(paths.map(async path=>{
    let content = await fse.readFile(path, 'utf8')
    content = content.replace(/\d+\.\d+\.\d+\.\d+/, ip.address())
    const ret = await fse.writeFile(path, content, 'utf8')
    return ret
  }))
  console.log(rets)
})()