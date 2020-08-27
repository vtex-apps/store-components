import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import Carousel from './components/Carousel'
import {
  THUMBS_ORIENTATION,
  THUMBS_POSITION_HORIZONTAL,
  DEFAULT_EXCLUDE_IMAGE_WITH,
} from './utils/enums'

const CSS_HANDLES = ['content', 'productImagesContainer']

type OwnProps = {
  position?: any // TODO: PropTypes.oneOf([ THUMBS_POSITION_HORIZONTAL.LEFT, THUMBS_POSITION_HORIZONTAL.RIGHT, ])
  ModalZoomElement?: any
  thumbnailsOrientation?: any // TODO: PropTypes.oneOf([ THUMBS_ORIENTATION.VERTICAL, THUMBS_ORIENTATION.HORIZONTAL, ])
  hiddenImages?: string | string[]
  images?: Array<{
    imageUrls?: string[]
    thresholds?: number[]
    thumbnailUrl?: string
    imageText?: string
  }>
  videos?: Array<{
    videoUrl?: string
  }>
  zoomProps?: {
    zoomType?: string
  }
  displayThumbnailsArrows?: boolean
  aspectRatio?: string
  maxHeight?: number
  thumbnailAspectRatio?: string
  thumbnailMaxHeight?: number
  showNavigationArrows?: boolean
  showPaginationDots?: boolean
  contentOrder?: 'images-first' | 'videos-first'
  zoomMode?: 'disabled' | 'open-modal' | 'in-place-click' | 'in-place-hover'
  zoomFactor?: number
  contentType?: 'all' | 'images' | 'videos'
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ProductImages.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'ProductImages' implicitly has type 'any' because ... Remove this comment to see the full error message
const ProductImages = ({
  position,
  displayThumbnailsArrows,
  hiddenImages,
  images: allImages,
  videos: allVideos,
  thumbnailsOrientation,
  aspectRatio,
  maxHeight,
  thumbnailAspectRatio,
  thumbnailMaxHeight,
  showNavigationArrows,
  showPaginationDots,
  contentOrder = 'images-first',
  zoomMode,
  zoomFactor,
  ModalZoomElement,
  contentType = 'all',
  // Deprecated
  zoomProps,
}: Props) => {
  if (hiddenImages && !Array.isArray(hiddenImages)) {
    hiddenImages = [hiddenImages]
  }

  const excludeImageRegexes =
    hiddenImages && hiddenImages.map((text: any) => new RegExp(text, 'i'))

  const handles = useCssHandles(CSS_HANDLES)

  const shouldIncludeImages = contentType !== 'videos'
  const images = shouldIncludeImages
    ? allImages
        .filter(
          (image: any) =>
            !image.imageLabel ||
            !excludeImageRegexes.some((regex: any) =>
              regex.test(image.imageLabel)
            )
        )
        .map((image: any) => ({
          type: 'image',
          url: image.imageUrls ? image.imageUrls[0] : image.imageUrl,
          alt: image.imageText,
          thumbUrl: image.thumbnailUrl || image.imageUrl,
        }))
    : []

  const shouldIncludeVideos = contentType !== 'images'
  const videos = shouldIncludeVideos
    ? allVideos.map((video: any) => ({
        type: 'video',
        src: video.videoUrl,
        thumbWidth: 300,
      }))
    : []

  const showVideosFirst = contentOrder === 'videos-first'

  const slides = useMemo(() => {
    return showVideosFirst ? [...videos, ...images] : [...images, ...videos]
  }, [showVideosFirst, videos, images])

  return (
    <div
      className={`${handles.productImagesContainer} ${handles.content} w-100`}
    >
      <Carousel
        // @ts-expect-error ts-migrate(2322) FIXME: Property 'slides' does not exist on type 'Intrinsi... Remove this comment to see the full error message
        slides={slides}
        position={position}
        zoomMode={zoomMode}
        maxHeight={maxHeight}
        zoomFactor={zoomFactor}
        aspectRatio={aspectRatio}
        ModalZoomElement={ModalZoomElement}
        thumbnailMaxHeight={thumbnailMaxHeight}
        showPaginationDots={showPaginationDots}
        thumbnailAspectRatio={thumbnailAspectRatio}
        showNavigationArrows={showNavigationArrows}
        thumbnailsOrientation={thumbnailsOrientation}
        displayThumbnailsArrows={displayThumbnailsArrows}
        // Deprecated
        zoomProps={zoomProps}
      />
    </div>
  )
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
