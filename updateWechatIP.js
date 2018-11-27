const ip = require("ip");
const fse = require('fs-extra');
const currentDir = process.cwd();
const argvs = process.argv.slice(2)
const port = argvs[0] || '8081';

(async ()=>{
  const targetPath = `${currentDir}/wechat/app.js`
  let content = await fse.readFile(targetPath, 'utf8')
  content = content.replace(/\d+\.\d+\.\d+\.\d+:\d+/, `${ip.address()}:${port}`)
  await fse.writeFile(targetPath, content, 'utf8')
})()