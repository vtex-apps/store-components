import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Carousel from './components/Carousel'


class ProductImages extends Component {
  render() {
    const {images} = this.props

    if(images.length === 0) return null

    const slides = images.map(image => {
      return {
        type: 'image',
        urls: image.imageUrls,
        thresholds: image.thresholds || [],
        thumbUrl: image.thumbnailUrl || image.imageUrls[0],
        alt: image.imageText,
      }})

    return (
      <div className="w-100">
        <Carousel slides={slides}/>
      </div>)
  }
}

ProductImages.propTypes = {
  /** Array of images to be passed for the Thumbnail Slider component as a props */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** URL of the image */
      imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired),
      /** Size thresholds used to choose each image */
      thresholds: PropTypes.arrayOf(PropTypes.number),
      /** URL of the image thumbnail */
      thumbnailUrl: PropTypes.string,
      /** Text that describes the image */
      imageText: PropTypes.string.isRequired,
    })
  ),
}

ProductImages.defaultProps = {
  images: []
}

export default ProductImages
