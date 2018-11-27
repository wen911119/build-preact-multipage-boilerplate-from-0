import { h, Component } from "preact";
import WithNav from '../../components/WithNav';
@WithNav
export default class DemoPage extends Component {
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
  }
  goTo (path) {
    this.props.$nav.push(path)
  }
  render() {
    return (
      <div>
        DemoPage
        <div onClick={this.goTo.bind(this, 'list')}>跳转到ListPage</div>
      </div>
    );
  }
}
