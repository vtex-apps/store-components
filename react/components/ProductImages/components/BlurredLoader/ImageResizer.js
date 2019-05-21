import React, { useEffect, useRef } from 'react'
import useZoom from './Zoom'
import { string, number } from 'prop-types'

const ImageResizer = ({ alt, className, src, minRatio, maxScale = 2 }) => {
  const canvas = useRef(null)

  useEffect(() => {
    if (!src) return

    const image = new Image()

    image.onload = () => {
      if (!canvas || !canvas.current) {
        return
      }

      const currentCanvas = canvas.current

      const width =
        image.width >= image.height * minRatio
          ? image.width
          : image.height * minRatio

      const height = image.height

      const canvasContext = currentCanvas.getContext('2d')
      currentCanvas.width = width
      currentCanvas.height = height

      canvasContext.drawImage(image, (width - image.width) / 2, 0)
    }
    image.src = src
  }, [minRatio, src])

  const { zoom, out, pan, style } = useZoom(canvas, maxScale)

  const zoomListeners = {
    onMouseEnter: zoom,
    onMouseMove: pan,
    onMouseLeave: out,
  }

  return (
    <canvas
      ref={canvas}
      alt={alt}
      className={className}
      style={{ ...style }}
      {...zoomListeners}
    />
  )
}

ImageResizer.propTypes = {
  src: string,
  alt: string,
  className: string,
  minRatio: number,
  maxScale: number,
}

export default ImageResizer
