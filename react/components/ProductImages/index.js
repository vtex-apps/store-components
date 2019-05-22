import PropTypes from 'prop-types'
import React, { useMemo, useEffect, useState } from 'react'
import debounce from 'debounce'

import styles from './styles.css'
import { SliderNext } from 'vtex.slider'

const getBestUrlIndex = thresholds => {
  const windowSize = window.innerWidth

  let bestUrlIndex = 0

  thresholds.forEach((threshold, i) => {
    if (windowSize > threshold) bestUrlIndex = i + 1
  })

  return bestUrlIndex
}

const ProductImages = props => {
  const [_, setState] = useState(0)
  const { position, zoomProps } = props

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
    const { images } = props

    if (images.length === 0) return

    return images.map(image => {
      return {
        type: 'image',
        urls: image.imageUrls,
        alt: image.imageText,
        thumbUrl: image.thumbnailUrl || image.imageUrls[0],
        bestUrlIndex: getBestUrlIndex(image.thresholds),
      }
    })
  }, [props])

  return (
    <div className={`${styles.content} w-100`}>
      <SliderNext
        infinite={false}
        classNames={{
          sliderContainer: 'br4',
          dotList: 'bottom-1',
          thumbnail: 'br4 ma3',
        }}
        thumbnails={{
          items: slides.map((slide, i) => ({
            url: slide.thumbUrl,
            forSlide: i,
          })),
          position: 'left',
          width: '20%',
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="center-all">
            <img src={slide.urls[slide.bestUrlIndex]} />
          </div>
        ))}
      </SliderNext>
    </div>
  )
}

ProductImages.propTypes = {
  /** The position of the thumbs */
  position: PropTypes.oneOf(['left', 'right']),
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
  images: [],
  position: 'left',
  zoomProps: { zoomType: 'in-page' },
}

ProductImages.getSchema = ({ zoomProps: { zoomType } = {} }) => {
  return {
    title: 'admin/editor.product-images.title',
    description: 'admin/editor.product-images.description',
    type: 'object',
    properties: {
      zoomProps: {
        title: 'admin/editor.product-images.zoomOptions.title',
        type: 'object',
        properties: {
          zoomType: {
            title: 'admin/editor.product-images.zoomType.title',
            type: 'string',
            enum: ['gallery', 'in-page', 'no-zoom'],
            enumNames: [
              'admin/editor.product-images.gallery',
              'admin/editor.product-images.in-page',
              'admin/editor.product-images.no-zoom',
            ],
            widget: {
              'ui:options': {
                inline: false,
              },
              'ui:widget': 'radio',
            },
            default: 'no-zoom',
          },
          ...(zoomType === 'gallery' && {
            bgOpacity: {
              title: 'admin/editor.product-images.bgopacity.title',
              type: 'number',
              minimum: 0.0,
              maximum: 1.0,
              multipleOf: 0.01,
              default: 0.8,
            },
          }),
        },
      },
    },
  }
}

export default ProductImages
