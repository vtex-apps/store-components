import React from 'react'
import { PropTypes } from 'prop-types'

const IconDeny = ({ color = 'white', size = 20 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <rect width="16" height="16" fill="transparent" />
        <rect width="18.5133" height="18.5133" fill="black" fillOpacity="0" transform="translate(8.09082 -5) rotate(45)" />
        <rect width="18.5133" height="18.5133" fill="black" fillOpacity="0" transform="translate(8.09082 -5) rotate(45)" />
        <path d="M14.6361 1.54535L1.54523 14.6362" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.54553 1.54535L14.6364 14.6362" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

IconDeny.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default IconDeny
