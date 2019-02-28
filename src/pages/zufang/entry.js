import { h, render } from 'preact'
import App from './app'
import { setIconFontUrl } from '@ruiyun/preact-icon'
setIconFontUrl('//at.alicdn.com/t/font_1063773_xmmtdf35ijc.css')
if (typeof App === 'function') {
  let root = document.body.firstElementChild
  let init = () => {
    root = render(h(App), document.body, root)
    if (module.hot) module.hot.accept('./app', init)
  }
  init()
}
