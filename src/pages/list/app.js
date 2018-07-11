import { h, Component } from "preact";
import Scroller from "preact-scroller";
import { XCenterView } from "preact-layoutview";
import Text from "preact-text";
import WithNav from "../../components/WithNav";
import Page from "../../components/Page";

const renderHeader = () => (
  <XCenterView height={100} bgColor="#ccc">
    <Text>标题</Text>
  </XCenterView>
);

const renderFooter = () => (
  <XCenterView height={100} bgColor="#ccc">
    <Text>底部</Text>
  </XCenterView>
);

@WithNav
class List extends Component {
  render({ data, $nav: { push } }) {
    return (
      <div>
        {data.map(item => (
          <div onClick={() => push("detail", { id: item })}>
            <XCenterView height={200}>
              <Text>{item}</Text>
            </XCenterView>
          </div>
        ))}
      </div>
    );
  }
}

@WithNav
export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.loadmore = this.loadmore.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  }
  componentDidMount() {
    this.props.$nav.onPop(p => {
      this.setState({ list: [1, 2, 3, 4, p.name] });
    });
    this.props.$nav.onBack(p => {
      this.setState({ list: [1, 2, 3, p.name] });
    });
  }
  loadmore(done) {
    console.log("load-more");
    let newPageData = [];
    for (let l = this.state.list.length, i = l + 1; i < l + 11; i++) {
      newPageData.push(i);
    }
    const newList = Array.from(this.state.list).concat(newPageData);
    setTimeout(() => {
      this.setState({ list: newList });
      done(newList.length >= 10);
    }, 2000);
  }
  refresh(done) {
    setTimeout(() => {
      this.setState({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
      done();
    }, 2000);
  }
  render({}, { list }) {
    return (
      <Page
        header={{
          height: 100,
          render: renderHeader
        }}
        footer={{
          height: 100,
          render: renderFooter
        }}
        bgColor="#f4f4f4"
      >
        <Scroller loadmore={this.loadmore} refresh={this.refresh}>
          <List data={list} />
        </Scroller>
      </Page>
    );
  }
}
