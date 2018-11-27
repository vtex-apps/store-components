import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** Image component with 1:1 aspect ratio */
export default function ImageResponsive({ src, className, alt, onMouseEnter }) {
  return (
    <div
      className={classNames(className, 'vtex-aspect-ratio w-100')}
      style={{ backgroundImage: `url(${src})` }}
      title={alt}
      onMouseEnter={onMouseEnter}
    />
  )
}

ImageResponsive.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Image alt */
  alt: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
  /** Function to be called when mouse enter the component */
  onMouseEnter: PropTypes.func,
}