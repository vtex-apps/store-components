import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailSlider from './components/ThumbnailSlider'
import SelectedImage from './components/SelectedImage'

import VTEXClasses from './constants/productImagesClasses'
import { NoSSR } from 'render'
import { VERTICAL, HORIZONTAL } from './constants/orientation'

import ContentLoader from 'react-content-loader'

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

    return null
  }

  /**
   * Function that changes the selected image
   */
  handleThumbnailClick = image => {
    this.setState({
      selectedImage: image,
    })
  }

  renderLoader() {
    const { thumbnailSliderOrientation } = this.props

    const isVertical = thumbnailSliderOrientation === VERTICAL

    return <ProductImages.Loader isVertical={isVertical} />
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

    let className = `${
      VTEXClasses.MAIN_CLASS
    } mb7 mb0-ns flex inline-flex-ns w-100-s`

    if (isVertical) {
      className += ` ${VTEXClasses.VERTICAL_COMPONENT}`
    } else {
      className += ` ${VTEXClasses.HORIZONTAL_COMPONENT} flex-column-reverse`
    }

    return (
      <NoSSR onSSR={this.renderLoader()}>
        <div className={className}>
          <div
            className={
              isVertical ? 'w-100-s w-20-ns flex justify-center' : 'w-100-s'
            }
          >
            <ThumbnailSlider {...thumbnailProps} />
          </div>
          <div
            className={
              isVertical ? 'w-80-ns flex justify-center overflow-hidden' : null
            }
          >
            <SelectedImage image={this.state.selectedImage} />
          </div>
        </div>
      </NoSSR>
    )
  }
}

ProductImages.Loader = props => {
  const { isVertical } = props

  const uniquekey = 'vtex-product-image-loader'
  if (isVertical) {
    return (
      <div className="vtex-product-image mb7 mb0-ns flex inline-flex-ns w-100-s vtex-product-image__vertical">
        <ContentLoader uniquekey={uniquekey} height={500} width={500}>
          <rect x="21.6" y="0" rx="0" ry="0" width="45" height="280" />
          <rect x="73.6" y="0" rx="0" ry="0" width="316.52" height="280" />
        </ContentLoader>
      </div>
    )
  }

  return (
    <div className="vtex-product-image mb7 mb0-ns flex inline-flex-ns w-100-s vtex-product-image__horizontal flex-column-reverse">
      <ContentLoader uniquekey={uniquekey} height={500} width={500}>
        <rect x="85" y="310" rx="0" ry="0" width="316.52" height="44.56" />
        <rect x="85" y="19" rx="0" ry="0" width="316.52" height="280.44" />
      </ContentLoader>
    </div>
  )
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
