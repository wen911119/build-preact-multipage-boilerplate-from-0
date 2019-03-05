import { h, Component } from 'preact'
import { XCenterView, SlotColumnView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import axios from 'axios'
import { WithModal } from '@ruiyun/preact-modal'
import { WithActionSheet } from '@ruiyun/preact-m-actionsheet'
import WithNav from '@ruiyun/preact-m-nav'

import Menu from './menu'
import Item from './item'
import renderTopModalContent from './filter'

@WithModal
@WithActionSheet
@WithNav
export default class ZufangPage extends Component {
  constructor (props) {
    super(props)
    const localData = JSON.parse(
      window.localStorage.getItem('_qc_zufang_data_')
    ) || {
      like: [],
      dislike: []
    }
    this.state = {
      updateAt: null,
      table: [],
      filter: {
        priceStart: 2200,
        priceEnd: 4000,
        riding: 30,
        transit: 40,
        sortBy: 'riding',
        like: localData.like,
        dislike: localData.dislike
      }
    }
  }
  doFilter = (table, condition) => {
    const {
      priceStart,
      priceEnd,
      riding,
      transit,
      sortBy,
      like,
      dislike
    } = condition
    return table
      .filter(row => {
        return (
          row.price >= priceStart &&
          row.price <= priceEnd &&
          (row.riding <= riding * 60 * 1.67 || row.transit <= transit * 60) &&
          !dislike.find(drow => drow.link === row.link)
        )
      })
      .sort((a, b) => a[sortBy] - b[sortBy])
      .map(row => {
        row.img = row.img.replace(
          'https://image1.ljcdn.com',
          'https://pic.ruiyun2015.com/zufang'
        )
        row.like = !!like.find(lrow => lrow.link === row.link)
        return row
      })
  }
  onFilterComfirm = condition => {
    let mergedCondition = Object.assign({}, this.state.filter, condition)
    this.props.$modal.hide()
    this.setState({
      filter: mergedCondition,
      table: this.doFilter(this.state.originTable, mergedCondition)
    })
  }
  openFilter = () => {
    this.props.$modal.show({
      content: renderTopModalContent(this.onFilterComfirm, this.state.filter),
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
    } else if (action === '藏') {
      this.props.$nav.push('hateOrlike', { type: 'like' })
    } else if (action === '黑') {
      this.props.$nav.push('hateOrlike', { type: 'dislike' })
    }
  }
  onRecorvery = () => {
    const localData = JSON.parse(
      window.localStorage.getItem('_qc_zufang_data_')
    ) || {
      like: [],
      dislike: []
    }
    if (
      localData.like.length !== this.state.filter.like.length ||
      localData.dislike.length !== this.state.filter.dislike.length
    ) {
      const newFilter = Object.assign({}, this.state.filter, localData)
      this.setState({
        filter: newFilter,
        table: this.doFilter(this.state.originTable, newFilter)
      })
    }
  }
  async componentDidMount () {
    this.props.$nav.onRecorvery(this.onRecorvery)
    const { data } = await axios.get(
      'https://zufang.ruiyun2015.com/zfdata.json'
    )
    const filteredTable = this.doFilter(data.table, this.state.filter)
    this.setState({
      table: filteredTable,
      updateAt: new Date(data.updateAt).toLocaleString(),
      originTable: data.table
    })
  }
  render (_, { updateAt, table }) {
    return (
      <div>
        <Menu onAction={this.onAction} />
        <XCenterView height={80}>
          <Text color='#333'>最近更新于：</Text>
          <Text color='#f8584f'>{updateAt}</Text>
        </XCenterView>
        <SlotColumnView slot={20} padding={[0, 30, 0, 30]}>
          {table.map(row => (
            <Item key={row.link} row={row} />
          ))}
        </SlotColumnView>
      </div>
    )
  }
}
