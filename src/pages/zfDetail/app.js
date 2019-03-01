import { h, Component } from 'preact'
import WithNav from '@ruiyun/preact-m-nav'
import Axios from 'axios'
import Swiper from '@ruiyun/preact-m-swiper'
import Image from '@ruiyun/preact-image'
import Text from '@ruiyun/preact-text'

const numberLabelStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  position: 'absolute',
  bottom: '3%',
  right: '3%',
  padding: '0 8px',
  zIndex: 1,
  borderRadius: '10px'
}

@WithNav
export default class ZfDetailPage extends Component {
  state = {
    images: [],
    current: 0
  }
  async componentDidMount () {
    const { link } = this.props.$nav.params
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
    this.setState({
      images
    })
  }
  onSwipe = index => {
    console.log(index)
    this.setState({
      current: index
    })
  }
  render (_, { images, current }) {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <Text color='#fff' style={numberLabelStyle}>{`${current + 1}/${
            images.length
          }`}</Text>
          <Swiper onChange={this.onSwipe}>
            {images.map(url => (
              <Image height='75vw' src={url} key={url} />
            ))}
          </Swiper>
        </div>
      </div>
    )
  }
}
