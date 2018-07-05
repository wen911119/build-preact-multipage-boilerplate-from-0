// const Hello = () => {
//   return <div>hello webpack</div>;
// };
import { join } from "lodash-es";
function Hello() {
  return join(["4", "5", "6"], "_");
}

export default Hello;
