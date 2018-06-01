import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ZoomImagePropTypes } from '../constants/propTypes'

export default class Zoom extends Component {
  render() {
    const { src, alt, position, onMouseLeaveZoom } = this.props

    const zoomStyle = {
      left: `${-position.x}px`,
      top: `${-position.y}px`,
      cursor: 'zoom-in',
    }

    return (
      <div>
        <div
          className="vtex-product-image__zoom relative overflow-hidden"
          onMouseLeave={onMouseLeaveZoom} >
          <div
            className="vtex-product-image__zoom-image absolute ph8 flex justify-center items-center"
            style={zoomStyle}>
            <img src={src} alt={alt} />
          </div>
        </div>
      </div>
    )
  }
}

Zoom.propTypes = {
/* Reused props */
  alt: ZoomImagePropTypes.alt,
  /* Reused props */
  src: ZoomImagePropTypes.src,
  /* Reused props */
  onMouseLeaveZoom: ZoomImagePropTypes.onMouseLeaveZoom,
  /** Mouse cursor coordinates */
  position: PropTypes.shape({
    /** x mouse cursor position */
    x: PropTypes.number.isRequired,
    /** y mouse cursor position */
    y: PropTypes.number.isRequired,
  }).isRequired,
}
