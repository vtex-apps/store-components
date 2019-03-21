import React from 'react'
import PropTypes from 'prop-types'
import ImageResizer from './ImageResizer'
import styles from '../../styles.css'
import { Loader } from './Loader'

const LOAD_STATES = {
  LOADING: 'LOADING',
  TRANSITION: 'TRANSITION',
  LOADED: 'LOADED',
}

const imageMinRatio = 2 / 3

export const LOADER_TYPES = {
  SPINNER: 'SPINNER',
  LINEAR: 'LINEAR',
}

class BlurredLoader extends React.Component {
  state = {
    loadState: LOAD_STATES.LOADING,
    realUrlIndex: null,
  }
  timers = {}
  loadCounter = 0

  generateImage = urlIndex => {
    const { realUrls } = this.props
    const { realUrlIndex } = this.state
    const bestUrlIndex = urlIndex || this.props.bestUrlIndex

    if (realUrlIndex && bestUrlIndex <= realUrlIndex) {
      return
    }

    const hdImageLoader = new Image()
    hdImageLoader.src = realUrls[bestUrlIndex]

    hdImageLoader.onerror = () => {
      let { realUrlIndex } = this.state
      if (!realUrlIndex) realUrlIndex = 0

      if (this.loadCounter > 10) return
      this.loadCounter++
      this.generateImage(Math.max(bestUrlIndex - 1, realUrlIndex))
    }

    hdImageLoader.onload = () => {
      const { realUrlIndex } = this.state
      if (realUrlIndex && bestUrlIndex <= realUrlIndex) return

      this.setState({
        loadState: LOAD_STATES.TRANSITION,
        realUrlIndex: bestUrlIndex,
      })
      const timer = setTimeout(() => {
        this.setState({ loadState: LOAD_STATES.LOADED })
        this.props.onload && this.props.onload()
        delete this.timers[timer]
      }, 1000)
      this.timers[timer] = true

      if (this.props.bestUrlIndex > bestUrlIndex) {
        this.generateImage()
      }
    }
  }

  componentDidMount() {
    this.generateImage()
  }

  componentWillUnmount() {
    const keys = Object.keys(this.timers)
    keys.forEach(key => this.timers[key] && clearTimeout(key))
  }

  render() {
    const { className, alt, loaderUrl, realUrls, loaderType } = this.props
    const { loadState, realUrlIndex } = this.state
    const loaded = loadState === LOAD_STATES.LOADED

    return (
      <div className={`${styles.image} relative`}>
        <Loader loaded={loaded} loaderType={loaderType}>
          <ImageResizer
            alt={alt}
            src={loaderUrl}
            minRatio={imageMinRatio}
            className={`w-100 db ${className}`}
          />
          <ImageResizer
            className="w-100"
            alt={alt}
            src={realUrls[realUrlIndex]}
            minRatio={imageMinRatio}
          />
        </Loader>
        <ImageResizer
          className="w-100"
          alt={alt}
          src={realUrls[realUrlIndex]}
          minRatio={imageMinRatio}
        />
      </div>
    )
  }
}

BlurredLoader.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  loaderUrl: PropTypes.string.isRequired,
  realUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  thresholds: PropTypes.arrayOf(PropTypes.number),
  onload: PropTypes.func,
  bestUrlIndex: PropTypes.number,
  loaderType: PropTypes.string,
}

BlurredLoader.defaultProps = {
  thresholds: [],
}

export default BlurredLoader
