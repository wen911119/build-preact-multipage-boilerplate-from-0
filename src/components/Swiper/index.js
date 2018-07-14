import { h, Component } from "preact";
import { WithEnv } from "../Env";
const wrapStyle = {
  overflow: "hidden",
  border: "1px solid red"
};

const itemStyle = {
  width: "100vw",
  display: "inline-block"
};

const innerStyle = {
  display: "inline-block",
  whiteSpace: "nowrap"
};

@WithEnv
class Swiper extends Component {
  onTouchStart(e) {
    this.touchStart = e.touches[0];
    this.setState({ animation: false });
    this.lastTranslateX = this.state.translateX;
  }
  onTouchMove(e) {
    const angle =
      (this.touchStart.clientY - e.touches[0].clientY) /
      (this.touchStart.clientX - e.touches[0].clientX);

    if (Math.abs(angle) < 0.5) {
      this.distance = e.touches[0].clientX - this.touchStart.clientX;
      if (
        (this.state.index === this.state.total && this.distance < 0) ||
        (this.state.index === 1 && this.distance > 0)
      ) {
        this.distance = 0;
      } else {
        this.setState({
          translateX: this.distance + this.lastTranslateX
        });
      }
      e.preventDefault();
    } else {
      this.distance = 0;
    }
  }
  onTouchEnd(e) {
    if (Math.abs(this.distance) > 50) {
      //
      const direction = this.distance > 0 ? 1 : -1;
      this.setState({
        translateX:
          this.lastTranslateX + direction * this.props.$env.containerWidth,
        animation: true,
        index: this.state.index - direction * 1
      });
    } else if (Math.abs(this.distance) > 0) {
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
      animation: false,
      index: 1,
      total: props.children.length
    };
  }
  render({ children }, { translateX, animation }) {
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
          {children.map((child, index) => {
            return (
              <div key={index} style={itemStyle}>
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Swiper;
