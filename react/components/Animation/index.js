import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ANIMATIONS } from './animation'

/**
 * Animation component
 */
export default class Animation extends Component {
  static propTypes = {
    /* Object to be animated */
    children: PropTypes.node.isRequired,
    /* Active the animation */
    isActive: PropTypes.bool,
    /* Classname to the animation */
    className: PropTypes.string,
    /* Type of animation */
    type: PropTypes.oneOf(['drawerLeft', 'drawerRight', 'drawerTop', 'drawerBottom']),
    /* The animation's duration in seconds */
    duration: PropTypes.number,
    /* The animation's deslocation in percentage */
    transfer: PropTypes.number,
  }

  static defaultProps = {
    className: '',
    type: 'drawerLeft',
    duration: 0.4,
    transfer: 110,
  }

  render() {
    const { isActive, type, className, children, duration, transfer } = this.props
    const style = ANIMATIONS[type][isActive ? 'from' : 'leave'](duration, transfer)

    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
}
