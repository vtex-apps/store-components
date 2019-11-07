import PropTypes from 'prop-types'
import React, { useMemo } from 'react'

import Carousel from './components/Carousel'
import styles from './styles.css'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
  DEFAULT_EXCLUDE_IMAGE_WITH,
} from './utils/enums'

const ProductImages = ({
  videos,
  position,
  displayThumbnailsArrows,
  hiddenImages,
  images: allImages,
  videos,
  thumbnailsOrientation,
  aspectRatio,
  maxHeight,
  zoomMode,
  zoomFactor,
  // Deprecated
  zoomProps,
}) => {
  const excludeImageRegexes = hiddenImages.map(text => new RegExp(text, 'i'))

  const images = allImages.filter(image => {
    if (!image.imageText) {
      return true
    }
    return !excludeImageRegexes.some(regex => regex.test(image.imageText))
  })

  const slides = useMemo(() => {
    if (!images.length && !videos.length) return []

    return [
      ...images.map(image => ({
        type: 'image',
        url: image.imageUrl,
        alt: image.imageText,
        thumbUrl: image.thumbnailUrl || image.imageUrl,
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
        displayThumbnailsArrows={displayThumbnailsArrows}
        thumbnailsOrientation={thumbnailsOrientation}
        aspectRatio={aspectRatio}
        maxHeight={maxHeight}
        zoomMode={zoomMode}
        zoomFactor={zoomFactor}
        // Deprecated
        zoomProps={zoomProps}
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
