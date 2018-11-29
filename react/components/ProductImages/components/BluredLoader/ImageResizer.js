import React from 'react'

class ImageResizer extends React.Component {
  componentDidMount(){
    this.drawImage()
  }

  drawImage = () => {
    const { src } = this.props
    const image = new Image()
    image.src = src

    image.onload = () => {
      if(!this.ref) return
      const {minRatio} = this.props

      const width = image.width >= image.height * minRatio ?
        image.width :
        image.height * minRatio

      const height = image.height

      const canvas = this.ref
      const canvasContext = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      canvasContext.drawImage(image, (width - image.width) / 2, 0)
    }
  }

  render() {
    const { alt, className } = this.props

    this.drawImage()

    return <canvas ref={ref => this.ref = ref} alt={alt} className={className} />
  }
}

export default ImageResizer

