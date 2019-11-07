import React, { FC, useMemo, useRef } from 'react'
import { changeImageUrlSize } from '../utils/generateUrl'
import Zoomable, { ZoomMode } from './Zoomable'
import styles from '../styles.css'

const IMAGE_SIZES = [600, 800, 1200]
const DEFAULT_SIZE = 800
const MAX_SIZE = 2048

interface Props {
  src: string
  alt: string
  zoomMode: ZoomMode
  zoomFactor: number
  aspectRatio?: AspectRatio
  maxHeight?: number
}

type AspectRatio = string | number

/** Parses ratio values into a multiplier to set the image height.
 * For example, turns "3:4" into 1.333, so the image height will be 
 * 1.333 times its width.
*/
const parseAspectRatio = (input?: AspectRatio | null) => {
  if (!input) {
    return null
  }
  if (typeof input === 'string') {
    if (input === 'auto') { 
      return null
    }
    const separator = ':'
    const data = input.split(separator)
    if (data.length !== 2) {
      return null
    }

    const [ width, height ] = data
    const ratio = parseFloat(height) / parseFloat(width)

    if (typeof ratio !== 'number' || isNaN(ratio)) {
      return null
    }

    return ratio
  }

  if (typeof input === 'number') {
    return input
  }

  return null
}

const imageUrl = (src: string, size: number, aspectRatio?: AspectRatio) => {
  let width = size
  let height: number | string = 'auto'

  if (aspectRatio && aspectRatio !== 'auto') {
    height = size * (parseAspectRatio(aspectRatio) || 1)

    if (width > MAX_SIZE) {
      height = height / (width / MAX_SIZE) 
      width = MAX_SIZE
    }

    if (height > MAX_SIZE) {
      width = width / (height / MAX_SIZE)
      height = MAX_SIZE
    }

    width = Math.round(width)
    height = Math.round(height)
  } else {
    width = Math.min(MAX_SIZE, width)
  }

  return changeImageUrlSize(src, width, height)
}

const ProductImage: FC<Props> = ({
  src,
  alt,
  zoomMode = ZoomMode.InPlaceClick,
  zoomFactor = 2,
  aspectRatio='auto',
  maxHeight = 600,
}) => {
  const srcSet = useMemo(() => (
    IMAGE_SIZES
      .map(size => `${imageUrl(src, size, aspectRatio)} ${size}w`)
      .join(',')
  ), [src, aspectRatio, IMAGE_SIZES])

  const imageRef = useRef(null)

  return (
    <div className={styles.productImage}>
      <Zoomable
        mode={zoomMode}
        factor={zoomFactor}
        zoomContent={(
          <img
            src={imageUrl(src, DEFAULT_SIZE * zoomFactor, aspectRatio)}
          
            style={{
              // Resets possible resizing done via CSS
              maxWidth: 'unset',
              width: `${zoomFactor * 100}%`,
              height: `${zoomFactor * 100}%`,
              objectFit: 'contain',
            }}

            // See comment regarding sizes below
            sizes="(max-width: 64.1rem) 100vw, 50vw"
          />
        )}>
            <img
              ref={imageRef}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: maxHeight || 'unset',
                objectFit: 'contain',
              }}
              src={imageUrl(src, DEFAULT_SIZE, aspectRatio)}
              srcSet={srcSet}
              alt={alt}
              title={alt}
              loading="lazy"

              // WIP
              // The value of the "sizes" attribute means: if the window has at most 64.1rem of width,
              // the image will be of a width of 100vw. Otherwise, the
              // image will be 50vw wide.
              // This size is used for picking the best available size
              // given the ones from the srcset above.
              //
              // This is WIP because it is a guess: we are assuming
              // the image will be of a certain size, but it should be
              // probably be gotten from flex-layout or something.
              sizes="(max-width: 64.1rem) 100vw, 50vw"
            />
      </Zoomable>
    </div>
  )
}

export default ProductImage