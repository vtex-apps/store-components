import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Vimeo from './Vimeo'
import YouTube from './Youtube'

import styles from '../../styles.css'

class Video extends Component {
  static getThumbUrl(url, thumbWidth) {
    if (url.search('vimeo') !== -1) {
      return Vimeo.getThumbUrl(url, thumbWidth)
    }

    else if (url.search('youtube') !== -1) {
      const thumb = YouTube.getThumbUrl(url, thumbWidth)
      console.log('--- thumb:', thumb)
      return thumb
    }
  }

  render() {
    const { url } = this.props

    return (
      <div className={styles.video}>
        {url.search('vimeo') !== -1 && <Vimeo {...this.props} />}
        {url.search('youtube') !== -1 && <YouTube {...this.props} />}
      </div>
    )
  }
}

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool,
}

export default Video
