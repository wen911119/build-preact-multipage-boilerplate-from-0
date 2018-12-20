import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
@WithNav
export default class ListPage extends Component {
  constructor (props) {
    super(props)
    this.goIndex = this.goIndex.bind(this)
  }
  goIndex () {
    this.props.$nav.backTo('index')
  }
  render () {
    return (
      <div>
        ListPage
        <div onClick={this.goIndex}>回到首页</div>
      </div>
    )
  }
}
