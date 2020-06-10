import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * Arrow component. It's an overriden component of react-slick that controls
 * the slide transition.
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Arrow extends Component {
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

Arrow.propTypes = {
  /** (react-slick prop) Css class of the element. */
  className: PropTypes.string,
  /** (react-slick prop) Custom style of the element. */
  style: PropTypes.object,
  /** (react-slick prop) Function to be called when the arrow is clicked. */
  onClick: PropTypes.func,
  /** Specifies wich css class the arrow will receive. */
  cssClass: PropTypes.string.isRequired,
  /** Custom classes */
  customClasses: PropTypes.string,
}
