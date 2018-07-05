import { h, Component } from "preact";

import Test from "./test";

const abc = () => target => {
  target.abc = "hahaha";
  return target;
};

const a = {
  b: "wenjun"
};

@abc()
export default class Hello extends Component {
  render() {
    return (
      <div>
        <div style={{ color: "red" }}>hello webpack2</div>
        <Test {...a} />
      </div>
    );
  }
}

export Demo from "./demo";

import("./demo").then(({default: func}) => {
  func()
});
