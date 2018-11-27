import { h, Component } from "preact";
import WithNav from '../../components/WithNav';

@WithNav
export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
    this.state = {
      params: null
    }
  }
  goTo (path) {
    this.props.$nav.push(path)
  }
  componentDidMount () {
    this.props.$nav.onPop(p=>{
      this.setState({params: p.backFrom})
    })
  }
  render() {
    return (
      <div >
        <div onClick={this.goTo.bind(this, 'home')}>跳转到HomePage</div>
        <div onClick={this.goTo.bind(this, 'demo')}>跳转到DemoPage</div>
        <div>上页参数{this.state.params}</div>
      </div>
    );
  }
}
