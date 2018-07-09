import { h, Component } from "preact";
import Scroller from "preact-scroller";
import { XCenterView } from "preact-layoutview";
import Text from "preact-text";

class List extends Component {
  render({ data }) {
    return (
      <div>
        {data.map(item => (
          <XCenterView height={200}>
            <Text>{item}</Text>
          </XCenterView>
        ))}
      </div>
    );
  }
}

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.loadmore = this.loadmore.bind(this);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
  loadmore(done) {
    console.log("load-more");
    let newPageData = [];
    for (let l = this.state.list.length, i = l; i < l + 11; i++) {
      newPageData.push(i);
    }
    const newList = Array.from(this.state.list).concat(newPageData);
    setTimeout(() => {
      this.setState({ list: newList });
      done(newList.length >= 60);
    }, 2000);
  }
  render({}, { list }) {
    return (
      <Scroller loadmore={this.loadmore}>
        <List data={list} />
      </Scroller>
    );
  }
}
