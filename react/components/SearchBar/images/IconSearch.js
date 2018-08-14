import React from 'react'
import { PropTypes } from 'prop-types'

const IconSearch = ({ color = 'white', size = 20 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" fill="transparent" />
      <rect width="17.8048" height="18" fill={color} fillOpacity="0" transform="translate(1 1)" />
      <rect width="17.8048" height="18" fill={color} fillOpacity="0" transform="translate(1 1)" />
      <path d="M18.8046 18.9999L15.2437 15.3999" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.12187 15.4C12.0552 15.4 15.2437 12.1765 15.2437 8.20001C15.2437 4.22356 12.0552 1 8.12187 1C4.18857 1 1 4.22356 1 8.20001C1 12.1765 4.18857 15.4 8.12187 15.4Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

IconSearch.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
}

export default IconSearch
