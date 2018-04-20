import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overriden component of react-slick that controls
 * the slide transition.
 */
export class Arrow extends Component {
  render() {
    const { className, style, onClick, arrowClass } = this.props

    return (
      <div
        className={`${className} ${arrowClass}`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** (react-slick prop) Css class of the element. */
  className: PropTypes.string,
  /** (react-slick prop) Custom style of the element. */
  style: PropTypes.object,
  /** (react-slick prop) Function to be called when the arrow is clicked. */
  onClick: PropTypes.func,
  /** Specifies wich css class the arrow will receive. */
  arrowClass: PropTypes.string.isRequired,
}
