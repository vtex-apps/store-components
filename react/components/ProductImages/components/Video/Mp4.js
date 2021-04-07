import React, { Component } from 'react'

class Mp4 extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { className, url, cssHandles, autoPlay, loop } = this.props

    return (
      <video
        className={`relative ${className} ${cssHandles.videoContainer}`}
        autoPlay={autoPlay}
        loop={loop}
      >
        <source src={url} type="video/mp4"/>
      </video>
    )
  }
}

export default Mp4
