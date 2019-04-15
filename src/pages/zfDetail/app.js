import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import Axios from 'axios'
import Swiper from '@ruiyun/preact-m-swiper'
import Image from '@ruiyun/preact-image'
import Text from '@ruiyun/preact-text'
import Line from '@ruiyun/preact-line'
import {
  RowView,
  SlotRowView,
  ColumnView,
  XCenterView
} from '@ruiyun/preact-layout-suite'
import Button from '@ruiyun/preact-m-button'
import Icon from '@ruiyun/preact-icon'
import { TouchableBlock, TouchableInline } from '@ruiyun/preact-m-touchable'
import './app.css'

const numberLabelStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  position: 'absolute',
  bottom: '3%',
  right: '3%',
  padding: '0 8px',
  zIndex: 1,
  borderRadius: '10px'
}

const fixedBottom = {
  position: 'fixed',
  bottom: 0,
  zIndex: 1,
  width: '100%',
  boxShadow: '0 -5px 5px -5px #ccc'
}

const iconBack = {
  position: 'absolute',
  left: 0,
  top: '0.3rem',
  padding: '0.26rem',
  zIndex: 1,
  borderRadius: '0 50% 50% 0'
}

// const pageHeader = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   zIndex: 1,
//   width: '100%'
// }

class LocalStorageManager {
  constructor (table) {
    this.table = table
    this.localData = this._getStorageData()
  }
  _getStorageData = () => {
    return (
      JSON.parse(window.localStorage.getItem('_qc_zufang_data_')) || {
        like: [],
        dislike: []
      }
    )
  }
  _setStorageData = data => {
    window.localStorage.setItem('_qc_zufang_data_', JSON.stringify(data))
    this.localData = data
  }
  addToStorage = (link, type) => {
    let target = this.table.find(row => row.link === link)
    if (target) {
      this.localData[type].push(target)
      this._setStorageData(this.localData)
    }
  }
  removeFromStorage = (link, type) => {
    let targetIndex = this.localData[type].findIndex(row => row.link === link)
    this.localData[type].splice(targetIndex, 1)
    this._setStorageData(this.localData)
  }
  check = (link, type) => {
    return !!this.localData[type].find(row => row.link === link)
  }
}

