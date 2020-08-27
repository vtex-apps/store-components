import React, { Component } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  style?: any
  onClick?: (...args: any[]) => any
  cssClass: string
  customClasses?: string
}

/**
 * Arrow component. It's an overriden component of react-slick that controls
 * the slide transition.
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Arrow extends Component<Props> {
  render() {
    const { className, style, onClick, cssClass, customClasses } = this.props
    const arrowClasses = classNames({
      [`${className}`]: className,
      [`${cssClass}`]: cssClass,
      [`${customClasses}`]: customClasses,
    })

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={`${arrowClasses}`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}
