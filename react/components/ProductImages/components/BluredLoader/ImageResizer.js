import React from 'react'

class ImageResizer extends React.Component {
  constructor(props){
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount(){
    this.drawImage()
  }

  drawImage = () => {
    const { src } = this.props
    const image = new Image()

    image.onload = () => {
      if(!this.canvas) return
      const {minRatio} = this.props

      const width = image.width >= image.height * minRatio ?
        image.width :
        image.height * minRatio

      const height = image.height

      const canvas = this.canvas
      const canvasContext = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      canvasContext.drawImage(image, (width - image.width) / 2, 0)
    }
    image.src = src
  }

  render() {
    const { alt, className } = this.props

    this.drawImage()

    return <canvas ref={this.canvas} alt={alt} className={className} />
  }
}

export default ImageResizer

