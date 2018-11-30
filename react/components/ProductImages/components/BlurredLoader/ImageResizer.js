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
      const { minRatio } = this.props

      if(!this.canvas || !this.canvas.current)
        return

      const canvas = this.canvas.current

      const width = image.width >= image.height * minRatio ?
        image.width :
        image.height * minRatio

      const height = image.height

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

