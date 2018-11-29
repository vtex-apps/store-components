import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ImageZoomPropTypes } from '../constants/propTypes'

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
    this.imageZoomed = React.createRef()
    this.contentDiv = React.createRef()
  }

  getScale = () => {
    const scale = {
      x: 1,
      y: 1,
    }

    if (this.contentDiv.current && this.imageZoomed.current) {
      const { offsetWidth, offsetHeight } = this.contentDiv.current
      scale.x = (offsetWidth / this.imageZoomed.current.offsetWidth)
      scale.y = (offsetHeight / this.imageZoomed.current.offsetHeight)
    }

    return scale
  }

  render() {
    const scaleConfig = this.getScale()
    const { position, onMouseLeaveZoom, children } = this.props
    const zoomStyle = {
      left: `${-position.x / scaleConfig.x}px`,
      top: `${-position.y / scaleConfig.y}px`,
      cursor: 'zoom-in',
    }

    return (
      <div className="bg-white" ref={this.contentDiv}>
        <div
          className="vtex-product-image__zoom relative overflow-hidden"
          onMouseLeave={onMouseLeaveZoom}
        >
          <div
            ref={this.imageZoomed}
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
