import { h, Component } from 'preact'
import WithNav from '../../components/WithNav'
@WithNav
export default class DemoPage extends Component {
  goToList = () => {
    this.props.$nav.push('list')
  }
  render () {
    return (
      <div>
        DemoPage
        <div onClick={this.goToList}>跳转到ListPage</div>
      </div>
    )
  }
}
