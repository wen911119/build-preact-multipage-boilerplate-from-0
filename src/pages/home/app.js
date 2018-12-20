import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
@WithNav
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  goBack () {
    this.props.$nav.pop({
      backFrom: 'home'
    })
  }
  render ({ $nav }) {
    return (
      <div>
        HomePage
        <div onClick={$nav.pop}>返回</div>
        <div onClick={this.goBack}>带参数返回</div>
      </div>
    )
  }
}
