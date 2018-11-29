import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {youtubeApiKey} from './contants'

class Youtube extends Component {
  static getThumbUrl = (url, thumbWidth) => new Promise((resolve, reject) => {
    const videoId = Youtube.extractVideoID(url)
    const getUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`
    fetch(getUrl)
      .then(response => {
        return response.json()
      })
      .then((resp) => {
        if(resp.items.length === 0) return
        resp = resp.items[0].snippet

        resolve(resp.thumbnails.default.url)
      })
  })

  constructor(props) {
    super(props)

    this.state = {iframe: {}}

    const {loop, autoplay, title, url} = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${title}&enablejsapi=1&iv_load_policy=3&modestbranding=1`
    const videoId = Youtube.extractVideoID(url)
    const getUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`

    fetch(getUrl)
      .then(response => {
        return response.json()
      })
      .then((resp) => {
        if(resp.items.length === 0) return
        resp = resp.items[0].snippet

        const { title } = resp
        const { width, height } = resp.thumbnails.default
        const thumbUrl = resp.thumbnails.default.url
        props.setThumb && props.setThumb(thumbUrl, title)

        const src = `https://www.youtube.com/embed/${videoId}?${params}`

        this.setState({ iframe: { divStyle: {padding: `${100 * height / width}% 0 0 0`}, src: src }})
      })
  }

  static extractVideoID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    if ( match && match[7].length === 11 )
      return match[7]
    else return null
  }

  componentDidMount(){
    this.iframeRef.onload = () => this.frameReady = true
  }

  executeCommand = (command) => () => {
    if(!this.frameReady) return

    const youtube_command = JSON.stringify( { event: 'command', func: command } )
    this.iframeRef.contentWindow.postMessage(youtube_command, 'https://www.youtube.com')
  }

  render() {
    const { iframe } = this.state
    const { className, id } = this.props

    this.props.playing ?
      this.executeCommand('playVideo')() :
      this.executeCommand('pauseVideo')()

    return <div style={iframe.divStyle} className={`relative ${className}`}>
      <iframe
        ref={(ref) => this.iframeRef = ref}
        title={id}
        className="absolute top-0 left-0 w-100 h-100"
        src={iframe.src}
        frameBorder="0"
        allowFullScreen
        allow="autoplay">
      </iframe>
    </div>
  }
}

Youtube.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired, //Unique ID for iframe title
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  playing: PropTypes.bool,
}

Youtube.defaultProps = {
  loop: true,
  autoplay: false,
  width: null,
  height: null,
  title: false,
  className: '',
}

export default Youtube
