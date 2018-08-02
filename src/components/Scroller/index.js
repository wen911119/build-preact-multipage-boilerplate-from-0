import { h, Component } from "preact";

import TouchResponder from "./touchResponder";
import ScrollListener from "./scrollListener";
import Scrollable from "./scrollable";
import RefreshControl from "./refreshControl";
import LoadMore from "./loadMore";
export default class Scroller extends Component {
  constructor(props) {
    super(props);
  }
  recomputeLayout() {
    this.scrollListener.recomputeLayout();
  }
  render({ children, ...otherProps }) {
    return (
      <ScrollListener {...otherProps} ref={s => (this.scrollListener = s)}>
        <TouchResponder>
          <LoadMore>
            <RefreshControl>
              <Scrollable>{children}</Scrollable>
            </RefreshControl>
          </LoadMore>
        </TouchResponder>
      </ScrollListener>
    );
  }
}