@WithNav
export default class ZfDetailPage extends Component {
  state = {
    images: [],
    current: 0,
    title: '',
    like: false,
    dislike: false
  }
  async componentDidMount () {
    const { link } = this.props.$nav.params
    const {
      data: { table }
    } = await Axios.get(
      'https://qc-zufang-helper.oss-cn-shanghai.aliyuncs.com/zfdata.json'
    )
    this.$ls = new LocalStorageManager(table)
    const like = this.$ls.check(link, 'like')
    const dislike = this.$ls.check(link, 'dislike')
    const { data } = await Axios.get(
      `https://api.ruiyun2015.com/lianjia/chuzu/sh${link}`
    )
    const images = data
      .match(/data-src=".+"/g)
      .map(item =>
        item
          .replace(/data-src="(.+)"/, '$1')
          .replace('image1.ljcdn.com', 'pic.ruiyun2015.com/zufang')
      )
    const title = data.match(/<h2\sclass="page-title-h2">(.+)<\/h2>/)[1]
    const fangzu = data
      .match(/<span>房租.*<\/span>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const huxing = data
      .match(/<span>户型<\/span>\n.+<span>\n(.+)<\/span>/)[1]
      .trim()
    const mianji = data
      .match(/<span>面积<\/span>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const fabu = data
      .match(/<label>发布.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const ruzhu = data
      .match(/<label>入住.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const kanfang = data
      .match(/<label>看房.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const louceng = data
      .match(/<label>楼层.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const dianti = data
      .match(/<label>电梯.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const chewei = data
      .match(/<label>车位.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const yongshui = data
      .match(/<label>用水.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const yongdian = data
      .match(/<label>用电.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const ranqi = data
      .match(/<label>燃气.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    const cainuan = data
      .match(/<label>采暖.*<\/label>\n.+<span>(.+)<\/span>/)[1]
      .trim()
    this.setState({
      images,
      title,
      fangzu,
      huxing,
      mianji,
      fabu,
      ruzhu,
      kanfang,
      louceng,
      dianti,
      chewei,
      yongshui,
      yongdian,
      ranqi,
      cainuan,
      like,
      dislike
    })
  }
  onSwipe = index => {
    this.setState({
      current: index
    })
  }
  onToggleLike = () => {
    this.state.dislike ||
      this.setState(
        {
          like: !this.state.like
        },
        () => {
          if (this.state.like && this.$ls) {
            this.$ls.addToStorage(this.props.$nav.params.link, 'like')
          } else if (this.$ls) {
            this.$ls.removeFromStorage(this.props.$nav.params.link, 'like')
          }
        }
      )
  }
  onToggleDislike = () => {
    this.state.like ||
      this.setState(
        {
          dislike: !this.state.dislike
        },
        () => {
          if (this.state.dislike && this.$ls) {
            this.$ls.addToStorage(this.props.$nav.params.link, 'dislike')
          } else if (this.$ls) {
            this.$ls.removeFromStorage(this.props.$nav.params.link, 'dislike')
          }
        }
      )
  }
  gotoLianJia = () => {
    const url = `https://m.lianjia.com/chuzu/sh${this.props.$nav.params.link}`
    window.location.href = url
  }
  goBack = () => {
    this.props.$nav.pop()
  }
  render (
    _,
    {
      images,
      current,
      title,
      fangzu,
      huxing,
      mianji,
      fabu,
      ruzhu,
      kanfang,
      louceng,
      dianti,
      chewei,
      yongshui,
      yongdian,
      ranqi,
      cainuan,
      like,
      dislike
    }
  ) {
    return (
      <div>
        <div className='flex'>222</div>
        <div style={{ position: 'relative', height: '75vw' }}>
          <TouchableInline onPress={this.goBack}>
            <XCenterView style={iconBack} bgColor='rgba(0,0,0,0.5)'>
              <Icon name='icon-fanhui' color='#fff' size={34} />
            </XCenterView>
          </TouchableInline>

          <Text color='#fff' style={numberLabelStyle}>{`${current + 1}/${
            images.length
          }`}</Text>
          <Swiper onChange={this.onSwipe}>
            {images.map(url => (
              <Image height='75vw' src={url} key={url} />
            ))}
          </Swiper>
        </div>
        <RowView padding={[30, 30, 30, 30]}>
          <Text size={44} weight={700}>
            {title}
          </Text>
        </RowView>
        <SlotRowView hAlign='space-around' height={100} slot={<Line v />}>
          <ColumnView vAlign='space-between' height={100}>
            <Text color='#9399a5' size={26}>
              房租
            </Text>
            <Text color='#fe615a' size={32} weight={700}>
              {fangzu}
            </Text>
          </ColumnView>
          <ColumnView vAlign='space-between' height={100}>
            <Text color='#9399a5' size={26}>
              户型
            </Text>
            <Text color='#fe615a' size={32} weight={700}>
              {huxing}
            </Text>
          </ColumnView>
          <ColumnView vAlign='space-between' height={100}>
            <Text color='#9399a5' size={26}>
              面积
            </Text>
            <Text color='#fe615a' size={32} weight={700}>
              {mianji}
            </Text>
          </ColumnView>
        </SlotRowView>
        <ColumnView padding={[30, 30, 30, 30]}>
          <RowView height={70}>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                发布：
              </Text>
              <Text size={32}>{fabu}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                入住：
              </Text>
              <Text size={32}>{ruzhu}</Text>
            </div>
          </RowView>
          <RowView height={70}>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                看房：
              </Text>
              <Text size={32}>{kanfang}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                楼层：
              </Text>
              <Text size={32}>{louceng}</Text>
            </div>
          </RowView>
          <RowView height={70}>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                电梯：
              </Text>
              <Text size={32}>{dianti}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                车位：
              </Text>
              <Text size={32}>{chewei}</Text>
            </div>
          </RowView>
          <RowView height={70}>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                用水：
              </Text>
              <Text size={32}>{yongshui}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                用电：
              </Text>
              <Text size={32}>{yongdian}</Text>
            </div>
          </RowView>
          <RowView height={70}>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                燃气：
              </Text>
              <Text size={32}>{ranqi}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color='#9399a5' size={32}>
                采暖：
              </Text>
              <Text size={32}>{cainuan}</Text>
            </div>
          </RowView>
        </ColumnView>
        <TouchableBlock onPress={this.gotoLianJia}>
          <RowView
            hAlign='space-between'
            height={80}
            padding={[0, 30, 0, 30]}
            bgColor='#f5f5f5'
          >
            <SlotRowView slot={16}>
              <Icon name='icon-solid-home' size={40} color='#16c2c2' />
              <Text size={34} color='#16c2c2'>
                去链家查看
              </Text>
            </SlotRowView>
            <Icon name='icon-jiantou' color='#16c2c2' />
          </RowView>
        </TouchableBlock>
        <RowView height={200} />
        <div style={fixedBottom}>
          <RowView
            padding={[30, 30, 30, 30]}
            hAlign='space-between'
            bgColor='#fff'
          >
            <Button
              width={330}
              color={like ? undefined : '#16c2c2'}
              onPress={this.onToggleLike}
            >
              {like ? '已收藏' : '收藏'}
            </Button>
            <Button
              width={330}
              color={dislike ? undefined : '#01130a'}
              onPress={this.onToggleDislike}
            >
              {dislike ? '已拉黑' : '拉黑'}
            </Button>
          </RowView>
        </div>
      </div>
    )
  }
}
