import { h, Component } from 'preact'
import {
  XCenterView,
  SlotRowView,
  SlotColumnView
} from '@ruiyun/preact-layout-suite'
import linkState from 'linkstate'
import Text from '@ruiyun/preact-text'
import axios from 'axios'
import Image from '@ruiyun/preact-image'
import Icon from '@ruiyun/preact-icon'
import { WithModal } from '@ruiyun/preact-modal'
import { WithActionSheet } from '@ruiyun/preact-m-actionsheet'
import Button from '@ruiyun/preact-m-button'
import WithNav from '@ruiyun/preact-m-nav'
import { TouchableInline } from '@ruiyun/preact-m-touchable'

import Menu from './menu'

const only2Line = {
  webkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  webkitBoxOrient: 'vertical'
}

const inputStyle = {
  border: '1px solid #ccc',
  height: '0.8rem',
  borderRadius: '0.1rem',
  textIndent: '0.2rem'
}

const renderTopModalContent = (onComfirm, condition = {}) => {
  return class Filter extends Component {
    state = {
      priceStart: condition.priceStart || 2000,
      priceEnd: condition.priceEnd || 4000,
      riding: condition.riding || 30,
      transit: condition.transit || 40
    }
    onComfirm = () => {
      let ret = {}
      ret.priceStart = this.state.priceStart && parseInt(this.state.priceStart)
      ret.priceEnd = this.state.priceEnd && parseInt(this.state.priceEnd)
      ret.riding = this.state.riding && parseInt(this.state.riding)
      ret.transit = this.state.transit && parseInt(this.state.transit)
      onComfirm && onComfirm(ret)
    }
    render (_, { priceStart, priceEnd, riding, transit }) {
      return (
        <SlotColumnView
          hAlign='center'
          width='100vw'
          bgColor='#fff'
          padding={[30, 0, 30, 0]}
          slot={15}
        >
          <Text>价格</Text>
          <SlotRowView slot={20}>
            <input
              placeholder='最小2000'
              value={priceStart}
              onInput={linkState(this, 'priceStart')}
              style={inputStyle}
              type='number'
            />
            <Text color='#ccc'>~</Text>
            <input
              placeholder='最大4000'
              value={priceEnd}
              onInput={linkState(this, 'priceEnd')}
              style={inputStyle}
              type='number'
            />
          </SlotRowView>
          <Text>通勤时间</Text>
          <SlotRowView slot={20}>
            <Icon size={50} name='icon-ditie' />
            <input
              placeholder='默认40分钟'
              value={transit}
              onInput={linkState(this, 'transit')}
              style={inputStyle}
              type='number'
            />
            <Text>分钟以内</Text>
          </SlotRowView>
          <Text color='#ccc'>或者</Text>
          <SlotRowView slot={20}>
            <Icon size={50} name='icon-dianpingche' />
            <input
              placeholder='默认30分钟'
              value={riding}
              onInput={linkState(this, 'riding')}
              style={inputStyle}
              type='number'
            />
            <Text>分钟以内</Text>
          </SlotRowView>
          <Button onPress={this.onComfirm} color='#16c2c2'>
            确定
          </Button>
        </SlotColumnView>
      )
    }
  }
}

@WithModal
@WithActionSheet
@WithNav
export default class ZufangPage extends Component {
  state = {
    updateAt: null,
    table: [],
    filter: {
      priceStart: 2200,
      priceEnd: 4000,
      riding: 30,
      transit: 40,
      sortBy: 'riding'
    }
  }
  doFilter = (table, condition) => {
    const { priceStart, priceEnd, riding, transit, sortBy } = condition
    return table
      .filter(row => {
        return (
          row.price >= priceStart &&
          row.price <= priceEnd &&
          (row.riding <= riding * 60 * 1.67 || row.transit <= transit * 60)
        )
      })
      .sort((a, b) => a[sortBy] - b[sortBy])
      .map(row => {
        row.img = row.img.replace(
          'https://image1.ljcdn.com',
          'https://pic.ruiyun2015.com/zufang'
        )
        return row
      })
  }
  onComfirm = condition => {
    let mergedCondition = Object.assign({}, this.state.filter, condition)
    this.props.$modal.hide()
    this.setState({
      filter: mergedCondition,
      table: this.doFilter(this.state.originTable, mergedCondition)
    })
  }
  openFilter = () => {
    this.props.$modal.show({
      content: renderTopModalContent(this.onComfirm, this.state.filter),
      position: 'top',
      mask: 0.2
    })
  }
  openActionSheet = () => {
    const map = ['price', 'transit', 'riding']
    this.props
      .$actionsheet('选择排序', ['价格升序', '地铁时间升序', '电瓶车时间升序'])
      .then(index => {
        const newFilter = Object.assign({}, this.state.filter, {
          sortBy: map[index]
        })
        this.setState({
          filter: newFilter,
          table: this.doFilter(this.state.originTable, newFilter)
        })
      })
  }
  onAction = action => {
    if (action === '筛') {
      this.openFilter()
    } else if (action === '序') {
      this.openActionSheet()
    } else if (action === '顶') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
  gotoDetail = link => {
    this.props.$nav.push('zfDetail', { link })
  }
  async componentDidMount () {
    const { data } = await axios.get(
      'https://qc-zufang-helper.oss-cn-shanghai.aliyuncs.com/zfdata.json'
    )
    const filteredTable = this.doFilter(data.table, this.state.filter)
    this.setState({
      table: filteredTable,
      updateAt: data.updateAt,
      originTable: data.table
    })
  }
  render (_, { updateAt, table }) {
    let t
    if (updateAt) {
      t = new Date(updateAt).toLocaleString()
    }
    return (
      <div>
        <Menu onAction={this.onAction} />
        <XCenterView height={80}>
          <Text color='#333'>最近更新于：</Text>
          <Text color='#f8584f'>{t}</Text>
        </XCenterView>
        <SlotColumnView slot={20} padding={[0, 30, 0, 30]}>
          {table.map(row => (
            <TouchableInline
              // eslint-disable-next-line
              onPress={this.gotoDetail.bind(this, row.link)}
              key={row.link}
            >
              <SlotRowView slot={30}>
                <Image width={330} height={240} src={row.img} />
                <SlotColumnView slot={10} style={{ flex: 1 }}>
                  <Text style={only2Line}>{row.title}</Text>
                  <SlotRowView slot={10}>
                    <Text color='#ccc' size={26}>
                      价格:
                    </Text>
                    <Text color='#ccc'>¥{row.price}</Text>
                  </SlotRowView>
                  <SlotRowView slot={10}>
                    <Icon size={30} name='icon-ditie' />
                    <Text color='#e06c57'>
                      {Math.ceil(row.transit / 60)}分钟
                    </Text>
                  </SlotRowView>
                  <SlotRowView slot={10}>
                    <Icon size={30} name='icon-dianpingche' />
                    <Text color='#db9c08'>
                      {Math.ceil(row.riding / 60 / 1.67)}分钟
                    </Text>
                  </SlotRowView>
                </SlotColumnView>
              </SlotRowView>
            </TouchableInline>
          ))}
        </SlotColumnView>
      </div>
    )
  }
}
