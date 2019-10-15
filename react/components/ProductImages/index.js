import PropTypes from 'prop-types'
import React, { useMemo, useEffect, useState } from 'react'
import debounce from 'debounce'

import Carousel from './components/Carousel'
import styles from './styles.css'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
  DEFAULT_EXCLUDE_IMAGE_WITH,
} from './utils/enums'

const getBestUrlIndex = thresholds => {
  const windowSize = window.innerWidth

  let bestUrlIndex = 0

  thresholds.forEach((threshold, i) => {
    if (windowSize > threshold) bestUrlIndex = i + 1
  })

  return bestUrlIndex
}

const ProductImages = ({
  videos,
  position,
  zoomProps,
  hiddenImages,
  images: allImages,
  thumbnailsOrientation,
  displayThumbnailsArrows,
}) => {
  const [, setState] = useState(0)

  if (!Array.isArray(hiddenImages)) {
    hiddenImages = [hiddenImages]
  }

  const excludeImageRegexes = hiddenImages.map(text => new RegExp(text, 'i'))

  const images = allImages.filter(image => {
    if (!image.imageText) {
      return true
    }
    return !excludeImageRegexes.some(regex => regex.test(image.imageText))
  })

  const debouncedGetBestUrl = debounce(() => {
    // force update
    setState(c => c + 1)
  }, 500)

  useEffect(() => {
    window.addEventListener('resize', debouncedGetBestUrl)

    return () => {
      window.removeEventListener('resize', debouncedGetBestUrl)

      debouncedGetBestUrl.clear()
    }
  }, [debouncedGetBestUrl])

  const slides = useMemo(() => {
    if (!images.length && !videos.length) return

    return [
      ...images.map(image => ({
        type: 'image',
        urls: image.imageUrls,
        alt: image.imageText,
        thumbUrl: image.thumbnailUrl || image.imageUrls[0],
        bestUrlIndex: getBestUrlIndex(image.thresholds),
      })),
      ...videos.map(video => ({
        type: 'video',
        src: video.videoUrl,
        thumbWidth: 300,
      })),
    ]
  }, [images, videos])

  return (
    <div className={`${styles.content} w-100`}>
      <Carousel
        slides={slides}
        position={position}
        zoomProps={zoomProps}
        thumbnailsOrientation={thumbnailsOrientation}
        displayThumbnailsArrows={displayThumbnailsArrows}
      />
    </div>
  )
}

ProductImages.propTypes = {
  /** The position of the thumbs */
  position: PropTypes.oneOf([
    THUMBS_POSITION_HORIZONTAL.LEFT,
    THUMBS_POSITION_HORIZONTAL.RIGHT,
  ]),
  thumbnailsOrientation: PropTypes.oneOf([
    THUMBS_ORIENTATION.VERTICAL,
    THUMBS_ORIENTATION.HORIZONTAL,
  ]),
  /** This is a necessary prop if you're using SKUSelector to display color images
   * (like a image with only green to represent an SKU of something green) and you
   * want to not display this image in the ProductImages component, to do this you
   * just have to upload the image in the catalog with the value of this prop inside the imageText property */
  hiddenImages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
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
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      videoUrl: PropTypes.string,
    })
  ),
  zoomProps: PropTypes.shape({
    zoomType: PropTypes.string,
  }),
  displayThumbnailsArrows: PropTypes.bool,
}

ProductImages.defaultProps = {
  images: [],
  position: THUMBS_POSITION_HORIZONTAL.LEFT,
  zoomProps: { zoomType: 'in-page' },
  thumbnailsOrientation: THUMBS_ORIENTATION.VERTICAL,
  displayThumbnailsArrows: false,
  hiddenImages: DEFAULT_EXCLUDE_IMAGE_WITH,
}

export default ProductImages
