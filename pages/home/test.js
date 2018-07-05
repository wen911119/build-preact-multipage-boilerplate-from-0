import { h, Component } from "preact";
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
export default class Test extends Component {
  render({b}) {
    return (
      <div>
        <div>HRM111{b}</div>
      </div>
    );
  }
}

export const testb = () => {
  return '12345689'
}
