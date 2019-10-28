import React, {PureComponent, Fragment} from "react";
import {Spring} from "react-spring/renderprops";
import {
  getDirection,
  getOpacity,
  getOffset,
  withXY,
  getLimitOffset,
} from "./helpers";

const SWIPE_CONFIG = {
  tension: 390,
  friction: 30,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 0.01,
  overshootClamping: true,
  lastVelocity: 1,
  mass: 0.1,
};

const DEFAULT_PROPS = {
  limit: 80,
  min: 70,
};

const INITIAL_STATE = {
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0,
  forced: false,
  swiped: false,
  moving: false,
  pristine: true,
};

export default class Swipeable extends PureComponent {
  static defaultProps = DEFAULT_PROPS;

  state = INITIAL_STATE;

  componentDidMount() {
    window.addEventListener("touchmove", this.onDragMove);
    window.addEventListener("mousemove", this.onDragMove);
    window.addEventListener("touchend", this.onDragEnd);
    window.addEventListener("mouseup", this.onDragEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("touchmove", this.onDragMove);
    window.removeEventListener("mousemove", this.onDragMove);
    window.removeEventListener("touchend", this.onDragEnd);
    window.removeEventListener("mouseup", this.onDragEnd);
  }

  onDragStart = withXY((startX, startY) => {
    if (this.state.swiped) return;

    this.setState({startX, startY, pristine: false, moving: true});
  });

  onDragMove = withXY((endX, endY) => {
    const {startX, startY, swiped, moving} = this.state;

    if (swiped || !moving) return;

    var offsetX = getOffset(startX, endX);
    var offsetY = getOffset(startY, endY);

    this.setState({offsetX: offsetX});
    this.setState({offsetY: offsetY});
  });

  onDragEnd = () => {
    const {offsetX, swiped, moving} = this.state;
    const {limit} = this.props;

    if (swiped || !moving) return;

    if (Math.abs(offsetX) >= limit) {
      this.onBeforeSwipe(getDirection(offsetX));
    } else {
      this.onCancelSwipe();
    }
  };

  onCancelSwipe = () => this.setState({startX: 0, startY: 0, offsetX: 0, offsetY: 0, moving: false});

  onBeforeSwipe = direction => {
    const {onBeforeSwipe} = this.props;

    if (onBeforeSwipe) {
      onBeforeSwipe(
        _direction => this.onSwipe(_direction || direction),
        this.onCancelSwipe,
        direction
      );
    } else {
      this.onSwipe(direction);
    }
  };

  onSwipe = direction => {
    const {limit, onSwipe} = this.props;

    if (onSwipe) {
      onSwipe(direction);
    }

    this.setState({
      swiped: true,
      moving: false,
      offsetX: getLimitOffset(limit, direction),
    });

  };

  onAfterSwipe = () => {
    const {onAfterSwipe} = this.props;

    this.setState(INITIAL_STATE);

    if (onAfterSwipe) {
      onAfterSwipe();
    }
  };

  forceSwipe = direction => {
    if (this.state.swiped) return;

    this.setState({
      pristine: false,
      forced: true,
    });

    this.onBeforeSwipe(direction);
  };

  render() {
    const {offsetX, offsetY, swiped, pristine, forced} = this.state;
    const {children, limit, buttons, min, renderResult, setRenderResult} = this.props;

    if (offsetX >= limit && renderResult !== 'like') {
      setRenderResult('like');
    } else if (offsetX <= -limit && renderResult !== 'dislike') {
      setRenderResult('dislike');
    } else if (offsetX < limit && offsetX > -limit && renderResult !== '') {
      setRenderResult('');
    }

    return (
      <Fragment>
        <Spring
          from={{offsetX: 0, offsetY: 0, opacity: 1}}
          to={{
            offsetX, offsetY,
            opacity: !forced ? 1 : getOpacity(offsetX, limit, min),
          }}
          onRest={() => swiped && this.onAfterSwipe()}
          immediate={pristine || (!forced && Math.abs(offsetX) >= limit)}
          config={SWIPE_CONFIG}
        >
          {({offsetX, opacity}) => (
            <div
              style={{
                opacity,
                //transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${offsetX / 10}deg)`,
                transform: `translateX(${offsetX}px) translateY(${offsetY}px) rotate(${0}deg)`,
                height: "100%",
                width: "100%",
              }}
              onMouseDown={this.onDragStart}
              onTouchStart={this.onDragStart}
            >
              {children}
            </div>
          )}
        </Spring>
        {buttons &&
          buttons({
            right: () => this.forceSwipe("right"),
            left: () => this.forceSwipe("left"),
          })}
      </Fragment>
    );
  }
}
