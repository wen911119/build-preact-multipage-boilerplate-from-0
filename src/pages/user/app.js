import { h, Component } from "preact";
import { XCenterView } from "preact-layoutview";
import Text from "preact-text";
import { Scroller, ScrollerWithRefresh, ScrollerWithLoadMore, ScrollerWithRefreshAndLoadMore } from "../../components/Scroller";
import WithNav from "../../components/WithNav";

class List extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.list !== nextProps.list) {
      return true;
    }
    return false;
  }
  render({ list }) {
    return (
      <div>
        {list.map(item => (
          <XCenterView height={300}>
            <Text>user{item}</Text>
          </XCenterView>
        ))}
      </div>
    );
  }
}

@WithNav
export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }
  add() {
    this.setState({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
    // const div = document.createElement("div")
    // div.style = "height: 3000px;background-color:#ccc"
    // div.innerHTML = "djwdbedbebej"
    // document.getElementById("list").appendChild(div)
  }
  onRefresh(done) {
    setTimeout(() => {
      this.setState({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, done);
    }, 3000);
  }
  onLoadMore(done) {
    setTimeout(() => {
      let newArr = Array.from(this.state.list);
      for (let l = newArr.length + 1, i = l; i < l + 11; i++) {
        newArr.push(i);
      }
      this.setState({ list: newArr }, () => {
        done(newArr.length > 60);
      });
    }, 3000);
  }
  render(
    {
      $nav: { backTo }
    },
    { list }
  ) {
    return (
      <div>
        <Scroller
          ref={s => (this.scroller = s)}
          onRefresh={this.onRefresh}
          onLoadMore={this.onLoadMore}
        >
          <List list={list} />
        </Scroller>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: 'column'
          }}
        >
          <div
            style={{ backgroundColor: "rgba(0,0,0,.3)", flex: 1 }}
            onTouchMove={e => {
              e.preventDefault();
            }}
          />
          <ScrollerWithRefreshAndLoadMore height="400px" style={{ backgroundColor: "#fff" }} onLoadMore={this.onLoadMore} onRefresh={this.onRefresh}>
            <List list={list} />
          </ScrollerWithRefreshAndLoadMore>
        </div>
        <XCenterView height={200}>
          <button onClick={this.add}>增加</button>
        </XCenterView>
      </div>
    );
  }
}
