import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const ImageResizer = ({ alt, className, src, minRatio }) => {
  const canvas = React.useRef()

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
  })

  return <canvas ref={canvas} alt={alt} className={className} />
}

ImageResizer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  minRatio: PropTypes.number,
}

export default ImageResizer
