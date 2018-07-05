import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ImageZoomPropTypes } from '../constants/propTypes'
import VTEXClasses from '../constants/productImagesClasses'

/**
 * Inner Zoom Component.
 */
export default class InnerZoom extends Component {
  static propTypes = {
    /* The object the will be zoomed */
    children: PropTypes.object,
    /* Mouse cursor coordinates */
    position: PropTypes.shape({
      /** Mouse cursor x-position */
      x: PropTypes.number,
      /** Mouse cursor y-position */
      y: PropTypes.number,
    }),
    /* Reused props */
    onMouseLeaveZoom: ImageZoomPropTypes.onMouseLeaveZoom,
  }

  static defaultProps = {
    position: {
      x: 0,
      y: 0,
    },
  }

  render() {
    const { position, onMouseLeaveZoom, children } = this.props

    const zoomStyle = {
      left: `${-position.x}px`,
      top: `${-position.y}px`,
      cursor: 'zoom-in',
    }

    return (
      <div className="bg-white">
        <div
          className={`${VTEXClasses.IMAGE_ZOOM} relative overflow-hidden`}
          onMouseLeave={onMouseLeaveZoom}
        >
          <div
            className={`${
              VTEXClasses.IMAGE_ZOOM_IMG
            } absolute ph8 flex justify-center items-center`}
            style={zoomStyle}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}
