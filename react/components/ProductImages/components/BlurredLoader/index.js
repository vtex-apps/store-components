import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'vtex.styleguide'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import './global.css'
import ImageResizer from './ImageResizer'
import { path } from 'ramda'

const styles = { barColorPrimary: { backgroundColor: 'currentColor' } }
const LinearProgressWithStyle = withStyles(styles)(LinearProgress)

const LOAD_STATES = {
  LOADING: 'LOADING',
  TRANSITION: 'TRANSITION',
  LOADED: 'LOADED'
}

const imageMinRatio = 2/3

export const LOADER_TYPES = {
  SPINNER: 'SPINNER',
  LINEAR: 'LINEAR',
}

class BlurredLoader extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      loadState: LOAD_STATES.LOADING,
      realUrlIndex: null,
    }
    this.timers = {}
    this.loadCounter = 0
  }

  generateImage = (urlIndex) => {
    const { realUrls } = this.props
    const { realUrlIndex } = this.state
    const bestUrlIndex = urlIndex ? urlIndex : this.props.bestUrlIndex

    if (realUrlIndex && bestUrlIndex <= realUrlIndex)
      return

    const hdImageLoader = new Image()
    hdImageLoader.src = realUrls[ bestUrlIndex ]

    hdImageLoader.onerror = () => {
      let { realUrlIndex } = this.state
      if(!realUrlIndex) realUrlIndex = 0

      if(this.loadCounter > 10) return
      this.loadCounter++
      this.generateImage(Math.max(bestUrlIndex - 1, realUrlIndex))
    }

    hdImageLoader.onload = () => {
      const { realUrlIndex } = this.state
      if(realUrlIndex && bestUrlIndex <= realUrlIndex) return

      this.setState({
        loadState: LOAD_STATES.TRANSITION,
        realUrlIndex: bestUrlIndex
      })

      const timer = setTimeout(() => {
        this.setState({ loadState: LOAD_STATES.LOADED })
        this.props.onload && this.props.onload()
      }, 1000)
      this.timers[timer] = true

      if(this.props.bestUrlIndex > bestUrlIndex)
        this.generateImage()
    }
  }

  Loader = () => {
    const { loaderType } = this.props
    const { loadState } = this.state
    switch(loaderType){
      case LOADER_TYPES.LINEAR:
        return (
          <div className={`w-100 top-0 z-2 absolute transition-opacity-1 ${
            loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0'
            }`}>
            <LinearProgressWithStyle className="c-action-primary" />
          </div>)
      case LOADER_TYPES.SPINNER:
        return (
          <div
            className={`absolute z-2 center-all left-0 right-0 top-0 bottom-0 transition-opacity-1 ${
              loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0'
              }`}
            style={{ height: 40, width: 40 }}>
            <Spinner/>
          </div>)
      default:
        return null
    }
  }

  componentDidMount(){
    this.generateImage()
  }

  componentWillUnmount(){
    const keys = Object.keys(this.timers)
    keys.forEach(key => clearTimeout(key))
  }

  render(){
    const { Loader } = this
    const { className, alt, loaderUrl, realUrls } = this.props
    const { loadState, realUrlIndex } = this.state
    const loaded = loadState === LOAD_STATES.LOADED

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
              loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0'
              } ${className}`}
          />
          <ImageResizer
            alt=""
            src={realUrls[realUrlIndex]}
            minRatio={imageMinRatio}
            className={`absolute z-1 w-100 center left-0 right-0 bottom-0 top-0 transition-opacity-1 db ${
              loadState === LOAD_STATES.LOADING ? 'o-0' : 'o-100'
              }`}
          />
        </div>}
      </React.Fragment>)
  }
}

BlurredLoader.proptype = {
  className: PropTypes.string,
  alt: PropTypes.string,
  loaderUrl: PropTypes.string.required,
  realUrls: PropTypes.arrayOf(PropTypes.string).required,
  thresholds: PropTypes.arrayOf(PropTypes.number),
}

BlurredLoader.defaultProps = {
  thresholds: [],
}

export default BlurredLoader

