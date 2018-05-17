import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ImageLoader extends PureComponent {
  static displayName = 'ImageLoader'

  static propTypes = {
    imageName: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.imageName !== prevState.imageName) {
      return {
        imageName: nextProps.imageName,
      }
    }

    return null
  }

  state = {}

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.props.imageName) {
      this.loadImage()
    }
  }

  loadImage() {
    const { imageName } = this.state

    import(`../images/${imageName}`).then(image => {
      this.setState({ image })
    })
  }

  render() {
    const { image } = this.state

    return this.props.children(image, !image)
  }
}

