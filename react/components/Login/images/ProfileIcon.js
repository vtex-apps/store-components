import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Profile icon component in svg
 */
export default class ProfileIcon extends Component {
  static propTypes = {
    /* Percentage size of the icon */
    size: PropTypes.number,
    /* Fill color for the icon */
    fillColor: PropTypes.string,
  }

  static defaultProps = {
    size: 20,
  }

  render() {
    const { size } = this.props
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 6.66667C13.3333 10.3486 10.3486 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667Z"
          transform="translate(15.333 10)"
          stroke="#4F4F4F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.416 8.32156C25.2235 5.82988 23.3506 3.72634 21.0134 2.25385C18.6763 0.781363 15.9703 -5.20651e-07 13.208 -5.20651e-07C10.4457 -5.20651e-07 7.7397 0.781363 5.40256 2.25385C3.06542 3.72634 1.19247 5.82988 -1.83105e-07 8.32156"
          transform="translate(8.79199 28.6678)"
          stroke="#4F4F4F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z"
          transform="translate(2 2)"
          stroke="#4F4F4F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
}
