import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-spring'

const ANIMATIONS = {
  'left': {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
  },
  'right': {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
  },
  'top': {
    from: { transform: 'translateY(-100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-100%)' },
  },
  'bottom': {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
  },
}

export default class Animation extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isShown: PropTypes.bool,
    className: PropTypes.string,
    from: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  }

  static defaultProps = {
    className: '',
    from: 'top',
  }

  renderChildren = style => (
    <div className={this.props.className}
      style={style}>
      {this.props.children}
    </div>
  )

  render() {
    const { isShown, from } = this.props
    const style = ANIMATIONS[from]

    return (
      <Transition
        keys={isShown ? ['children'] : []}
        {...style}
      >
        {isShown ? [this.renderChildren] : []}
      </Transition>
    )
  }
}
