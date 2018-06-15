import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Plus Icon component in svg
 */
export default class LessIcon extends Component {
    static propTypes = {
      /* Percentage size of the icon */
      size: PropTypes.number,
      /* Fill color for the icon */
      fillColor: PropTypes.string,
    }

    static defaultProps = {
      size: 20,
      fillColor: '#999999',
    }

    render() {
      const { size, fillColor } = this.props
      return (
        <svg width={size} height={size} viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.101 50.8137C40.5162 50.8137 52.2021 39.4387 52.2021 25.4069C52.2021 11.375 40.5162 -1.85368e-06 26.101 0C11.6858 7.21363e-06 8.17289e-06 11.375 0 25.4069C2.59352e-06 39.4387 11.6858 50.8137 26.101 50.8137ZM19.1784 36.6015L14.5643 32.1102L21.4616 25.3964L14.5643 18.6826L19.1784 14.1913L26.0756 20.905L32.9729 14.1912L37.5869 18.6826L30.6897 25.3964L37.5869 32.1102L32.9729 36.6016L26.0756 29.8877L19.1784 36.6015Z"
            transform="translate(0 36.0081) scale(0.997842 -1.00215) rotate(-45)"
            fill={fillColor} />
        </svg>
      )
    }
}
