import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overriden component of react-slick that controls
 * the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, style, onClick, isLeftArrow } = this.props

    return (
      <div
        className={`${className} ${
          isLeftArrow ? 'vtex-arrow__left' : 'vtex-arrow__right'
        }`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** Css class of the element. */
  className: PropTypes.string,
  /** Custom style of the element. */
  style: PropTypes.object,
  /** Function to be called when the arrow is clicked. */
  onClick: PropTypes.func,
  /** Specifies wich css class the arrow will receive. */
  isLeftArrow: PropTypes.bool.isRequired,
}

export default Arrow
