import { h, Component } from 'preact'
import {
  SlotRowView,
  SlotColumnView,
  RowView
} from '@ruiyun/preact-layout-suite'
import Image from '@ruiyun/preact-image'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import { TouchableInline } from '@ruiyun/preact-m-touchable'
import WithNav from '@ruiyun/preact-m-nav'

const only2Line = {
  webkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  webkitBoxOrient: 'vertical'
}
const likeStyle = {
  border: '1px solid #f8584f'
}

@WithNav
export default class Item extends Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.row.link !== nextProps.row.link ||
      this.props.row.like !== nextProps.row.like
    )
  }
  gotoDetail = () => {
    this.props.$nav.push('zfDetail', { link: this.props.row.link })
  }
  render ({ row }) {
    return (
      <TouchableInline onPress={this.gotoDetail}>
        <SlotRowView slot={30} height={260} style={row.like && likeStyle}>
          <Image width={330} height={240} src={row.img} />
          <SlotColumnView slot={10} style={{ flex: 1 }}>
            <Text style={only2Line} size={26}>
              {row.title}
            </Text>
            <RowView>
              <Text color='#ccc'>价格：¥{row.price}</Text>
            </RowView>
            <RowView>
              <Text size={24}>{row.desc}</Text>
            </RowView>
            <SlotRowView slot={20}>
              <Icon size={30} name='icon-ditie' />
              <Text color='#e06c57'>{Math.ceil(row.transit / 60)}分钟</Text>
              <Icon size={30} name='icon-dianpingche' />
              <Text color='#db9c08'>
                {Math.ceil(row.riding / 60 / 1.67)}分钟
              </Text>
            </SlotRowView>
          </SlotColumnView>
        </SlotRowView>
      </TouchableInline>
    )
  }
}
