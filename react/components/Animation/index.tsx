import React, { Component } from 'react'

import { ANIMATIONS, AnimationProperties } from './animation'

const ANIMATION_TRANSFER = 110
const ANIMATION_TRANSFER_ENTER = 0
const ANIMATION_TIME = 0.4

type OwnProps = {
  isActive?: boolean
  className?: string
  type?: 'drawerLeft' | 'drawerRight' | 'drawerTop' | 'drawerBottom'
  duration?: number
  transfer?: number
  transferEnter?: number
}

type Props = OwnProps & typeof Animation.defaultProps

/**
 * Animation component
 */
export default class Animation extends Component<Props> {
  public static defaultProps = {
    className: '',
    type: 'drawerLeft',
    duration: ANIMATION_TIME,
    transfer: ANIMATION_TRANSFER,
    transferEnter: ANIMATION_TRANSFER_ENTER,
  }

  public get animation() {
    const { isActive, type, duration, transfer, transferEnter } = this.props
    const animation = ANIMATIONS[type]
    let animationProps: AnimationProperties

    if (isActive) {
      animationProps = animation.from(duration, transferEnter)
    } else {
      animationProps = animation.leave(duration, transfer)
    }

    return animationProps
  }

  public render() {
    const { className, children } = this.props

    return (
      <div className={className} style={this.animation}>
        {children}
      </div>
    )
  }
}
