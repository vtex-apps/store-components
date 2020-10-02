import React, { Component } from 'react'

import { ANIMATIONS } from './animation'

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
  static defaultProps = {
    className: '',
    type: 'drawerLeft',
    duration: ANIMATION_TIME,
    transfer: ANIMATION_TRANSFER,
    transferEnter: ANIMATION_TRANSFER_ENTER,
  }

  get animation() {
    const { isActive, type, duration, transfer, transferEnter } = this.props
    let animation = ANIMATIONS[type]

    if (isActive) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ transform: string; transition: string; }' ... Remove this comment to see the full error message
      animation = animation.from(duration, transferEnter)
    } else {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ transform: string; transition: string; }' ... Remove this comment to see the full error message
      animation = animation.leave(duration, transfer)
    }

    return animation
  }

  render() {
    const { className, children } = this.props

    return (
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ from: (duration: any, transfer: any) => { ... Remove this comment to see the full error message
      <div className={className} style={this.animation}>
        {children}
      </div>
    )
  }
}
