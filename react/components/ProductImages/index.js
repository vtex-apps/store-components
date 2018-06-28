import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailSlider from './components/ThumbnailSlider'
import SelectedImage from './components/SelectedImage'

import VTEXClasses from './constants/productImagesClasses'
import { VERTICAL, HORIZONTAL } from './constants/orientation'

import './global.css'

const DEFAULT_SELECTED_IMAGE = 0

/**
 *  Product Image component.
 *  Display a list of thumbnail images in a slider and a main image of a product.
 */
class ProductImages extends Component {
  state = {
    selectedImage: this.props.images[DEFAULT_SELECTED_IMAGE],
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.images) {
      const isNewProps =
        nextProps.images[DEFAULT_SELECTED_IMAGE].imageId !== state.firstImageId

      return {
        selectedImage:
          state.selectedImage && !isNewProps
            ? state.selectedImage
            : nextProps.images[DEFAULT_SELECTED_IMAGE],
        firstImageId: nextProps.images[DEFAULT_SELECTED_IMAGE].imageId,
      }
    }
  }

  /**
   * Function that changes the selected image
   */
  handleThumbnailClick = image => {
    this.setState({
      selectedImage: image,
    })
  }

  render() {
    const {
      images,
      thumbnailSliderOrientation,
      thumbnailMaxVisibleItems,
    } = this.props

    const thumbnailProps = {
      images,
      onThumbnailClick: this.handleThumbnailClick,
      orientation: thumbnailSliderOrientation,
      maxVisibleItems: thumbnailMaxVisibleItems,
    }

    let className = `${
      VTEXClasses.MAIN_CLASS
    } mb7 mb0-ns w-80 flex inline-flex-ns`
    if (thumbnailSliderOrientation === VERTICAL) {
      className += ` ${VTEXClasses.VERTICAL_COMPONENT}`
    } else {
      className += ` ${VTEXClasses.HORIZONTAL_COMPONENT} flex-column-reverse`
    }

    return (
      <div className={className}>
        <div
          className={thumbnailSliderOrientation === VERTICAL ? 'w-20-ns' : null}
        >
          <ThumbnailSlider {...thumbnailProps} />
        </div>
        <div
          className={thumbnailSliderOrientation === VERTICAL ? 'w-80-ns' : null}
        >
          <SelectedImage image={this.state.selectedImage} />
        </div>
      </div>
    )
  }
}

ProductImages.propTypes = {
  /** Array of images to be passed for the Thumbnail Slider component as a props */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** URL of the image */
      imageUrl: PropTypes.string.isRequired,
      /** Text that describes the image */
      imageText: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Thumbnail Slider orientation */
  thumbnailSliderOrientation: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /** Maximum number of visible items that should be displayed by the Thumbnail Slider at the same time */
  thumbnailMaxVisibleItems: PropTypes.number,
}

ProductImages.defaultProps = {
  images: [
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro1.png',
      imageText: '',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro2.png',
      imageText: '',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro3.png',
      imageText: '',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro4.png',
      imageText: '',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro5.png',
      imageText: '',
    },
    {
      imageUrl:
        'https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image/resources/images/500x500-img-pro6.png',
      imageText: '',
    },
  ],
  thumbnailSliderOrientation: VERTICAL,
}

export default ProductImages
