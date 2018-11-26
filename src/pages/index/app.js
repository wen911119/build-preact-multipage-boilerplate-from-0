import { h, Component } from "preact";
import WithNav from '../../components/WithNav';

@WithNav
export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
  }
  goTo () {
    this.props.$nav.push('home')
  }
  render() {
    return (
      <div onClick={this.goTo}>
        IndexPage
      </div>
    );
  }
}
