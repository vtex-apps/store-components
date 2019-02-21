import React from 'react'

export const IconClose = ({ orientation, size, className }) => (
  <svg
    classNames={`${orientation}-oritentation-mock ${className}`}
    width={size}
    height={size}
  >
    <rect
      width={size}
      height={size}
      style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
    />
  </svg>
)

export const IconSearch = ({ orientation, size, className }) => (
  <svg
    classNames={`${orientation}-oritentation-mock ${className}`}
    width={size}
    height={size}
  >
    <rect
      width={size}
      height={size}
      style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
    />
  </svg>
)
