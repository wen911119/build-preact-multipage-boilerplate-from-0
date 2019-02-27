import { h, Component } from 'preact'
import { XCenterView } from '@ruiyun/preact-layout-suite'
import Text from '@ruiyun/preact-text'
import axios from 'axios'

export default class ZufangPage extends Component {
  state = {
    updateAt: null,
    table: [],
    filter: {
      priceStart: 2200,
      priceEnd: 4000,
      minRiding: 3000,
      minTransit: 2400
    }
  }
  doFilter = table => {
    return table.filter(row => {
      return (
        row.price >= this.state.filter.priceStart &&
        row.price <= this.state.filter.priceEnd &&
        (row.riding <= this.state.filter.minRiding ||
          row.transit <= this.state.filter.minTransit)
      )
    })
  }
  async componentDidMount () {
    const { data } = await axios.get(
      'https://qc-zufang-helper.oss-cn-shanghai.aliyuncs.com/zfdata.json'
    )
    const filteredTable = this.doFilter(data.table)
    this.setState({
      table: filteredTable,
      updateAt: data.updateAt
    })
  }
  render (_, { updateAt, table }) {
    let t
    if (updateAt) {
      t = new Date(updateAt).toLocaleString()
    }
    return (
      <div>
        <XCenterView height={80}>
          <Text color='#333'>最近更新于：</Text>
          <Text color='#f8584f'>{t}</Text>
        </XCenterView>
        {table.map(row => (
          <div key={row.link}>
            <Text>{row.title}</Text>
          </div>
        ))}
      </div>
    )
  }
}
