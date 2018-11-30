import { h, Component } from 'preact'
import WithNav from '../../components/WithNav'

@WithNav
export default class IndexPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      params: null
    }
  }
  goToHome = () => {
    this.props.$nav.push('home')
  }
  goToDemo = () => {
    this.props.$nav.push('demo')
  }
  componentDidMount () {
    this.props.$nav.onPop(p => {
      this.setState({ params: p.backFrom })
    })
  }
  render () {
    return (
      <div>
        <div onClick={this.goToHome}>跳转到HomePage</div>
        <div onClick={this.goToDemo}>跳转到DemoPage</div>
        <div>上页参数{this.state.params}</div>
      </div>
    )
  }
}
