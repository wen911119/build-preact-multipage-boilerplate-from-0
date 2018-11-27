import { h, render } from "preact";
import App from "./app";
render(h(App), document.body, document.body.firstElementChild);
if (module.hot) {
  module.hot.accept();
}
