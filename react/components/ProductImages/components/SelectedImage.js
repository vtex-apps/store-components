import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ImageZoom from './ImageZoom'

/**
 * Selected Image component.
 * Display an image.
 */
export default class SelectedImage extends Component {
  static propTypes = {
    /** Image to be displayed */
    image: PropTypes.shape({
      /** URL of the image */
      imageUrl: PropTypes.string.isRequired,
      /** Text that describes the image */
      imageText: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    children: img => img,
  }

  state = {
    showZoom: false,
    dimensions: {},
  }

  handleMouseEnterImage = () => {
    this.setState({ showZoom: true })
  }

  handleMouseLeaveZoom = () => {
    this.setState({ showZoom: false })
  }

  handleImageLoad = ({ target: img }) => {
    this.setState({
      dimensions : { 
        height: img.offsetHeight,
        width: img.offsetWidth
      }
    })
  }

  stripUrl = url => url.replace(/^https?:/, '')

  render() {
    const {
      image: { imageUrl, imageText },
    } = this.props
    const {
      showZoom,
      dimensions,
     } = this.state

    const classNamesImage = classNames('', {
      'h-100 w-auto': dimensions && dimensions.height > dimensions.width,
      'h-auto w-100': !dimensions || dimensions.height <= dimensions.width,
    })

    return (
      <div className="w-100 relative overflow-hidden">
        <div
          className="vtex-product-image__selected-image flex items-center justify-center"
          onMouseEnter={this.handleMouseEnterImage}
          >
          <img
            className={classNamesImage}
            src={this.stripUrl(imageUrl)}
            alt={imageText}
            onLoad={e => this.handleImageLoad(e)}
          />
        </div>
        <div className="vtex-product-image__image-zoom-container absolute">
          {showZoom && (
            <ImageZoom
              src={this.stripUrl(imageUrl)}
              alt={imageText}
              onMouseLeaveZoom={this.handleMouseLeaveZoom}
            />
          )}
        </div>
      </div>
    )
  }
}
