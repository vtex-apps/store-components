import React, { Component } from 'react'
import PropTypes from 'prop-types'
const youtubeApiKey = null

// TODO: Youtube Component disabled until settings update and backend update to support video
// Author: @samuraiexx

class Youtube extends Component {
  static getThumbUrl = (url, thumbWidth) => {
    const videoId = Youtube.extractVideoID(url)
    return `https://img.youtube.com/vi/${videoId}/default.jpg`
    // new Promise(resolve => {
    //   const videoId = Youtube.extractVideoID(url)
    //   const getUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`
    //   fetch(getUrl)
    //     .then(response => {
    //       return response.json()
    //     })
    //     .then(response => {
    //       console.log('---- response:', response)
    //       if (response.error || response.items.length === 0) return ''
    //       resolve(response.items[0].snippet.thumbnails.default.url)
    //     })
    // })
  }

  constructor(props) {
    super(props)

    this.state = { iframe: {} }

    const { loop, autoplay, title, url } = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${title}&enablejsapi=1&iv_load_policy=3&modestbranding=1`
    const videoId = Youtube.extractVideoID(url)
    const getUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`

    this.iframeRef = React.createRef()

    // fetch(getUrl)
    //   .then(responseonse => {
    //     return responseonse.json()
    //   })
    //   .then(response => {
    //     if (response.items.length === 0) return
    //     response = response.items[0].snippet

    //     const { title } = response
    //     const { width, height } = response.thumbnails.default
    //     const thumbUrl = response.thumbnails.default.url
    //     props.setThumb && props.setThumb(thumbUrl, title)

    //     const src = `https://www.youtube.com/embed/${videoId}?${params}`

    //     this.setState({
    //       iframe: {
    //         divStyle: { padding: `${(100 * height) / width}% 0 0 0` },
    //         src: src,
    //       },
    //     })
    //   })
  }

  static extractVideoID = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    if (match && match[7].length === 11) return match[7]
    return null
  }

  componentDidMount() {
    // this.iframeRef.onload = () => (this.frameReady = true)
  }

  executeCommand = command => () => {
    if (!this.frameReady) return

    const youtubeCommand = JSON.stringify({ event: 'command', func: command })
    this.iframeRef.contentWindow.postMessage(
      youtubeCommand,
      'https://www.youtube.com'
    )
  }

  render() {
    const { iframe } = this.state
    const { className, id } = this.props

    this.props.playing
      ? this.executeCommand('playVideo')()
      : this.executeCommand('pauseVideo')()

    return (
      <div style={iframe.divStyle} className={`relative ${className}`}>
        <iframe
          ref={this.iframeRef}
          title={id}
          className="absolute top-0 left-0 w-100 h-100"
          src={iframe.src}
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }
}

Youtube.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired, // Unique ID for iframe title
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  showTitle: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  playing: PropTypes.bool,
  title: PropTypes.string,
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
