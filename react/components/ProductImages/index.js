import { arrayOf, shape, string, number, oneOf } from 'prop-types'
import React, { useMemo, useEffect, useState } from 'react'
import debounce from 'debounce'

import { defineMessages } from 'react-intl'

import Carousel from './components/Carousel'
import styles from './styles.css'

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
      <Carousel
        slides={slides}
        position={position}
        zoomProps={{
          zoomType: 'in-page',
          desktopTrigger: 'on-hover',
          bgOpacity: 0.8,
          zoomScale: 2,
        }}
      />
    </div>
  )
}

ProductImages.propTypes = {
  /** The position of the thumbs */
  position: oneOf(['left', 'right']),
  /** Array of images to be passed for the Thumbnail Slider component as a props */
  images: arrayOf(
    shape({
      /** URL of the image */
      imageUrls: arrayOf(string.isRequired),
      /** Size thresholds used to choose each image */
      thresholds: arrayOf(number),
      /** URL of the image thumbnail */
      thumbnailUrl: string,
      /** Text that describes the image */
      imageText: string,
    })
  ),
  zoomProps: {
    zoomType: string,
    zoomScale: number,
    bgOpacity: number,
    desktopTrigger: string,
  },
}

ProductImages.defaultProps = {
  images: [],
  position: 'left',
  zoomProps: {
    zoomType: 'in-page',
    desktopTrigger: 'on-click',
    bgOpacity: 0.8,
    zoomScale: 2,
  },
}

const messages = defineMessages({
  productImagesTitle: {
    id: 'admin/editor.product-images.title',
    defaultMessage: '',
  },
  productImagesDescription: {
    id: 'admin/editor.product-images.description',
    defaultMessage: '',
  },
  zoomTitle: {
    id: 'admin/editor.product-images.zoomOptions.title',
    defaultMessage: '',
  },
  zoomTypeTitle: {
    id: 'admin/editor.product-images.zoomType.title',
    defaultMessage: '',
  },
  gallery: {
    id: 'admin/editor.product-images.gallery',
    defaultMessage: '',
  },
  inPage: {
    id: 'admin/editor.product-images.in-page',
    defaultMessage: '',
  },
  noZoom: {
    id: 'admin/editor.product-images.no-zoom',
    defaultMessage: '',
  },
  bgOpacityTitle: {
    id: 'admin/editor.product-images.bgopacity.title',
    defaultMessage: '',
  },
  desktopTriggerTitle: {
    id: 'admin/editor.product-images.zoom.desktopTrigger.title',
    defaultMessage: '',
  },
  hover: {
    id: 'admin/editor.product-images.zoom.desktopTrigger.hover',
    defaultMessage: '',
  },
  click: {
    id: 'admin/editor.product-images.zoom.desktopTrigger.click',
    defaultMessage: '',
  },
  zoomScaleTitle: {
    id: 'admin/editor.product-images.zoom.zoomScale.title',
    defaultMessage: '',
  },
})

ProductImages.getSchema = ({ zoomProps: { zoomType } = {} }) => ({
  title: messages.productImagesTitle,
  description: messages.productImagesDescription,
  type: 'object',
  properties: {
    zoomProps: {
      title: messages.zoomTitle,
      type: 'object',
      properties: {
        zoomType: {
          title: messages.zoomTypeTitle,
          type: 'string',
          enum: ['gallery', 'in-page', 'no-zoom'],
          enumNames: [messages.gallery, messages.inPage, messages.noZoom],
          widget: {
            'ui:options': {
              inline: false,
            },
            'ui:widget': 'radio',
          },
          default: 'no-zoom',
        },
        bgOpacity: {
          title: messages.bgOpacityTitle,
          type: 'number',
          minimum: 0.0,
          maximum: 1.0,
          multipleOf: 0.01,
          default: 0.8,
        },
        ...(zoomType === 'in-page' && {
          desktopTrigger: {
            title: messages.desktopTriggerTitle,
            type: 'string',
            default: 'on-hover',
            enum: ['on-hover', 'on-click'],
            enumNames: [messages.hover, messages.click],
          },
          zoomScale: {
            title: messages.zoomScaleTitle,
            type: 'number',
            default: 2,
            minimum: 0.0,
            maximum: 1.0,
            multipleOf: 0.1,
          },
        }),
      },
    },
  },
})

export default ProductImages
