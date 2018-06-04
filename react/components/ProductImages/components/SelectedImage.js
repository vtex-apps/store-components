import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageZoom from './ImageZoom'

import VTEXClasses from '../constants/productImagesClasses'

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

  state = {
    showZoom: false,
  }

  handleMouseEnterImage = () => {
    this.setState({ showZoom: true })
  }

  handleMouseLeaveZoom = () => {
    this.setState({ showZoom: false })
  }

  render() {
    const { imageUrl, imageText } = this.props.image
    const { showZoom } = this.state

    return (
      <div>
        <div className="relative">
          <div
            className={`${
              VTEXClasses.SELECTED_IMAGE
            } flex-ns justify-center-ns items-center-ns dn`}>
            <div className="flex justify-center items-center">
              <img onMouseEnter={this.handleMouseEnterImage} src={imageUrl} alt={imageText} />
            </div>
          </div>
          <div className="vtex-product-image__image-zoom-container absolute">
            {showZoom &&
              <ImageZoom src={imageUrl} alt={imageText} onMouseLeaveZoom={this.handleMouseLeaveZoom} />
            }
          </div>
        </div>
      </div>
    )
  }
}

