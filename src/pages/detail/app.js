import { h, Component } from "preact";
import { XCenterView } from "preact-layoutview";
import Text from "preact-text";
import WithNav from "../../components/WithNav";

@WithNav
export default class DetailPage extends Component {
  render({ $nav: { params, pop, backTo, push } }) {
    return (
      <div>
        <div onClick={() => push("user")}>
          <XCenterView height={300}>
            <Text>detail:{params.id}</Text>
          </XCenterView>
        </div>
        <div onClick={() => pop({ name: "hello" })}>
          <XCenterView height={300}>
            <Text>pop:{params.id}</Text>
          </XCenterView>
        </div>
      </div>
    );
  }
}
