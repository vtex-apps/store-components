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
    size: 16,
    fillColor: '#C4C4C4',
  }

  render() {
    const { size, fillColor } = this.props
    return (
      <svg width={size} height={size} viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.4926 53.1046C41.1241 53.1046 52.9852 41.2167 52.9852 26.5523C52.9852 11.8879 41.1241 0 26.4926 0C11.8611 0 0 11.8879 0 26.5523C0 41.2167 11.8611 53.1046 26.4926 53.1046ZM39.7769 23.2808H13.2084V29.8237H39.7769V23.2808Z"
          transform="translate(0.0147705 53.2477) scale(1 -1)"
          fill={fillColor} />
      </svg>
    )
  }
}
