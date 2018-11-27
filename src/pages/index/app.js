import { h, Component } from "preact";
import WithNav from '../../components/WithNav';

@WithNav
export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
  }
  goTo (path) {
    this.props.$nav.push(path)
  }
  render() {
    return (
      <div >
        <div onClick={this.goTo.bind(this, 'home')}>跳转到HomePage</div>
        <div onClick={this.goTo.bind(this, 'list')}>跳转到ListPage</div>
        <div onClick={this.goTo.bind(this, 'demo')}>跳转到DemoPage</div>
      </div>
    );
  }
}
