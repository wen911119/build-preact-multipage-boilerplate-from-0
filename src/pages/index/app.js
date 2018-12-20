import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import { XCenterView } from '@ruiyun/preact-layout-suite'
import Tabs from '@ruiyun/preact-m-tabs'
import Text from '@ruiyun/preact-text'

const SwiperItem = () => {
  return (
    <XCenterView height={600}>
      <Text>hello</Text>
    </XCenterView>
  )
}
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

        <XCenterView height={300}>
          <Text>上页参数{this.state.params}</Text>
        </XCenterView>
        <Tabs titles={['tab1', 'tab2']}>
          <SwiperItem />
          <XCenterView height={600}>
            <Text>jun</Text>
          </XCenterView>
        </Tabs>
      </div>
    )
  }
}
