import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Dots component. It's an overriden component of react-slick that controls
 * the slide transition;
 */
export class Dots extends Component {
  render() {
    const { className, style, dots } = this.props

    return (
      <div className={`${className} vtex-dots`}>
        <ul className="ma0 pa0" style={{ ...style }}>
          {dots}
        </ul>
      </div>
    )
  }
}

Dots.propTypes = {
  /** Css class of the element. */
  className: PropTypes.string,
  /** Custom style of the element. */
  style: PropTypes.object,
  /** Dots that will be displayed */
  dots: PropTypes.node.isRequired,
}
