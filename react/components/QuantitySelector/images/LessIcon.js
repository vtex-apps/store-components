import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Less Icon component in svg
 */
export default class LessIcon extends Component {
    static propTypes = {
      /* Percentage size of the icon */
      size: PropTypes.number,
      /* Fill color for the icon */
      fillColor: PropTypes.string,
    }

    static defaultProps = {
      size: 14,
      fillColor: '#999999',
    }

    render() {
      const { size, fillColor } = this.props
      return (
        <svg width={size} height={size} viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.0447 50.9231C40.4288 50.9231 52.0894 39.5236 52.0894 25.4616C52.0894 11.3995 40.4288 0 26.0447 0C11.6606 0 0 11.3995 0 25.4616C0 39.5236 11.6606 50.9231 26.0447 50.9231ZM38.9107 28.692V22.3267H12.9333V28.692H38.9107Z"
            transform="translate(0 50.9231) scale(1 -1)"
            fill={fillColor} />
        </svg>
      )
    }
}
