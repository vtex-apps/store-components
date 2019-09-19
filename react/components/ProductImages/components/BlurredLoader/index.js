import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'vtex.styleguide'
import classNames from 'classnames'
import ImageResizer from './ImageResizer'
import styles from '../../styles.css'
import { IMAGE_DEFAULT_SIZE, imageUrlForSize } from '../../../module/images'

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
    hdImageLoader.src = imageUrlForSize(realUrls[bestUrlIndex], IMAGE_DEFAULT_SIZE)

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

  Loader = () => {
    const { loaderType } = this.props
    const { loadState } = this.state
    const stateLoader = loadState === LOAD_STATES.LOADING
    const loadStateClass = classNames({
      'o-100': stateLoader,
      'o-0': !stateLoader,
    })
    switch (loaderType) {
      // Deprecated, will fallback to spinner
      case LOADER_TYPES.LINEAR:
      case LOADER_TYPES.SPINNER:
        return (
          <div
            className={`absolute z-2 center-all left-0 right-0 top-0 bottom-0 ${
              styles.imageTransitionOpacity
            } ${loadStateClass}`}
            style={{ height: 40, width: 40 }}
          >
            <Spinner />
          </div>
        )
      default:
        return null
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
    const { Loader } = this
    const {
      className,
      alt,
      loaderUrl,
      realUrls,
      onClick,
      isZoomEnabled,
    } = this.props
    const { loadState, realUrlIndex } = this.state
    const loaded = loadState === LOAD_STATES.LOADED
    const loading = loadState === LOAD_STATES.LOADING
    const loadingClass = classNames({
      'o-100': loading,
      'o-0': !loading,
    })

    const fixedImage = imageUrlForSize(realUrls[realUrlIndex], IMAGE_DEFAULT_SIZE)

    return (
      <div
        className={classNames(styles.image, {
          'swiper-zoom-container': isZoomEnabled,
        })}
        onClick={onClick}
      >
        <ImageResizer
          className={`w-100 ${loaded ? 'db' : 'dn'}`}
          alt={alt}
          src={fixedImage}
          minRatio={imageMinRatio}
        />
        {!loaded && (
          <div className="relative w-100 db">
            <Loader />
            <ImageResizer
              alt={alt}
              src={imageUrlForSize(loaderUrl, IMAGE_DEFAULT_SIZE)}
              minRatio={imageMinRatio}
              className={`w-100 ${styles.imageBlur30} ${
                styles.imageTransitionOpacity
              } db z-2 ${loadingClass} ${className}`}
            />
            <ImageResizer
              alt=""
              src={fixedImage}
              minRatio={imageMinRatio}
              className={`absolute z-1 w-100 center left-0 right-0 bottom-0 top-0 ${
                styles.imageTransitionOpacity
              } db`}
            />
          </div>
        )}
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
