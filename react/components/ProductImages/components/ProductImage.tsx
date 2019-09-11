import React, { FC, useMemo } from 'react'
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
}

type AspectRatio = string | number

/** Parses ratio values into a multiplier to set the image height.
 * For example, turns "3:4" into 1.333, so the image height will be 
 * 1.333 times its width.
*/
const parseAspectRatio = (input: AspectRatio) => {
  if (typeof input === 'string') {
    const separator = ':'
    const data = input.split(separator)
    if (data.length !== 2) {
      return 1
    }

    const [ width, height ] = data
    const ratio = parseFloat(height) / parseFloat(width)

    if (typeof ratio !== 'number' || isNaN(ratio)) {
      return 1
    }

    return ratio
  }

  if (typeof input === 'number') {
    return input
  }

  return 1
}

const imageUrl = (src: string, size: number, aspectRatio: AspectRatio) => {
  const parsedRatio = parseAspectRatio(aspectRatio)

  let [width, height] = [ size, size * parsedRatio]

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

  return changeImageUrlSize(src, width, height)
}

const ProductImage: FC<Props> = ({ src, alt, zoomMode = ZoomMode.InPlaceClick, zoomFactor = 2, aspectRatio = 1 }) => {
  const srcSet = useMemo(() => (
    IMAGE_SIZES
      .map(size => `${imageUrl(src, size, aspectRatio)} ${size}w`)
      .join(',')
  ), [src, IMAGE_SIZES])

  return (
    <div className={styles.image}>
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
            }}

            // See comment regarding sizes below
            sizes="(max-width: 64.1rem) 100vw, 50vw"
          />
        )}>
        <img
          className="w-100"
          src={imageUrl(src, DEFAULT_SIZE, aspectRatio)}
          srcSet={srcSet}
          alt={alt}
          title={alt}

          // WIP
          // This sizes value means: if the window has at most 64.1rem of width,
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