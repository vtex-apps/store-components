import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

import SelectedImage from './components/SelectedImage'
import ThumbnailSlider from './components/ThumbnailSlider'
import { HORIZONTAL, VERTICAL } from './constants/orientation'

const DEFAULT_SELECTED_IMAGE = 0

/**
 *  Product Image component.
 *  Display a list of thumbnail images in a slider and a main image of a product.
 */
class ProductImages extends Component {
  state = {
    selectedImage:
      this.props.images && this.props.images[DEFAULT_SELECTED_IMAGE],
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

    return null
  }

  static Loader = (loaderProps = {}) => {
    const styles = {
      'vtex-product-image__selected-image--loader': {
        x: '10%',
        y: '5%',
        width: '80%',
        height: '75%',
        ...loaderProps['vtex-product-image__selected-image--loader'],
      },
      'vtex-product-image__thumbnail-slider--loader': {
        x: '10%',
        y: '85%',
        width: '80%',
        height: '10%',
        ...loaderProps['vtex-product-image__thumbnail-slider--loader'],
      },
      'vtex-product-image__selected-image-vertical--loader': {
        x: '20%',
        y: '5%',
        width: '80%',
        height: '90%',
        ...loaderProps['vtex-product-image__selected-image-vertical--loader'],
      },
      'vtex-product-image__thumbnail-slider-vertical--loader': {
        y: '5%',
        width: '15%',
        height: '90%',
        ...loaderProps['vtex-product-image__thumbnail-slider-vertical--loader'],
      },
    }

    return loaderProps.isVertical ? (
      <div className="vtex-product-image vtex-product-image-loader vtex-product-image__vertical vtex-product-image__vertical--loader">
        <ContentLoader
          style={{
            width: '100%',
            height: '100%',
          }}
          height="100%"
          width="100%">
          <rect
            {...styles['vtex-product-image__selected-image-vertical--loader']}
          />
          <rect
            {...styles['vtex-product-image__thumbnail-slider-vertical--loader']}
          />
        </ContentLoader>
      </div>
    ) : (
      <div className="vtex-product-image vtex-product-image-loader vtex-product-image__horizontal vtex-product-image__horizontal--loader">
        <ContentLoader
          style={{
            width: '100%',
            height: '100%',
          }}
          height="100%"
          width="100%">
          <rect {...styles['vtex-product-image__selected-image--loader']} />
          <rect {...styles['vtex-product-image__thumbnail-slider--loader']} />
        </ContentLoader>
      </div>
    )
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

    const isVertical = thumbnailSliderOrientation === VERTICAL

    let className = 'vtex-product-image mb7 mb0-ns flex inline-flex-ns w-100 h-100'

    if (isVertical) {
      className += ' vtex-product-image__vertical'
    } else {
      className += ' vtex-product-image__horizontal flex-column-reverse'
    }

    if (!images) {
      return (
        <ProductImages.Loader {...this.props.styles} isVertical={isVertical} />
      )
    }

    return (
      <div className={className}>
        <div
          className={
            isVertical ? 'w-100-s w-20-ns flex justify-center' : 'w-100-s'
          }>
          <ThumbnailSlider {...thumbnailProps} />
        </div>
        <div
          className={
            isVertical ? 'w-80-ns flex justify-center overflow-hidden' : null
          }>
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
  ),
  /** Thumbnail Slider orientation */
  thumbnailSliderOrientation: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /** Maximum number of visible items that should be displayed by the Thumbnail Slider at the same time */
  thumbnailMaxVisibleItems: PropTypes.number,
  /** Component and content loader styles */
  styles: PropTypes.object,
}

ProductImages.defaultProps = {
  thumbnailSliderOrientation: VERTICAL,
}

export default ProductImages
