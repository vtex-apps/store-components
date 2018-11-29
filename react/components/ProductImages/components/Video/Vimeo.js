import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Vimeo extends Component {
  static getThumbUrl = (url, thumbWidth) => new Promise((resolve, reject) => {
    const getUrl = `https://vimeo.com/api/oembed.json?url=${url}`
    fetch(getUrl)
      .then(response => {
        return response.json()
      })
      .then((resp) => {
        resolve(Vimeo.thumbUrlFromResp(resp, thumbWidth))
      })
  })

  static thumbUrlFromResp(resp, thumbWidth) {
    const {height, width} = resp
    const thumb = resp.thumbnail_url_with_play_button

    thumbWidth = thumbWidth || resp.thumbnail_width
    const thumbHeight = Math.ceil(thumbWidth*height/width)

    return thumb.replace(/_[123456789]*x[123456789]*./, `_${thumbWidth}x${thumbHeight}.`)
  }

  constructor(props) {
    super(props)

    this.state = {iframe: {}}

    const {loop, autoplay, width, height, showTitle, url} = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${showTitle}&width=${width}&height=${height}`
    const getUrl = `https://vimeo.com/api/oembed.json?url=${url}&${params}`

    fetch(getUrl)
      .then(response => {
        return response.json()
      })
      .then((resp) => {
        const {height, width, html, title } = resp

        const thumbUrl = Vimeo.thumbUrlFromResp(resp, props.thumbWidth)
        props.setThumb && props.setThumb(thumbUrl, title)

        const src = html.match(/src= *" *([^"]*) *"/)[1] //Get url from response

        this.setState({ iframe: { divStyle: {padding: `${100 * height / width}% 0 0 0`}, src: src }})
      })
  }

  componentDidMount(){
    this.iframeRef.onload = () => this.frameReady = true
  }

  executeCommand = (command) => () => {
    if(!this.frameReady) return

    const vimeo_command = JSON.stringify( { method: command } )
    this.iframeRef.contentWindow.postMessage(vimeo_command, 'https://player.vimeo.com')
  }

  render() {
    const { iframe } = this.state
    const { className, id } = this.props

    this.props.playing ?
      this.executeCommand('play')() :
      this.executeCommand('pause')()

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

Vimeo.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired, //Unique ID for iframe title
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  showTitle: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  playing: PropTypes.bool,
}

Vimeo.defaultProps = {
  loop: true,
  autoplay: false,
  width: null,
  height: null,
  showTitle: false,
  className: '',
}

export default Vimeo
