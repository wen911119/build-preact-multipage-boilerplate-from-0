import { h, Component } from "preact";

const paramsStr = location.search.replace("?_p=", "");
let appInfo = {};
let onPopListeners = [];
let onBackListeners = [];
try {
  appInfo = JSON.parse(decodeURI(paramsStr));
} catch (e) {
  console.log(paramsStr);
}
const nav = {
  push: (path, params) => {
    appInfo.paths = appInfo.paths || [];
    const newAppInfo = {
      params,
      paths: appInfo.paths.concat([path])
    };
    window.location.href = `/${path}.html?_p=${encodeURI(
      JSON.stringify(newAppInfo)
    )}`;
  },
  pop: params => {
    const onPopParams = {
      ts: Date.now(),
      type: "onPop",
      params
    };
    localStorage.setItem("on-pop-back-params", JSON.stringify(onPopParams));
    history.back();
  },
  backTo: (path, params) => {
    if (appInfo.paths) {
      const onBackParams = {
        ts: Date.now(),
        type: "onBack",
        params
      };
      localStorage.setItem("on-pop-back-params", JSON.stringify(onBackParams));
      const index = appInfo.paths.indexOf(path);
      const backSteps = index + 1 - appInfo.paths.length;
      history.go(backSteps);
    }
  },
  onPop: listener => onPopListeners.push(listener),
  onBack: listener => onBackListeners.push(listener),
  params: appInfo.params
};

const WithNav = BaseComponent => ({ ...props }) => {
  return <BaseComponent {...props} $nav={nav} />;
};

export default WithNav;

window.addEventListener("pageshow", event => {
  if (event.persisted) {
    // 返回了
    // 读取onPop参数
    let params = localStorage.getItem("on-pop-back-params");
    if (params) {
      params = JSON.parse(params);
      // 对比时间是不是1秒内，从缓存读取是很快的
      if (Date.now() - params.ts <= 1000) {
        if (params.type === "onPop") {
          // 触发onPop
          onPopListeners.forEach(l => l(params.params));
        } else if (params.type === "onBack") {
          onBackListeners.forEach(l => l(params.params));
        }
      }
    }
  }
});
