import { h, Component } from "preact";
import { XCenterView } from "preact-layoutview";
import Text from "preact-text";

import WithNav from "../../components/WithNav";

const UserPage = ({ $nav: { backTo } }) => {
  return (
    <div onClick={() => backTo("list", {name: 'wj'})}>
      <XCenterView height={300}>
        <Text>user</Text>
      </XCenterView>
    </div>
  );
};

export default WithNav(UserPage);
