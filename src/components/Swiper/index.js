import { h, Component } from "preact";

const wrapStyle = {
  overflow: "hidden",
  border: "1px solid red"
};

const itemStyle = {
  height: "200px",
  width: "100vw",
  display: "inline-block"
};

const innerStyle = {
  display: "inline-block",
  whiteSpace: "nowrap"
  // transition: "transform .3s"
};

class Swiper extends Component {
  onTouchStart(e) {
    this.touchStart = e.touches[0].clientX;
    this.setState({ animation: false });
    this.lastTranslateX = this.state.translateX;
  }
  onTouchMove(e) {
    this.distance = e.touches[0].clientX - this.touchStart;
    this.setState({
      translateX: this.distance + this.lastTranslateX
    });
    e.preventDefault();
  }
  onTouchEnd(e) {
    if (Math.abs(this.distance) > 50) {
      //
      const direction = this.distance > 0 ? 1 : -1;
      this.setState({
        translateX: this.lastTranslateX + direction * 414,
        animation: true
      });
    } else {
      this.setState({
        translateX: this.lastTranslateX,
        animation: true
      });
    }
  }
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.state = {
      translateX: 0,
      animation: false
    };
  }
  render({}, { translateX, animation }) {
    return (
      <div
        style={wrapStyle}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        <div
          style={Object.assign({}, innerStyle, {
            transform: `translate3d(${translateX}px,0,0)`,
            transition: animation ? "transform .3s" : null
          })}
        >
          <div style={itemStyle}>1</div>
          <div style={itemStyle}>2</div>
          <div style={itemStyle}>3</div>
        </div>
      </div>
    );
  }
}

export default Swiper;
