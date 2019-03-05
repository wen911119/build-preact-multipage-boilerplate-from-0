import { h, Component } from 'preact'
import Item from '../zufang/item'
import WithNav from '@ruiyun/preact-m-nav'
import { SlotColumnView, XCenterView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import { TouchableBlock } from '@ruiyun/preact-m-touchable'

const backIconStyle = {
  position: 'absolute',
  left: 0,
  padding: '0.26rem'
}

@WithNav
export default class HateOrlikePage extends Component {
  constructor (props) {
    super(props)
    const localData = JSON.parse(
      window.localStorage.getItem('_qc_zufang_data_')
    ) || {
      like: [],
      dislike: []
    }
    this.state = {
      rows: localData[props.$nav.params.type].map(row => {
        row.img = row.img.replace(
          'https://image1.ljcdn.com',
          'https://pic.ruiyun2015.com/zufang'
        )
        return row
      })
    }
  }
  goBack = () => {
    this.props.$nav.pop()
  }
  render (
    {
      $nav: {
        params: { type }
      }
    },
    { rows }
  ) {
    return (
      <div>
        <XCenterView
          height={80}
          bgColor='#f5f5f5'
          style={{ position: 'relative' }}
        >
          <TouchableBlock style={backIconStyle} onPress={this.goBack}>
            <XCenterView>
              <Icon name='icon-fanhui' color='#919191' />
            </XCenterView>
          </TouchableBlock>
          <Text>{type === 'like' ? '收藏夹' : '黑名单'}</Text>
        </XCenterView>
        <SlotColumnView padding={[30, 30, 30, 30]} slot={20}>
          {rows.map(row => (
            <Item key={row.link} row={row} />
          ))}
        </SlotColumnView>
      </div>
    )
  }
}
