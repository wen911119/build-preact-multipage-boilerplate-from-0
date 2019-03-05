import { h, Component } from 'preact'
import { SlotRowView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import Icon from '@ruiyun/preact-icon'
import Button from '@ruiyun/preact-m-button'
import linkState from 'linkstate'

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

export default renderTopModalContent
