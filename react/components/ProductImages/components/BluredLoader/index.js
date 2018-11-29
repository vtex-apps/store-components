import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'vtex.styleguide'
//import Spinner from '@vtex/styleguide/lib/Spinner'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import debounce from 'debounce'
import './global.css'
import ImageResizer from './ImageResizer'

const styles = { barColorPrimary: { backgroundColor: 'currentColor' } }
const LinearProgressWithStyle = withStyles(styles)(LinearProgress)

const LoadStates = {
  LOADING: 'LOADING',
  TRANSITION: 'TRANSITION',
  LOADED: 'LOADED'
}

const imageMinRatio = 2/3

const LoaderTypes = {
  spinner: 'spinner',
  linear: 'linear'
}

class BluredLoader extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      loadState: LoadStates.LOADING,
      realUrlIndex: null,
    }
    this.loadCounter = 0
  }

  componentDidMount() {
    this.generateImage()
    window.addEventListener('resize', this.debouncedUpdate)
  }

  debouncedUpdate = debounce(() => {
    this.forceUpdate()
  }, 500)

  componentWillUnmount(){
    window.removeEventListener('resize', this.debouncedUpdate)
  }

  getBestImageUrl = (imageUrl = null) => {
    const { thresholds } = this.props
    const windowSize = window.innerWidth
    let bestUrlIndex = 0

    if(imageUrl) bestUrlIndex = imageUrl
    else
      thresholds.forEach(
        (threshold, i) =>
          windowSize > threshold && (bestUrlIndex = i + 1)
      )

    return bestUrlIndex
  }

  generateImage = (imageUrl = null) => {
    const { realUrls } = this.props
    const { realUrlIndex } = this.state

    const bestUrlIndex = this.getBestImageUrl(imageUrl)

    if (realUrlIndex !== null && bestUrlIndex <= realUrlIndex)
      return

    const hdImageLoader = new Image()
    hdImageLoader.src = realUrls[ bestUrlIndex ]

    hdImageLoader.onerror = () => {
      if(this.loadCounter > 10) return
      this.loadCounter++
      this.generateImage(Math.max(bestUrlIndex - 1, 0))
    }

    hdImageLoader.onload = () => {
      const { realUrlIndex } = this.state
      if(realUrlIndex && bestUrlIndex <= realUrlIndex) return
      if(this.getBestImageUrl() > bestUrlIndex)
        this.generateImage()

      this.setState({
        loadState: LoadStates.TRANSITION,
        realUrlIndex: bestUrlIndex
      })

      setTimeout(() => {
        this.setState({ loadState: LoadStates.LOADED })
        this.props.onload && this.props.onload()
      }, 1000)
    }
  }

  Loader = () => {
    const { loaderType } = this.props
    const { loadState } = this.state
    switch(loaderType){
      case LoaderTypes.linear:
        return (
          <div className={`w-100 top-0 z-2 absolute transition-opacity-1 ${
            loadState === LoadStates.LOADING ? 'o-100' : 'o-0'
            }`}>
            <LinearProgressWithStyle className="c-action-primary" />
          </div>)
      case LoaderTypes.spinner:
        return (
          <div
            className={`absolute z-2 center-all left-0 right-0 top-0 bottom-0 transition-opacity-1 ${
              loadState === LoadStates.LOADING ? 'o-100' : 'o-0'
              }`}
            style={{ height: 40, width: 40 }}>
            <Spinner/>
          </div>)
      default:
        return null
    }
  }

  render(){
    const { Loader } = this
    const { className, alt, loaderUrl, realUrls } = this.props
    const { loadState, realUrlIndex } = this.state
    const loaded = loadState === LoadStates.LOADED

    return (
      <React.Fragment>
        <ImageResizer
          className={`w-100 ${loaded ? 'db' : 'dn'}`}
          alt={alt}
          src={realUrls[realUrlIndex]}
          minRatio={imageMinRatio}/>

        {!loaded &&
        <div className="relative w-100 db">
          <Loader/>
          <ImageResizer
            alt={alt}
            src={loaderUrl}
            minRatio={imageMinRatio}
            className={`w-100 blur-30 transition-opacity-1 db z-2 ${
              loadState === LoadStates.LOADING ? 'o-100' : 'o-0'
              } ${className}`}
          />
          <ImageResizer
            alt=""
            src={realUrls[realUrlIndex]}
            minRatio={imageMinRatio}
            className={`absolute z-1 w-100 center left-0 right-0 bottom-0 top-0 transition-opacity-1 db ${
              loadState === LoadStates.LOADING ? 'o-0' : 'o-100'
              }`}
          />
        </div>}
      </React.Fragment>)
  }
}

BluredLoader.proptype = {
  className: PropTypes.string,
  alt: PropTypes.string,
  loaderUrl: PropTypes.string.required,
  realUrls: PropTypes.arrayOf(PropTypes.string).required,
  thresholds: PropTypes.arrayOf(PropTypes.number),
}

BluredLoader.defaultProps = {
  thresholds: [],
}

export default BluredLoader


