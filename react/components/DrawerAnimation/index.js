import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-spring'

const ANIMATIONS = {
  left: {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
  },
  right: {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
  },
  top: {
    from: { transform: 'translateY(-100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-100%)' },
  },
  bottom: {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
  },
}

/**
 * DrawerAnimation component
 */
export default class DrawerAnimation extends Component {
  static propTypes = {
    /* Object to be animated */
    children: PropTypes.object.isRequired,
    /* Active the animation */
    isActive: PropTypes.bool,
    /* Classname to the animation */
    className: PropTypes.string,
    /* Origin of animation */
    from: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  }

  static defaultProps = {
    className: '',
    from: 'left',
  }

  renderChildren = style => (
    <div className={this.props.className}
      style={style}
    >
      {this.props.children}
    </div>
  )

  render() {
    const { isActive, from } = this.props
    const style = ANIMATIONS[from]

    return (
      <Transition
        keys={isActive ? ['children'] : []}
        {...style}
      >
        {isActive ? [this.renderChildren] : []}
      </Transition>
    )
  }
}
