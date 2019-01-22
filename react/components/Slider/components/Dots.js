import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Dots component. It's an overriden component of react-slick that controls
 * the slide transition;
 */
export default class Dots extends Component {
  render() {
    const { className, style, dots, cssClass, dotsClasses } = this.props

    return (
      <div className={`${className} ${cssClass} ${dotsClasses}`}>
        <ul className="ma0 pa0" style={{ ...style }}>
          {dots}
        </ul>
      </div>
    )
  }
}

Dots.propTypes = {
  /** (react-slick prop) Css class of the element. */
  className: PropTypes.string,
  /** (react-slick prop) Custom style of the element. */
  style: PropTypes.object,
  /** (react-slick prop) Dots that will be displayed */
  dots: PropTypes.node.isRequired,
  /** Specifies wich css the dots will receive. */
  cssClass: PropTypes.string.isRequired,
}
