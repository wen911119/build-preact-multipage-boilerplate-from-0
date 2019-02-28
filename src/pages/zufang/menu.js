import { h, Component } from 'preact'
import { SlotColumnView } from '@ruiyun/preact-layout-suite'
import Icon from '@ruiyun/preact-icon'
import Button from '@ruiyun/preact-m-button'

const menuStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem'
}

export default class Menu extends Component {
  state = {
    open: false
  }
  onToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }
  onAction = action => {
    this.onToggle()
    this.props.onAction && this.props.onAction(action)
  }
  render (_, { open }) {
    return (
      <SlotColumnView slot={20} style={menuStyle}>
        {open && (
          <SlotColumnView slot={20}>
            <Button
              color='#ccc'
              height={70}
              width={70}
              borderRadius={35}
              // eslint-disable-next-line
              onPress={this.onAction.bind(this, '黑')}
            >
              黑
            </Button>
            <Button
              color='#ccc'
              height={70}
              width={70}
              borderRadius={35}
              // eslint-disable-next-line
              onPress={this.onAction.bind(this, '藏')}
            >
              藏
            </Button>
            <Button
              color='#ccc'
              height={70}
              width={70}
              borderRadius={35}
              // eslint-disable-next-line
              onPress={this.onAction.bind(this, '筛')}
            >
              筛
            </Button>
            <Button
              color='#ccc'
              height={70}
              width={70}
              borderRadius={35}
              // eslint-disable-next-line
              onPress={this.onAction.bind(this, '序')}
            >
              序
            </Button>
            <Button
              color='#ccc'
              height={70}
              width={70}
              borderRadius={35}
              // eslint-disable-next-line
              onPress={this.onAction.bind(this, '顶')}
            >
              顶
            </Button>
          </SlotColumnView>
        )}
        <Button
          color='#ccc'
          height={70}
          width={70}
          borderRadius={35}
          onPress={this.onToggle}
        >
          <Icon
            name={open ? 'icon-close' : 'icon-menu'}
            color='#fff'
            size={open ? 34 : 50}
          />
        </Button>
      </SlotColumnView>
    )
  }
}
