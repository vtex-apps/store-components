import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ImageZoomPropTypes } from '../constants/propTypes'

/**
 * Zoom level
 */
const ZOOM_LEVEL = 2

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

  constructor(props) {
    super(props)
    this.contentDiv = React.createRef()
  }

  getScale = () => {
    const scale = {
      width: 1,
      height: 1,
    }

    if (this.contentDiv.current) {
      const { offsetWidth, offsetHeight } = this.contentDiv.current
      scale.width = offsetWidth * ZOOM_LEVEL
      scale.height = offsetHeight * ZOOM_LEVEL
    }

    return scale
  }

  render() {
    const scaleConfig = this.getScale()
    const { position, onMouseLeaveZoom, children } = this.props
    const zoomStyle = {
      left: `${-position.x}px`,
      top: `${-position.y}px`,
      cursor: 'zoom-in',
      width: scaleConfig.width,
      height: scaleConfig.height,
    }

    return (
      <div className="bg-white" ref={this.contentDiv}>
        <div
          className="vtex-product-image__zoom relative overflow-hidden"
          onMouseLeave={onMouseLeaveZoom}
        >
          <div
            className="vtex-product-image__zoom-image absolute ph8 flex justify-center items-center"
            style={zoomStyle}
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
}
