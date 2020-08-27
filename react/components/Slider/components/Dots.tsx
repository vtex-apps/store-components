import React, { Component } from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  customClass?: string
  style?: any
  dots: React.ReactNode
  cssClass: string
}

/**
 * Dots component. It's an overriden component of react-slick that controls
 * the slide transition;
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Dots extends Component<Props> {
  render() {
    const { className, style, dots, cssClass, customClass } = this.props
    const dotsClasses = classNames([className, cssClass, customClass])

    return (
      <div className={dotsClasses}>
        <ul className="ma0 pa0" style={{ ...style }}>
          {dots}
        </ul>
      </div>
    )
  }
}
