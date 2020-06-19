import React, { useContext } from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import styles from '../styles.css'
import { imageUrl } from '../utils/aspectRatioUtil'
import ProductImageContext from './ProductImageContext'
import Zoomable, { ZoomMode as ZoomModeComplete } from './Zoomable'

// Same logic of the fixed values of ProductImages, but bigger values
const IMAGE_SIZES = [800, 1200, 1400]
const DEFAULT_SIZE = 1200
const MAX_SIZE = 4096

type AspectRatio = string | number
type ZoomMode = Exclude<ZoomModeComplete, 'open-modal'>

interface Props {
  zoomMode?: ZoomMode
  zoomFactor?: number
  aspectRatio?: AspectRatio
}

function validateZoomMode(zoomMode: ZoomModeComplete): ZoomMode {
  if (
    zoomMode !== 'disabled' &&
    zoomMode !== 'in-place-click' &&
    zoomMode !== 'in-place-hover'
  ) {
    console.warn(
      `You passed a wrong value to prop zoomMode \`${zoomMode}\` using 'disabled' instead`
    )
    return 'disabled'
  }

  return zoomMode
}

const CSS_HANDLES = [
  'imgZoom',
  'productImageTag',
  'highQualityContainer',
] as const

function HighQualityProductImage(props: Props) {
  const { zoomFactor = 2, aspectRatio = 'auto', zoomMode = 'disabled' } = props
  const handles = useCssHandles(CSS_HANDLES)
  const context = useContext(ProductImageContext)

  if (!context) {
    console.warn(
      "You're using a HighQualityProductImage out of a ProductImageContext"
    )
    return null
  }

  if (!('src' in context)) {
    return null
  }

  const { alt, src } = context
  const srcSet = IMAGE_SIZES.map(
    size => `${imageUrl(src, size, MAX_SIZE, aspectRatio)} ${size}w`
  ).join(',')

  const containerClasses = classnames(
    handles.highQualityContainer,
    'w-100 h-100 overflow-hidden'
  )

  const imgClasses = classnames(
    handles.productImageTag,
    styles.highQualityProductImageImgElement,
    'w-100 h-100'
  )

  return (
    <div className={containerClasses}>
      <Zoomable
        mode={validateZoomMode(zoomMode)}
        factor={zoomFactor}
        zoomContent={
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            // This img element is just for zoom
            role="presentation"
            className={handles.imgZoom}
            style={{
              // Resets possible resizing done via CSS
              maxWidth: 'unset',
              width: `${zoomFactor * 100}%`,
              height: `${zoomFactor * 100}%`,
              objectFit: 'contain',
            }}
            // See comment regarding sizes below
            sizes="(max-width: 64.1rem) 100vw, 50vw"
            src={imageUrl(
              src,
              DEFAULT_SIZE * zoomFactor,
              MAX_SIZE,
              aspectRatio
            )}
          />
        }
      >
        <img
          alt={alt}
          title={alt}
          loading="lazy"
          srcSet={srcSet}
          className={imgClasses}
          // See comment regarding sizes below
          sizes="(max-width: 64.1rem) 100vw, 50vw"
          src={imageUrl(src, DEFAULT_SIZE * zoomFactor, MAX_SIZE, aspectRatio)}
        />
      </Zoomable>
    </div>
  )
}

export default HighQualityProductImage
