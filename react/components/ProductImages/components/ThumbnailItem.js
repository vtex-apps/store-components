import React, { Component } from 'react'
import PropTypes from 'prop-types'

import VTEXClasses from '../constants/productImagesClasses'

/**
 * Thumbnail Item Component.
 * Display a thumbnail image with an on click event well defined.
 */
class ThumbnailItem extends Component {
  /**
   * Function that is called when the thumbnail image is clicked
   */
  handleClick = event => {
    event.preventDefault()
    this.props.onClick(this.props.image)
  }

  render() {
    const { imageUrl, imageText } = this.props.image

    return (
      <img
        className="vtex-product-image__thumbnail-slider-item pointer"
        onClick={this.handleClick}
        src={imageUrl}
        alt={imageText}
      />
    )
  }
}

ThumbnailItem.propTypes = {
  /** Image to be displayed */
  image: PropTypes.shape({
    /** URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** Text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,
  /** Function that is called when the thumbnail image is clicked */
  onClick: PropTypes.func.isRequired,
}

export default ThumbnailItem
