const fs = require("fs");
const ip = require("ip");
const { COPYFILE_EXCL } = fs.constants;
const path = require("path");
const currentDir = process.cwd();
const webPagesDir = path.resolve(currentDir, "./src/pages");
const wechatPagesDir = path.resolve(currentDir, "./wechat/pages");
const templateDir = path.resolve(currentDir, "./.template");
const apps = process.argv.slice(2);

apps.forEach(page => {
  const newPagePath = `${webPagesDir}/${page}`;
  fs.mkdir(newPagePath, err => {
    if (err) {
      console.log(`目录${newPagePath}已存在`);
      return;
    }
    copy(`${templateDir}/web-page`, newPagePath, path => {
      console.log(path);
      if (path.indexOf("entry.js") < 0) {
        fs.readFile(path, "utf8", (err, code) => {
          if (err) {
            console.log(err);
          } else {
            code = code.replace(/###_page-name_###/g, `${ucFirst(page)}Page`);
            fs.writeFile(path, code, "utf8", function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  });
  const newWechtPagePath = `${wechatPagesDir}/${page}`;
  fs.mkdir(newWechtPagePath, err => {
    if (err) {
      console.log(`目录${newWechtPagePath}已存在`);
      return;
    }
    copy(`${templateDir}/wechat-page`, newWechtPagePath, path => {
      console.log(path);
      if (path.indexOf("index.js") < 0) {
        fs.readFile(path, "utf8", (err, code) => {
          if (err) {
            console.log(err);
          } else {
            code = code.replace(
              /###_page-url_###/g,
              `http://${ip.address()}:8080/${page}.html`
            );
            fs.writeFile(path, code, "utf8", function(err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  });

  const wechatRouteConfigPath = `${currentDir}/wechat/app.json`;
  fs.readFile(wechatRouteConfigPath, "utf8", (err, data) => {
    if (err) console.log(err);
    let config = JSON.parse(data);
    config.pages.push(`pages/${page}/index`);
    fs.writeFileSync(wechatRouteConfigPath, JSON.stringify(config));
  });
});

// 首字母大写
function ucFirst(str) {
  return str.replace(/^([a-z])(.+)/, (m, m1, m2) => {
    return m1.toUpperCase() + m2;
  });
}

function copy(srcDir, descDir, cb) {
  fs.readdir(srcDir, function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    files.forEach(function(file) {
      const src = path.join(srcDir, file);
      const desc = path.join(descDir, file);
      const stat = fs.statSync(src);
      if (stat.isFile()) {
        fs.copyFile(src, desc, COPYFILE_EXCL, function(err) {
          if (err) {
            console.log(`文件${desc}已经存在,不会覆盖！`);
          }
          cb && cb(desc);
        });
      } else if (stat.isDirectory()) {
        // 创建目录
        fs.mkdir(desc, function(err) {
          if (err) {
            console.log(`目录${desc}已经存在`);
          }
          copy(src, desc);
        });
      }
    });
  });
}
