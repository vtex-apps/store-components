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
  title?: string
  cssHandles: {
    video: string
    videoContainer: string
  }
}

type State = any

type Props = OwnProps & typeof Youtube.defaultProps

class Youtube extends Component<Props, State> {
  static defaultProps = {
    loop: true,
    autoplay: false,
    width: null,
    height: null,
    title: false,
    className: '',
  }

  constructor(props: Props) {
    super(props)

    const { loop, autoplay, title, url } = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${title}&enablejsapi=1&iv_load_policy=3&modestbranding=1`
    const videoId = Youtube.extractVideoID(url)

    this.iframeRef = React.createRef()
    this.state = {
      iframe: {
        src: `https://www.youtube.com/embed/${videoId}?${params}`,
      },
    }
  }

  static getThumbUrl = (url: any) => {
    const videoId = Youtube.extractVideoID(url)

    return Promise.resolve(`https://img.youtube.com/vi/${videoId}/default.jpg`)
  }

  static extractVideoID = (url: any) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[7].length === 11) return match[7]

    return null
  }

  frameReady: any
  iframeRef: any

  executeCommand = (command: any) => () => {
    if (!this.frameReady) return

    const youtubeCommand = JSON.stringify({ event: 'command', func: command })

    this.iframeRef.contentWindow.postMessage(
      youtubeCommand,
      'https://www.youtube.com'
    )
  }

  render() {
    const { iframe } = this.state
    const { className, id, cssHandles } = this.props

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playing' does not exist on type 'never'.
    this.props.playing
      ? this.executeCommand('playVideo')()
      : this.executeCommand('pauseVideo')()

    return (
      <div
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'videoContainer' does not exist on type '... Remove this comment to see the full error message
        className={`relative ${className} ${cssHandles.videoContainer}`}
        style={{ padding: '30%' }}
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

export default Youtube
