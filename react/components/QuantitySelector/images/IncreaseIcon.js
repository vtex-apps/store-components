import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Increase Icon component in svg
 */
export default class IncreaseIcon extends Component {
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
      <svg width={size} height={size} viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.4867 53.1165C41.1148 53.1165 52.9733 41.226 52.9733 26.5583C52.9733 11.8905 41.1148 -4.84571e-06 26.4866 0C11.8585 4.84572e-06 -2.94351e-05 11.8906 0 26.5583C-1.37231e-05 41.226 11.8585 53.1165 26.4867 53.1165ZM38.121 19.3907L31.0373 26.4936L38.1209 33.5964L33.5058 38.224L26.4221 31.1212L19.3384 38.2241L14.7233 33.5965L21.8069 26.4936L14.7232 19.3907L19.3384 14.7631L26.4221 21.866L33.5058 14.7631L38.121 19.3907Z"
          transform="translate(-10 27.5506) scale(1.00022 -0.999775) rotate(-45)"
          fill={fillColor} />
      </svg>
    )
  }
}
