import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import { XCenterView, RowView } from '@ruiyun/preact-layout-suite'
import Tabs from '@ruiyun/preact-m-tabs'
import Text from '@ruiyun/preact-text'
import Button from '@ruiyun/preact-m-button'

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
  onBtn1Click = () => {
    window.alert('我是扁平按钮')
  }
  onBtn2Click = () => {
    window.alert('我是颜色按钮')
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
        <RowView height={100} hAlign='center'>
          <Button width={300} onPress={this.onBtn1Click}>我是扁平按钮</Button>
        </RowView>
        <RowView height={100} hAlign='center'>
          <Button borderRadius={0} onPress={this.onBtn2Click} color='#5581fa'>我是颜色按钮</Button>
        </RowView>
        <RowView height={100} hAlign='center'>
          <Button textSize={20} onPress={this.onBtn2Click} color='#5581fa' disable>我是disable按钮</Button>
        </RowView>
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
