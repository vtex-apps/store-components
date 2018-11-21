import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ThumbnailItem from './ThumbnailItem'
import ThumbnailArrow from './ThumbnailArrow'
import Slider from '../../../Slider'

import VTEXClasses from '../constants/productImagesClasses'

import { HORIZONTAL, VERTICAL } from '../constants/orientation'

const MAX_VISIBLE_ITEMS = 5

/**
 * Thumbnail component.
 * Display a slider with a list of thumbnail images.
 */
class ThumbnailSlider extends Component {
  /**
   * Function that configure slider settings according to the component props
   */
  get sliderSettings() {
    const { maxVisibleItems, orientation } = this.props
    const sliderVertical = orientation === VERTICAL

    const numOfVisibleItems = Math.min(maxVisibleItems, MAX_VISIBLE_ITEMS)

    return {
      speed: 500,
      infinite: false,
      dots: false,
      arrows: true,
      prevArrow: <ThumbnailArrow vertical={sliderVertical} />,
      nextArrow: <ThumbnailArrow inverted vertical={sliderVertical} />,
      slideWidth: 82,
      slidesToShow: numOfVisibleItems,
      vertical: sliderVertical,
      verticalSwiping: sliderVertical,
      /** Responsive slider behavior is defined here */
      responsive: [
        /** Should be rendered for all screens with width less than 600px */
        {
          breakpoint: 500,
          settings: {
            dots: true,
            arrows: false,
            vertical: false,
            verticalSwiping: false,
            slidesToShow: 1,
          },
        },
      ],
    }
  }

  render() {
    const { images, onThumbnailClick, orientation } = this.props

    const sliderVertical = orientation === VERTICAL

    const className = classNames(`${VTEXClasses.THUMBNAIL_SLIDER} w-100-s`, {
      'vtex-product-image__thumbnail-slider--vertical': sliderVertical,
      'mr6-ns': sliderVertical,
      mt3: !sliderVertical,
      'vtex-product-image__thumbnail-slider--horizontal': !sliderVertical,
    })

    return (
      <div className={className}>
        <Slider sliderSettings={this.sliderSettings}>
          {images.map(image => (
            <ThumbnailItem
              key={image.imageUrl}
              image={image}
              onClick={onThumbnailClick}
            />
          ))}
        </Slider>
      </div>
    )
  }
}

ThumbnailSlider.propTypes = {
  /** Array of images to be passed for the Thumbnail Slider component as a props */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** URL of the image */
      imageUrl: PropTypes.string.isRequired,
      /** Text that describes the image */
      imageText: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** Function that is called when a thumbnail is clicked */
  onThumbnailClick: PropTypes.func.isRequired,
  /** Slider orientation that could be vertical or horizontal */
  orientation: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /** Maximum number of items that could be displayed by the slider at the same time */
  maxVisibleItems: PropTypes.number,
}

ThumbnailSlider.defaultProps = {
  orientation: VERTICAL,
  maxVisibleItems: MAX_VISIBLE_ITEMS,
}

export default ThumbnailSlider
