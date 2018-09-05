import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-spring'

const ANIMATIONS = {
  drawerLeft: {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
  },
  drawerRight: {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
  },
  drawerTop: {
    from: { transform: 'translateY(-100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-100%)' },
  },
  drawerBottom: {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
  },
}

/**
 * Animation component
 */
export default class Animation extends Component {
  static propTypes = {
    /* Object to be animated */
    children: PropTypes.object.isRequired,
    /* Active the animation */
    isActive: PropTypes.bool,
    /* Classname to the animation */
    className: PropTypes.string,
    /* Type of animation */
    type: PropTypes.oneOf(['drawerLeft', 'drawerRight', 'drawerTop', 'drawerBottom']),
  }

  static defaultProps = {
    className: '',
    type: 'drawerLeft',
  }

  renderChildren = style => (
    <div className={this.props.className}
      style={style}
    >
      {this.props.children}
    </div>
  )

  render() {
    const { isActive, type } = this.props
    const style = ANIMATIONS[type]

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
