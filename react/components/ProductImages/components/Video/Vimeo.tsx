import React, { Component } from 'react'

type OwnProps = {
  url: string
  id: number
  setThumb?: (...args: any[]) => any
  thumbWidth?: number
  className?: string
  loop?: boolean
  autoplay?: boolean
  showTitle?: boolean
  width?: number
  height?: number
  playing?: boolean
  cssHandles: {
    video: string
    videoContainer: string
  }
}

type State = any

type Props = OwnProps & typeof Vimeo.defaultProps

class Vimeo extends Component<Props, State> {
  static defaultProps = {
    loop: true,
    autoplay: false,
    width: null,
    height: null,
    showTitle: false,
    className: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = { iframe: {} }

    const { loop, autoplay, width, height, showTitle, url } = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${showTitle}&width=${width}&height=${height}`
    const getUrl = `https://vimeo.com/api/oembed.json?url=${url}&${params}`

    this.iframeRef = React.createRef()

    fetch(getUrl)
      .then((response) => response.json())
      .then((response) => {
        const { height: heightDiv, width: widthDiv, html, title } = response

        // @ts-expect-error ts-migrate(2339) FIXME: The intersection 'Props' was reduced to 'never' be... Remove this comment to see the full error message
        const thumbUrl = Vimeo.thumbUrlFromResp(response, props.thumbWidth)

        // @ts-expect-error ts-migrate(2339) FIXME: The intersection 'Props' was reduced to 'never' be... Remove this comment to see the full error message
        props.setThumb && props.setThumb(thumbUrl, title)

        const [, src] = html.match(/src= *" *([^"]*) *"/) // Get url from response

        this.setState({
          iframe: {
            divStyle: { padding: `${(100 * heightDiv) / widthDiv}% 0 0 0` },
            src,
          },
        })
      })
  }

  static getThumbUrl = (url: any) => {
    const getUrl = `https://vimeo.com/api/oembed.json?url=${url}`

    return fetch(getUrl)
      .then((response) => response.json())
      .then((response) => response.thumbnail_url)
  }

  frameReady: any
  iframeRef: any

  static thumbUrlFromResp(response: any, thumbWidth: any) {
    const { height, width } = response
    const thumb = response.thumbnail_url_with_play_button

    thumbWidth = thumbWidth || response.thumbnail_width
    const thumbHeight = Math.ceil((thumbWidth * height) / width)

    return thumb.replace(
      /_[0123456789]*x[0123456789]*./,
      `_${thumbWidth}x${thumbHeight}.`
    )
  }

  executeCommand = (command: any) => () => {
    if (!this.frameReady) return

    const vimeoCommand = JSON.stringify({ method: command })

    this.iframeRef.contentWindow.postMessage(
      vimeoCommand,
      'https://player.vimeo.com'
    )
  }

  render() {
    const { iframe } = this.state
    const { className, id, cssHandles } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playing' does not exist on type 'never'.
    this.props.playing
      ? this.executeCommand('play')()
      : this.executeCommand('pause')()

    return (
      <div
        style={iframe.divStyle}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'videoContainer' does not exist on type '... Remove this comment to see the full error message
        className={`relative ${className} ${cssHandles.videoContainer}`}
      >
        <iframe
          ref={this.iframeRef}
          title={id}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'video' does not exist on type 'never'.
          className={`${cssHandles.video} absolute top-0 left-0 w-100 h-100`}
          src={iframe.src}
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }
}

export default Vimeo
